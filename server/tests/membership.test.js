import request from "supertest";
import app from "../app.js";

describe("Membership API", () => {
  let token;
  let memberProfile;

  beforeAll(async () => {
    const newMember = {
      fullName: "Membership Member",
      email: `membership${Date.now()}@gmail.com`,
      password: "Password123",
      role: "MEMBER",
    };

    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send(newMember);

    expect(registerResponse.status).toBe(201);
    token = registerResponse.body.token;

    const profileResponse = await request(app)
      .post("/api/member/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({
        gender: "FEMALE",
        dateOfBirth: "1995-04-12",
        height: 165,
        weight: 60,
        fitnessLevel: "INTERMEDIATE",
        fitnessGoal: "MUSCLE_GAIN",
        availableDaysPerWeek: 4,
        preferredWorkoutTime: "Morning",
      });

    expect(profileResponse.status).toBe(201);
    memberProfile = profileResponse.body.profile;
  });

  test("GET /api/memberships/my returns member membership details", async () => {
    const response = await request(app)
      .get("/api/memberships/my")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.membership).toBeDefined();
    expect(response.body.membership.user.email).toBeDefined();
  });

  test("POST /api/memberships/subscribe creates membership and payment", async () => {
    const response = await request(app)
      .post("/api/memberships/subscribe")
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: 79.99,
        durationDays: 30,
        currency: "USD",
        description: "Monthly membership",
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.membership.membershipStatus).toBe("ACTIVE");
    expect(response.body.payment).toBeDefined();
    expect(response.body.payment.amount).toBe(79.99);
  });

  test("GET /api/memberships/my returns active membership after subscribe", async () => {
    const response = await request(app)
      .get("/api/memberships/my")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.membership.membershipStatus).toBe("ACTIVE");
    expect(response.body.membership.membershipStarted).toBeDefined();
    expect(response.body.membership.membershipExpires).toBeDefined();
  });

  test("GET /api/memberships/my without token returns 401", async () => {
    const response = await request(app).get("/api/memberships/my");

    expect(response.status).toBe(401);
  });
});
