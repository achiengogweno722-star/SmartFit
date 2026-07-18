import request from "supertest";
import app from "../app.js";

describe("Progress API", () => {
  let memberToken;

  beforeAll(async () => {
    // Register Member
    const member = await request(app)
      .post("/api/auth/register")
      .send({
        fullName: "Progress Member",
        email: `progressmember${Date.now()}@gmail.com`,
        password: "Password123",
        role: "MEMBER",
      });

    memberToken = member.body.token;

    // Create Member Profile
    await request(app)
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
  });

  test("Member can add progress", async () => {
    const response = await request(app)
      .post("/api/progress")
      .set("Authorization", `Bearer ${memberToken}`)
      .send({
        weight: 78,
        notes: "Lost 2kg after two weeks.",
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.progress).toBeDefined();
    expect(response.body.progress.bmi).toBeDefined();
  });

  test("Member can view progress history", async () => {
    const response = await request(app)
      .get("/api/progress")
      .set("Authorization", `Bearer ${memberToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.progress)).toBe(true);
    expect(response.body.count).toBeGreaterThan(0);
  });
});