import request from "supertest";
import app from "../app.js";

describe("Nutrition Recommendation API", () => {
  let adminToken;
  let trainerToken;
  let memberToken;
  let memberId;

  beforeAll(async () => {
    // Register Admin
    const admin = await request(app)
      .post("/api/auth/register")
      .send({
        fullName: "Nutrition Admin",
        email: `nutritionadmin${Date.now()}@gmail.com`,
        password: "Password123",
        role: "ADMIN",
      });

    adminToken = admin.body.token;

    // Register Trainer
    const trainer = await request(app)
      .post("/api/auth/register")
      .send({
        fullName: "Nutrition Trainer",
        email: `nutritiontrainer${Date.now()}@gmail.com`,
        password: "Password123",
        role: "TRAINER",
      });

    trainerToken = trainer.body.token;

    // Register Member
    const member = await request(app)
      .post("/api/auth/register")
      .send({
        fullName: "Nutrition Member",
        email: `nutritionmember${Date.now()}@gmail.com`,
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

    memberId = profile.body.profile.id;

    // Create Meal Plan
    await request(app)
      .post("/api/meals")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Weight Loss Meal",
        goal: "WEIGHT_LOSS",
        calories: 1800,
        breakfast: "Oatmeal",
        lunch: "Chicken and Rice",
        dinner: "Fish",
        snacks: "Greek Yogurt",
      });
  });

  test("Admin can generate nutrition recommendation", async () => {
    const response = await request(app)
      .post(`/api/nutrition/recommend/${memberId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.recommendation).toBeDefined();
    expect(response.body.recommendation.mealPlan).toBeDefined();
  });

  test("Trainer can generate nutrition recommendation", async () => {
    const response = await request(app)
      .post(`/api/nutrition/recommend/${memberId}`)
      .set("Authorization", `Bearer ${trainerToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("Member cannot generate nutrition recommendation", async () => {
    const response = await request(app)
      .post(`/api/nutrition/recommend/${memberId}`)
      .set("Authorization", `Bearer ${memberToken}`);

    expect(response.status).toBe(403);
  });

  test("Member not found returns 400", async () => {
    const response = await request(app)
      .post("/api/nutrition/recommend/999999")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Member not found.");
  });

  test("Unauthorized request returns 401", async () => {
    const response = await request(app)
      .post(`/api/nutrition/recommend/${memberId}`);

    expect(response.status).toBe(401);
  });
});