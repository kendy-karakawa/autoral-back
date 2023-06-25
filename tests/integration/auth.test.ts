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

describe("POST /sigin", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.post("/sigin");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
    };

    const response = await server.post("/sigin").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
    const generateValidSignUoData = () => ({
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(6),
      phone: "11999999999",
    });

    it("should respond with status 401 if there is no user for given email", async () => {
      const body = {
        email: faker.internet.email(),
        password: faker.internet.password(6),
      };

      const response = await server.post("/sigin").send(body);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if there is a user for given email but password is not correct", async () => {
      const data = generateValidSignUoData();
      await createUser(data);
      const body = {
        email: data.email,
        password: faker.internet.password(6),
      };
      const response = await server.post("/sigin").send(body);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe("when credentials are valid", () => {
      it("should respond with status 200", async () => {
        const data = generateValidSignUoData();
        await createUser(data);
        const body = {
          email: data.email,
          password: data.password,
        };

        const response = await server.post("/sigin").send(body);
        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toBeDefined()
      });
    });
  });
});
