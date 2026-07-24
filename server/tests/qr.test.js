import request from "supertest";
import app from "../app.js";

describe("QR Code API", () => {
  let token;

  beforeAll(async () => {
    const userResponse = await request(app)
      .post("/api/auth/register")
      .send({
        fullName: "QR Member",
        email: `qrmember${Date.now()}@gmail.com`,
        password: "Password123",
        role: "MEMBER",
      });

    expect(userResponse.status).toBe(201);
    token = userResponse.body.token;

    const profileResponse = await request(app)
      .post("/api/member/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({
        gender: "FEMALE",
        dateOfBirth: "1992-08-10",
        height: 170,
        weight: 62,
        fitnessLevel: "INTERMEDIATE",
        fitnessGoal: "GENERAL_FITNESS",
        availableDaysPerWeek: 5,
        preferredWorkoutTime: "Afternoon",
      });

    expect(profileResponse.status).toBe(201);
  });

  test("POST /api/qr/generate creates a QR code", async () => {
    const response = await request(app)
      .post("/api/qr/generate")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.qr).toHaveProperty("code");
    expect(response.body.qr.expiresAt).toBeDefined();
  });

  test("GET /api/qr/my returns generated QR codes", async () => {
    const response = await request(app)
      .get("/api/qr/my")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.codes)).toBe(true);
    expect(response.body.codes.length).toBeGreaterThan(0);
  });
});
