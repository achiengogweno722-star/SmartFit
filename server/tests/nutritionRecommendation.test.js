import request from "supertest";
import app from "../app.js";

describe("Nutrition Recommendation API", () => {
  let adminToken;
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
    memberId = member.body.user.id;

    // Create Member Profile
    const profileResponse = await request(app)
      .post("/api/member/profile")
      .set("Authorization", `Bearer ${memberToken}`)
      .send({
        dateOfBirth: "2001-05-15",
        age: 25,
        gender: "MALE",
        height: 175,
        weight: 80,
        fitnessLevel: "BEGINNER",
        fitnessGoal: "WEIGHT_LOSS",
        availableDaysPerWeek: 5,
      });

   

    // Create Meal Plan
    const mealResponse = await request(app)
      .post("/api/meals")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Weight Loss Test Plan",
        goal: "WEIGHT_LOSS",
        calories: 1800,
        breakfast: "Oatmeal",
        lunch: "Chicken and Rice",
        dinner: "Fish and Vegetables",
        snacks: "Greek Yogurt",
      });

    

  });

  test("Generate nutrition recommendations", async () => {
    const response = await request(app)
      .get(`/api/nutrition-recommendations/${memberId}`)
      .set("Authorization", `Bearer ${adminToken}`);

   

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.recommendations).toBeDefined();
    expect(Array.isArray(response.body.recommendations)).toBe(true);
  });
});