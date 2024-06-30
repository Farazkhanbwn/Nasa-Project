const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  jest.setTimeout(10000);

  describe("Test Get /launches", () => {
    test("It Should respond with 200 success", async () => {
      const response = await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Test Post /launch", () => {
    const completeLaunchData = {
      mission: "USS EnterPrise",
      rocket: "NCC 1701-77",
      target: "Kepler-1652 b",
      launchDate: "January 13, 2028",
    };

    const launchDataWithoutDate = {
      mission: "USS EnterPrise",
      rocket: "NCC 1701-77",
      target: "Kepler-1652 b",
    };

    const launchDataWithInvalidDate = {
      mission: "USS EnterPrise",
      rocket: "NCC 1701-77",
      target: "kepler-1808",
      launchDate: "Zoot",
    };

    test("It should respond with 201 Created", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(completeLaunchData)
        .expect("Content-Type", /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(requestDate).toBe(responseDate);
      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test("It should catch missing required properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Missing required launch property",
      });
    });

    test("It should catch invalid dates", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Invalid launch date",
      });
    });
  });
});
