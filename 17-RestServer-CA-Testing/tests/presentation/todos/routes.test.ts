import { prisma } from "../../../src/data/postgres";
import { testServer } from "../../test-server";
import { requestGET, requestPOST, requestPUT } from "./settings";

describe("Test on routes '/api/todos'", () => {
  const todo1 = { text: "First Todo" };
  const todo2 = { text: "Second Todo" };

  beforeAll(async () => await testServer.start());

  beforeEach(async () => await prisma.todo.deleteMany({}));

  afterAll(() => testServer.close());

  //   test('should return all todos - GET "/"', async () => {
  //     await prisma.todo.createMany({ data: [todo1, todo2] });

  //     const response = await requestGET("/")
  //       .expect("Content-Type", /json/)
  //       .expect(200);

  //     expect(response.body).toHaveLength(2);
  //     expect(response.body).toBeInstanceOf(Array);
  //     expect(response.body.at(0).completedAt).toBeNull();
  //   });

  //   test('should return TODO by ID - GET "/:id"', async () => {
  //     const todoInsert = await prisma.todo.create({
  //       data: todo1,
  //     });

  //     const response = await requestGET(todoInsert.id);

  //     expect(response.body).toBeDefined();
  //     expect(response.body).toBeInstanceOf(Object);
  //     expect(response.body).toEqual({
  //       text: todo1.text,
  //       id: todoInsert.id,
  //       completedAt: null,
  //     });
  //   });

  //   test("should return 404 if TODO ID does not exist", async () => {
  //     const idDoesNotExist = 1;
  //     await prisma.todo.deleteMany({ where: { id: idDoesNotExist } });

  //     const response = await requestGET(idDoesNotExist);

  //     expect(response.body.err).toEqual("Todo with id 1 not found");
  //   });

  //   test('should return a new TODO - "/"', async () => {
  //     const response = await requestPOST().send(todo1).expect(201);

  //     expect(response.body).toEqual({
  //       id: expect.any(Number),
  //       text: todo1.text,
  //       completedAt: null,
  //     });
  //   });

  //   test("should return an error - if text does not exist", async () => {
  //     const response = await requestPOST().send({}).expect(400);

  //     expect(response.body).toEqual({ error: "Text property is required" });
  //   });

  //   test("should return an error - if text is empty", async () => {
  //     const response = await requestPOST().send({ text: "" }).expect(400);

  //     expect(response.body).toEqual({ error: "Text property is required" });
  //   });

  test("should ", async () => {
    const response = await requestPUT();
  });
});
