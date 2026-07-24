import request from "supertest";
import app from "./app.js";

const run = async () => {
  const reg = await request(app)
    .post("/api/auth/register")
    .send({
      fullName: "NotifyMemberTest",
      email: `notifytest${Date.now()}@gmail.com`,
      password: "Password123",
      role: "MEMBER",
    });
  console.log("register", reg.status, reg.body);

  const token = reg.body.token;

  const profile = await request(app)
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
  console.log("profile", profile.status, profile.body);

  const getNot = await request(app)
    .get("/api/notifications/my")
    .set("Authorization", `Bearer ${token}`);
  console.log("getNot", getNot.status, getNot.body);

  const admin = await request(app)
    .post("/api/auth/register")
    .send({
      fullName: "NotifyAdminTest",
      email: `notifyadmintest${Date.now()}@gmail.com`,
      password: "Password123",
      role: "ADMIN",
    });
  console.log("admin", admin.status, admin.body);

  const create = await request(app)
    .post("/api/notifications")
    .set("Authorization", `Bearer ${admin.body.token}`)
    .send({
      memberId: profile.body.profile.id,
      title: "Welcome",
      message: "Welcome to SmartFit!",
      type: "INFO",
    });
  console.log("create", create.status, create.body);

  const getNot2 = await request(app)
    .get("/api/notifications/my")
    .set("Authorization", `Bearer ${token}`);
  console.log("getNot2", getNot2.status, getNot2.body);

  if (getNot2.body.notifications?.[0]) {
    const mark = await request(app)
      .put(`/api/notifications/${getNot2.body.notifications[0].id}/read`)
      .set("Authorization", `Bearer ${token}`);
    console.log("mark", mark.status, mark.body);
  }
};

run().catch((err) => console.error(err));
