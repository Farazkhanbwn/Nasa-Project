const request = require("supertest");
const app = require("../../app");

describe("Test Get /launches", () => {w
  test("It Should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.statusCode).toBe(200);
  });
});

describe("Test Post /launch", () => {
  const completeLaunchData = {
    mission: "USS EnterPrise",
    rocket: "NCC 1701-77",
    target: "kepler-1808",
    launchDate: "January 13, 2028",
  };

  const launchDataWithoutDate = {
    mission: "USS EnterPrise",
    rocket: "NCC 1701-77",
    target: "kepler-1808",
  };

  const launchDataWithInvalidDate = {
    mission: "USS EnterPrise",
    rocket: "NCC 1701-77",
    target: "kepler-1808",
    launchDate: "Zoot",
  };

  test("It should respond with 201 Created", async () => {
    const response = await request(app)
      .post("/launches")
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
      .post("/launches")
      .send(launchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing required launch property",
    });
  });
  
  test("It should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid launch date",
    });
  });
});
