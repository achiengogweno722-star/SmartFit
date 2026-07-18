import request from "supertest";
import app from "../app.js";

describe("Meal Plan API", () => {
  let adminToken;
  let memberToken;
  let mealId;

  beforeAll(async () => {
    // Register Admin
    const admin = await request(app)
      .post("/api/auth/register")
      .send({
        fullName: "Meal Admin",
        email: `mealadmin${Date.now()}@gmail.com`,
        password: "Password123",
        role: "ADMIN",
      });

    adminToken = admin.body.token;

    // Register Member
    const member = await request(app)
      .post("/api/auth/register")
      .send({
        fullName: "Meal Member",
        email: `mealmember${Date.now()}@gmail.com`,
        password: "Password123",
        role: "MEMBER",
      });

    memberToken = member.body.token;
  });

  test("Admin creates a meal plan", async () => {
    const response = await request(app)
      .post("/api/meals")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Test Meal Plan",
        goal: "WEIGHT_LOSS",
        calories: 1800,
        breakfast: "Oatmeal",
        lunch: "Chicken and Rice",
        dinner: "Fish and Vegetables",
        snacks: "Greek Yogurt",
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);

    mealId = response.body.mealPlan.id;
  });

  test("Get all meal plans", async () => {
    const response = await request(app)
      .get("/api/meals")
      .set("Authorization", `Bearer ${memberToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.count).toBeGreaterThan(0);
  });

  test("Get meal plan by ID", async () => {
    const response = await request(app)
      .get(`/api/meals/${mealId}`)
      .set("Authorization", `Bearer ${memberToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("Update meal plan", async () => {
    const response = await request(app)
      .put(`/api/meals/${mealId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        calories: 2000,
        snacks: "Mixed Nuts",
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("Delete meal plan", async () => {
    const response = await request(app)
      .delete(`/api/meals/${mealId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});