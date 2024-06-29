const request = require("supertest");
const app = require("../../app");

jest.setTimeout(10000);

describe("Get All Planets", () => {
  test("Response with status code 200", async () => {
    const response = await request(app).get("/planets").expect(200);

    expect(response.status).toBe(200);
  });
});

describe("Get Kepler Planets", () => {
  const keyplerPlanets = [];
  test("Get All Keypler Planets", async () => {
    const response = await request(app).get("/planets").expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toMatchObject(keyplerPlanets);
  });
});
