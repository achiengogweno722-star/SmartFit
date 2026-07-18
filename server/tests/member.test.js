import request from "supertest";
import app from "../app.js";

describe("Member Profile API", () => {
  let token;
  let secondToken;

  let adminToken;
  let trainerId;
  let memberProfileId;

  const testUser = {
    fullName: "Member Test",
    email: `member${Date.now()}@gmail.com`,
    password: "Password123",
    role: "MEMBER",
  };

  const secondUser = {
    fullName: "Second Member",
    email: `member2${Date.now()}@gmail.com`,
    password: "Password123",
    role: "MEMBER",
  };

  beforeAll(async () => {
    // Register first member
    const response = await request(app)
      .post("/api/auth/register")
      .send(testUser);

    token = response.body.token;

    // Register second member
    const response2 = await request(app)
      .post("/api/auth/register")
      .send(secondUser);

    secondToken = response2.body.token;

    // Register admin
    const admin = await request(app)
      .post("/api/auth/register")
      .send({
        fullName: "Member Admin",
        email: `memberadmin${Date.now()}@gmail.com`,
        password: "Password123",
        role: "ADMIN",
      });

    adminToken = admin.body.token;

    // Register trainer
    const trainer = await request(app)
      .post("/api/auth/register")
      .send({
        fullName: "Trainer One",
        email: `trainer${Date.now()}@gmail.com`,
        password: "Password123",
        role: "TRAINER",
      });

    const trainerToken = trainer.body.token;

    // Create trainer profile
    const trainerProfile = await request(app)
      .post("/api/trainers/profile")
      .set("Authorization", `Bearer ${trainerToken}`)
      .send({
        specialization: "Strength Training",
        experience: 5,
        phoneNumber: "0712345678",
      });

    expect(trainerProfile.status).toBe(201);

    trainerId = trainerProfile.body.trainer.id;
  });

  test("POST /api/member/profile - Create profile", async () => {
    const response = await request(app)
      .post("/api/member/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({
        gender: "MALE",
        dateOfBirth: "2000-01-01",
        height: 175,
        weight: 70,
        fitnessLevel: "BEGINNER",
        fitnessGoal: "WEIGHT_LOSS",
        availableDaysPerWeek: 4,
        preferredWorkoutTime: "Morning",
      });

    memberProfileId = response.body.profile.id;

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  test("POST /api/member/profile - Duplicate profile returns 409", async () => {
    const response = await request(app)
      .post("/api/member/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({
        gender: "MALE",
        dateOfBirth: "2000-01-01",
        height: 175,
        weight: 70,
        fitnessLevel: "BEGINNER",
        fitnessGoal: "WEIGHT_LOSS",
        availableDaysPerWeek: 4,
      });

    expect(response.status).toBe(409);
    expect(response.body.success).toBe(false);
  });

  test("GET /api/member/profile - Get profile", async () => {
    const response = await request(app)
      .get("/api/member/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("GET /api/member/profile - Profile not found", async () => {
    const response = await request(app)
      .get("/api/member/profile")
      .set("Authorization", `Bearer ${secondToken}`);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });

  test("PUT /api/member/profile - Update profile", async () => {
    const response = await request(app)
      .put("/api/member/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({
        height: 178,
        weight: 72,
        availableDaysPerWeek: 5,
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("PUT /api/member/profile - Profile not found", async () => {
    const response = await request(app)
      .put("/api/member/profile")
      .set("Authorization", `Bearer ${secondToken}`)
      .send({
        weight: 80,
      });

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });

  test("POST /api/member/:memberId/assign-trainer/:trainerId", async () => {
    const response = await request(app)
      .post(`/api/member/${memberProfileId}/assign-trainer/${trainerId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.member.trainer.id).toBe(trainerId);
  });

  test("Assign trainer - Member not found", async () => {
    const response = await request(app)
      .post(`/api/member/999999/assign-trainer/${trainerId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Member profile not found.");
  });

  test("Assign trainer - Trainer not found", async () => {
    const response = await request(app)
      .post(`/api/member/${memberProfileId}/assign-trainer/999999`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Trainer profile not found.");
  });

  test("Assign trainer - Unauthorized", async () => {
    const response = await request(app)
      .post(`/api/member/${memberProfileId}/assign-trainer/${trainerId}`);

    expect(response.status).toBe(401);
  });

  test("GET /api/member/profile - No token", async () => {
    const response = await request(app).get("/api/member/profile");

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });
});