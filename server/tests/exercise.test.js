import request from "supertest";
import app from "../app.js";

describe("Exercise API", () => {
  let adminToken;
  let memberToken;
  let workoutId;
  let exerciseId;

  beforeAll(async () => {
    // Register Admin
    const admin = await request(app)
      .post("/api/auth/register")
      .send({
        fullName: "Exercise Admin",
        email: `exerciseadmin${Date.now()}@gmail.com`,
        password: "Password123",
        role: "ADMIN",
      });

    adminToken = admin.body.token;

    // Register Member
    const member = await request(app)
      .post("/api/auth/register")
      .send({
        fullName: "Exercise Member",
        email: `exercisemember${Date.now()}@gmail.com`,
        password: "Password123",
        role: "MEMBER",
      });

    memberToken = member.body.token;

    // Create Workout
    const workout = await request(app)
      .post("/api/workouts")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Exercise Test Workout",
        description: "Workout for exercise tests",
        category: "Strength",
        targetGoal: "MUSCLE_GAIN",
        difficulty: "BEGINNER",
        duration: 45,
        calories: 300,
        equipmentRequired: false,
        sessionsPerWeek: 3,
        estimatedWeeks: 6,
      });

    workoutId = workout.body.workout.id;
  });

  test("Admin creates an exercise", async () => {
    const response = await request(app)
      .post("/api/exercises")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        workoutPlanId: workoutId,
        name: "Push Ups",
        description: "Standard push ups",
        sets: 3,
        reps: 12,
        restSeconds: 60,
        difficulty: "BEGINNER",
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);

    exerciseId = response.body.exercise.id;
  });

  test("Get all exercises", async () => {
    const response = await request(app)
      .get("/api/exercises")
      .set("Authorization", `Bearer ${memberToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("Get exercise by ID", async () => {
    const response = await request(app)
      .get(`/api/exercises/${exerciseId}`)
      .set("Authorization", `Bearer ${memberToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("Update exercise", async () => {
    const response = await request(app)
      .put(`/api/exercises/${exerciseId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        sets: 4,
        reps: 15,
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("Delete exercise", async () => {
    const response = await request(app)
      .delete(`/api/exercises/${exerciseId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});