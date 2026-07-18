import request from "supertest";
import app from "../app.js";

describe("Workout API", () => {
  let adminToken;
  let memberToken;
  let workoutId;

  beforeAll(async () => {
    // Register Admin
    const admin = await request(app)
      .post("/api/auth/register")
      .send({
        fullName: "Workout Admin",
        email: `workoutadmin${Date.now()}@gmail.com`,
        password: "Password123",
        role: "ADMIN",
      });

    adminToken = admin.body.token;

    // Register Member
    const member = await request(app)
      .post("/api/auth/register")
      .send({
        fullName: "Workout Member",
        email: `workoutmember${Date.now()}@gmail.com`,
        password: "Password123",
        role: "MEMBER",
      });

    memberToken = member.body.token;
  });

  test("Admin creates a workout plan", async () => {
    const response = await request(app)
      .post("/api/workouts")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Beginner Weight Loss",
        description: "Workout for beginners",
        category: "Cardio",
        targetGoal: "WEIGHT_LOSS",
        difficulty: "BEGINNER",
        duration: 45,
        calories: 350,
        equipmentRequired: false,
        sessionsPerWeek: 4,
        estimatedWeeks: 8,
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);

    workoutId = response.body.workout.id;
  });

  test("Get all workouts", async () => {
    const response = await request(app)
      .get("/api/workouts")
      .set("Authorization", `Bearer ${memberToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("Get workout by ID", async () => {
    const response = await request(app)
      .get(`/api/workouts/${workoutId}`)
      .set("Authorization", `Bearer ${memberToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("Update workout", async () => {
    const response = await request(app)
      .put(`/api/workouts/${workoutId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        duration: 60,
        calories: 450,
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("Delete workout", async () => {
    const response = await request(app)
      .delete(`/api/workouts/${workoutId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});