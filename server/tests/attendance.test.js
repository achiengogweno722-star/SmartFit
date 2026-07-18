import request from "supertest";
import app from "../app.js";

describe("Attendance API", () => {
  let memberToken;
  let adminToken;
  let trainerToken;

  beforeAll(async () => {
    // Register Admin
    const admin = await request(app)
      .post("/api/auth/register")
      .send({
        fullName: "Attendance Admin",
        email: `attendanceadmin${Date.now()}@gmail.com`,
        password: "Password123",
        role: "ADMIN",
      });

    adminToken = admin.body.token;

    // Register Trainer
    const trainer = await request(app)
      .post("/api/auth/register")
      .send({
        fullName: "Attendance Trainer",
        email: `attendancetrainer${Date.now()}@gmail.com`,
        password: "Password123",
        role: "TRAINER",
      });

    trainerToken = trainer.body.token;

    // Create Trainer Profile
    await request(app)
      .post("/api/trainers/profile")
      .set("Authorization", `Bearer ${trainerToken}`)
      .send({
        specialization: "Strength Training",
        experience: 5,
        phoneNumber: "0712345678",
      });

    // Register Member
    const member = await request(app)
      .post("/api/auth/register")
      .send({
        fullName: "Attendance Member",
        email: `attendancemember${Date.now()}@gmail.com`,
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

  test("Member can check in", async () => {
    const res = await request(app)
      .post("/api/attendance/check-in")
      .set("Authorization", `Bearer ${memberToken}`);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  test("Member cannot check in twice", async () => {
    const res = await request(app)
      .post("/api/attendance/check-in")
      .set("Authorization", `Bearer ${memberToken}`);

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("You are already checked in.");
  });

  test("Member can check out", async () => {
    const res = await request(app)
      .put("/api/attendance/check-out")
      .set("Authorization", `Bearer ${memberToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test("Member cannot check out twice", async () => {
    const res = await request(app)
      .put("/api/attendance/check-out")
      .set("Authorization", `Bearer ${memberToken}`);

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("No active check-in found.");
  });

  test("Member can view attendance history", async () => {
    const res = await request(app)
      .get("/api/attendance/my-history")
      .set("Authorization", `Bearer ${memberToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.attendance)).toBe(true);
  });

  test("Admin can view all attendance", async () => {
    const res = await request(app)
      .get("/api/attendance")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.attendance)).toBe(true);
  });

  test("Trainer can view all attendance", async () => {
    const res = await request(app)
      .get("/api/attendance")
      .set("Authorization", `Bearer ${trainerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test("Admin can view active members", async () => {
    // Check member back in
    await request(app)
      .post("/api/attendance/check-in")
      .set("Authorization", `Bearer ${memberToken}`);

    const res = await request(app)
      .get("/api/attendance/active")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.members)).toBe(true);
  });

  test("Trainer can view active members", async () => {
    const res = await request(app)
      .get("/api/attendance/active")
      .set("Authorization", `Bearer ${trainerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test("Admin cannot check in", async () => {
    const res = await request(app)
      .post("/api/attendance/check-in")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(403);
  });

  test("Unauthorized request returns 401", async () => {
    const res = await request(app)
      .get("/api/attendance/my-history");

    expect(res.status).toBe(401);
  });
});