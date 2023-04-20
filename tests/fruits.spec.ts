import supertest from "supertest";
import app from "index";
import { FruitInput } from "services/fruits-service";

const server = supertest(app);

describe("locations suit", () => {
  it("should create a fruit data", async () => {
    const fruit: FruitInput = {
      name: "banana",
      price: 5,
    };

    const result = await server.post("/fruits").send(fruit);
    expect(result.status).toBe(201);
  });

  it("should return all fruits", async () => {
    const result = await server.get("/fruits");

    expect(result.status).toBe(200);
    expect(result.body.length).toBe(1);
  });

  it("can't duplicate a fruit", async () => {
    const fruit: FruitInput = {
      name: "banana",
      price: 5,
    };

    const result = await server.post("/fruits").send(fruit);

    expect(result.status).toBe(409);
  });

  it("should stop incomplete fruit data", async () => {
    const fruit = {
      name: "banana",
    };

    const result = await server.post("/fruits").send(fruit);

    expect(result.status).toBe(422);
  });

  it("should verify if fruit id exists", async () => {
    const result = await server.get("/fruits/2");

    expect(result.status).toBe(404);
  });
});
