import request from "supertest";
import app from "../app.js";

describe("Notification API", () => {
  let token;
  let memberId;

  beforeAll(async () => {
    const newUser = {
      fullName: "Notification Member",
      email: `notification${Date.now()}@gmail.com`,
      password: "Password123",
      role: "MEMBER",
    };

    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send(newUser);

    expect(registerResponse.status).toBe(201);
    token = registerResponse.body.token;

    const profileResponse = await request(app)
      .post("/api/member/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({
        gender: "MALE",
        dateOfBirth: "1994-11-15",
        height: 180,
        weight: 78,
        fitnessLevel: "BEGINNER",
        fitnessGoal: "MUSCLE_GAIN",
        availableDaysPerWeek: 5,
        preferredWorkoutTime: "Evening",
      });

    expect(profileResponse.status).toBe(201);
    memberId = profileResponse.body.profile.id;
  });

  test("GET /api/notifications/my returns no notifications initially", async () => {
    const response = await request(app)
      .get("/api/notifications/my")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.notifications)).toBe(true);
  });

  test("POST /api/notifications creates a notification as admin", async () => {
    const adminResponse = await request(app)
      .post("/api/auth/register")
      .send({
        fullName: "Notification Admin",
        email: `notificationadmin${Date.now()}@gmail.com`,
        password: "Password123",
        role: "ADMIN",
      });

    expect(adminResponse.status).toBe(201);

    const createResponse = await request(app)
      .post("/api/notifications")
      .set("Authorization", `Bearer ${adminResponse.body.token}`)
      .send({
        memberId,
        title: "Welcome to SmartFit",
        message: "Your first workout is scheduled.",
        type: "INFO",
      });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body.success).toBe(true);
    expect(createResponse.body.notification.title).toBe("Welcome to SmartFit");
  });

  test("GET /api/notifications/my returns created notification", async () => {
    const response = await request(app)
      .get("/api/notifications/my")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.notifications.length).toBeGreaterThan(0);
    expect(response.body.notifications[0]).toHaveProperty("title");
  });

  test("PUT /api/notifications/:notificationId/read marks status as read", async () => {
    const notificationsResponse = await request(app)
      .get("/api/notifications/my")
      .set("Authorization", `Bearer ${token}`);

    const notificationId = notificationsResponse.body.notifications[0].id;

    const response = await request(app)
      .put(`/api/notifications/${notificationId}/read`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.notification.read).toBe(true);
  });
});
