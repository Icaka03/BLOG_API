import request from "supertest";
import app from "../app";

describe("POST /api/auth/login", () => {
  test("should login successfully with correct credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "generatorfxox@gmail.com",
      password: "123456",
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined(); // token exists
  });

  test("should fail with wrong password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "generatorfxox@gmail.com",
      password: "wrongpassword",
    });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  test("should fail with missing fields", async () => {
    const res = await request(app).post("/api/auth/login").send({});

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});
