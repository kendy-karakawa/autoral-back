import app, { init } from "@/app";
import httpStatus from "http-status";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import { createUser } from "../factories";
import { cleanDb } from "../helpers";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("POST /user", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.post("/user");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
    };

    const response = await server.post("/user").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
    const generateValidBody = () => ({
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(6),
      phone: "11999999999",
    });

    it("should respond with status 409 when there is an user with given email", async () => {
      const body = generateValidBody();
      await createUser(body);
      const response = await server.post("/user").send(body);

      expect(response.status).toBe(httpStatus.CONFLICT);
      expect(response.body).toEqual({ message: "Email already exist" });
    });

    it("should respond with status 201 and create user when given email is unique", async () => {
      const body = generateValidBody();
      const response = await server.post("/user").send(body);

      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: response.body.id,
          name: body.name,
          email: body.email,
          phone: body.phone,
        })
      );
    });
  });
});
