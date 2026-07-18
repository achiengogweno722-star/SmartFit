import request from "supertest";
import app from "../app.js";

describe("Authentication API", () => {
  let token;

  const testUser = {
    fullName: "Test User",
    email: `test${Date.now()}@gmail.com`,
    password: "Password123",
    role: "MEMBER",
  };

  test("POST /api/auth/register", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(testUser);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();

    token = response.body.token;
  });

  test("POST /api/auth/login", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
  });

  test("POST /api/auth/login - invalid credentials", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "wrong@gmail.com",
        password: "wrongpassword",
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test("GET /api/auth/me", async () => {
    const response = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.user.email).toBe(testUser.email);
  });
});