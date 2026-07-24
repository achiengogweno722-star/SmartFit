import request from "supertest";
import app from "../app.js";

describe("Appointment API", () => {
  let memberToken;
  let trainerToken;
  let trainerId;

  beforeAll(async () => {
    const memberResponse = await request(app)
      .post("/api/auth/register")
      .send({
        fullName: "Appointment Member",
        email: `appointmentmember${Date.now()}@gmail.com`,
        password: "Password123",
        role: "MEMBER",
      });

    expect(memberResponse.status).toBe(201);
    memberToken = memberResponse.body.token;

    const profileResponse = await request(app)
      .post("/api/member/profile")
      .set("Authorization", `Bearer ${memberToken}`)
      .send({
        gender: "FEMALE",
        dateOfBirth: "1990-05-21",
        height: 160,
        weight: 58,
        fitnessLevel: "BEGINNER",
        fitnessGoal: "WEIGHT_LOSS",
        availableDaysPerWeek: 3,
        preferredWorkoutTime: "Morning",
      });

    expect(profileResponse.status).toBe(201);

    const trainerResponse = await request(app)
      .post("/api/auth/register")
      .send({
        fullName: "Appointment Trainer",
        email: `appointmenttrainer${Date.now()}@gmail.com`,
        password: "Password123",
        role: "TRAINER",
      });

    expect(trainerResponse.status).toBe(201);
    trainerToken = trainerResponse.body.token;

    const trainerProfile = await request(app)
      .post("/api/trainers/profile")
      .set("Authorization", `Bearer ${trainerToken}`)
      .send({
        specialization: "Cardio",
        experience: 4,
        phoneNumber: "0711111111",
      });

    expect(trainerProfile.status).toBe(201);
    trainerId = trainerProfile.body.trainer.id;
  });

  test("POST /api/appointments creates an appointment", async () => {
    const response = await request(app)
      .post("/api/appointments")
      .set("Authorization", `Bearer ${memberToken}`)
      .send({
        trainerId,
        scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        notes: "Ready for my first session",
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.appointment.trainerId).toBe(trainerId);
  });

  test("GET /api/appointments/member returns appointment list", async () => {
    const response = await request(app)
      .get("/api/appointments/member")
      .set("Authorization", `Bearer ${memberToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.appointments)).toBe(true);
    expect(response.body.appointments.length).toBeGreaterThan(0);
  });

  test("GET /api/appointments/trainer returns appointment list", async () => {
    const response = await request(app)
      .get("/api/appointments/trainer")
      .set("Authorization", `Bearer ${trainerToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.appointments)).toBe(true);
  });
});
