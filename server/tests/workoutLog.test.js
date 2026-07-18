import request from "supertest";
import app from "../app.js";

describe("Workout Log API", () => {
  let adminToken;
  let memberToken;
  let memberId;
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

    // Create Workout Plan
    const workout = await request(app)
      .post("/api/workouts")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Workout Log Test",
        description: "Workout for testing logs",
        category: "Cardio",
        targetGoal: "WEIGHT_LOSS",
        difficulty: "BEGINNER",
        duration: 45,
        calories: 400,
        equipmentRequired: false,
        sessionsPerWeek: 4,
        estimatedWeeks: 8,
      });

    workoutId = workout.body.workout.id;

    // Assign Workout to Member
    await request(app)
      .post(`/api/workouts/${workoutId}/assign/${memberId}`)
      .set("Authorization", `Bearer ${adminToken}`);
  });

  test("Member can complete a workout", async () => {
    const response = await request(app)
      .post("/api/workout-logs")
      .set("Authorization", `Bearer ${memberToken}`)
      .send({
        workoutPlanId: workoutId,
        durationCompleted: 45,
        caloriesBurned: 420,
        notes: "Completed successfully",
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.workout.completed).toBe(true);
  });

  test("Member can view workout history", async () => {
    const response = await request(app)
      .get("/api/workout-logs")
      .set("Authorization", `Bearer ${memberToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.workouts)).toBe(true);
    expect(response.body.workouts.length).toBeGreaterThan(0);
  });
});