import request from "supertest";
import app from "../app.js";

describe("Admin Dashboard", () => {
  let adminToken;
  let trainerToken;
  let memberToken;

  beforeAll(async () => {
    // Register Admin
    const admin = await request(app)
      .post("/api/auth/register")
      .send({
        fullName: "Dashboard Admin",
        email: `dashboardadmin${Date.now()}@gmail.com`,
        password: "Password123",
        role: "ADMIN",
      });

    adminToken = admin.body.token;

    // Register Trainer
    const trainer = await request(app)
      .post("/api/auth/register")
      .send({
        fullName: "Dashboard Trainer",
        email: `dashboardtrainer${Date.now()}@gmail.com`,
        password: "Password123",
        role: "TRAINER",
      });

    trainerToken = trainer.body.token;

    // Register Member
    const member = await request(app)
      .post("/api/auth/register")
      .send({
        fullName: "Dashboard Member",
        email: `dashboardmember${Date.now()}@gmail.com`,
        password: "Password123",
        role: "MEMBER",
      });

    memberToken = member.body.token;
  });

  test("Admin can view dashboard", async () => {
    const res = await request(app)
      .get("/api/dashboard")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    expect(res.body.dashboard).toHaveProperty("totalMembers");
    expect(res.body.dashboard).toHaveProperty("totalTrainers");
    expect(res.body.dashboard).toHaveProperty("totalWorkoutPlans");
    expect(res.body.dashboard).toHaveProperty("totalWorkoutCompletions");
    expect(res.body.dashboard).toHaveProperty("totalCaloriesBurned");
    expect(res.body.dashboard).toHaveProperty("averageBMI");
    expect(res.body.dashboard).toHaveProperty("averageWeight");
    expect(res.body.dashboard).toHaveProperty("mostPopularWorkout");
  });

  test("Trainer cannot access dashboard", async () => {
    const res = await request(app)
      .get("/api/dashboard")
      .set("Authorization", `Bearer ${trainerToken}`);

    expect(res.statusCode).toBe(403);
  });

  test("Member cannot access dashboard", async () => {
    const res = await request(app)
      .get("/api/dashboard")
      .set("Authorization", `Bearer ${memberToken}`);

    expect(res.statusCode).toBe(403);
  });

  test("Unauthorized request returns 401", async () => {
    const res = await request(app).get("/api/dashboard");

    expect(res.statusCode).toBe(401);
  });
});