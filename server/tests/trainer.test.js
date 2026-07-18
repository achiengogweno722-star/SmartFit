import request from "supertest";
import app from "../app.js";

describe("Trainer API", () => {
  let adminToken;
  let trainerToken;

  beforeAll(async () => {
    // Register admin
    const admin = await request(app)
      .post("/api/auth/register")
      .send({
        fullName: "Admin Test",
        email: `admin${Date.now()}@gmail.com`,
        password: "Password123",
        role: "ADMIN",
      });

    adminToken = admin.body.token;

    // Register trainer
    const trainer = await request(app)
      .post("/api/auth/register")
      .send({
        fullName: "Trainer Test",
        email: `trainer${Date.now()}@gmail.com`,
        password: "Password123",
        role: "TRAINER",
      });

    trainerToken = trainer.body.token;
  });

  test("Trainer creates profile", async () => {
    const response = await request(app)
      .post("/api/trainers/profile")
      .set("Authorization", `Bearer ${trainerToken}`)
      .send({
        specialization: "Strength Training",
        experience: 5,
        phoneNumber: "0712345678",
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  test("Admin gets all trainers", async () => {
    const response = await request(app)
      .get("/api/trainers")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.trainers)).toBe(true);
  });

  test("Member cannot create trainer profile", async () => {
    const member = await request(app)
      .post("/api/auth/register")
      .send({
        fullName: "Member Test",
        email: `member${Date.now()}@gmail.com`,
        password: "Password123",
        role: "MEMBER",
      });

    const response = await request(app)
      .post("/api/trainers/profile")
      .set("Authorization", `Bearer ${member.body.token}`)
      .send({
        specialization: "Yoga",
        experience: 2,
      });

    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
  });
});