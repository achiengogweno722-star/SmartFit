import request from "supertest";
import app from "../app.js";

describe("Health API", () => {
  test("GET /api/health should return status 200", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("SmartFit API is running 🚀");
  });
});