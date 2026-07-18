import request from "supertest";
import app from "../app.js";

describe("Workout Recommendation API", () => {
  let adminToken;
  let memberToken;
  let memberId;

  beforeAll(async () => {
    // Register Admin
    const admin = await request(app)
      .post("/api/auth/register")
      .send({
        fullName: "Recommendation Admin",
        email: `recommendationadmin${Date.now()}@gmail.com`,
        password: "Password123",
        role: "ADMIN",
      });

    adminToken = admin.body.token;

    // Register Member
    const member = await request(app)
      .post("/api/auth/register")
      .send({
        fullName: "Recommendation Member",
        email: `recommendationmember${Date.now()}@gmail.com`,
        password: "Password123",
        role: "MEMBER",
      });

    memberToken = member.body.token;

    // Create Member Profile
    const profile = await request(app)
      .post("/api/member/profile")
      .set("Authorization", `Bearer ${memberToken}`)
      .send({
        gender: "MALE",
        dateOfBirth: "2001-05-15",
        height: 175,
        weight: 80,
        fitnessLevel: "BEGINNER",
        fitnessGoal: "WEIGHT_LOSS",
        availableDaysPerWeek: 5,
      });

    // IMPORTANT: Save the MemberProfile ID, not the User ID
    memberId = profile.body.profile.id;

    // Create matching workout
    await request(app)
      .post("/api/workouts")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Recommendation Workout",
        description: "Workout for testing",
        category: "Cardio",
        targetGoal: "WEIGHT_LOSS",
        difficulty: "BEGINNER",
        duration: 45,
        calories: 400,
        equipmentRequired: false,
        sessionsPerWeek: 4,
        estimatedWeeks: 8,
      });

    // Create non-matching workout
    await request(app)
      .post("/api/workouts")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Advanced Strength",
        description: "Hard workout",
        category: "Strength",
        targetGoal: "STRENGTH",
        difficulty: "ADVANCED",
        duration: 90,
        calories: 900,
        equipmentRequired: true,
        sessionsPerWeek: 7,
        estimatedWeeks: 12,
      });
  });

  test("Generate workout recommendations", async () => {
    const response = await request(app)
      .get(`/api/recommendations/${memberId}`)
      .set("Authorization", `Bearer ${memberToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.recommendations)).toBe(true);
    expect(response.body.count).toBeGreaterThan(0);
  });

  test("Invalid member ID returns 400", async () => {
    const response = await request(app)
      .get("/api/recommendations/abc")
      .set("Authorization", `Bearer ${memberToken}`);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Invalid member ID.");
  });

  test("Member not found returns 400", async () => {
    const response = await request(app)
      .get("/api/recommendations/999999")
      .set("Authorization", `Bearer ${memberToken}`);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Member not found.");
  });

  test("Unauthorized request returns 401", async () => {
    const response = await request(app).get(
      `/api/recommendations/${memberId}`
    );

    expect(response.status).toBe(401);
  });
});