import { prisma } from "../../../src/data/postgres";
import { testServer } from "../../test-server";
import { requestDELETE, requestGET, requestPOST, requestPUT } from "./settings";

describe("Test on routes '/api/todos'", () => {
  const todo1 = { text: "First Todo" };
  const todo2 = { text: "Second Todo" };

  beforeAll(async () => await testServer.start());

  beforeEach(async () => await prisma.todo.deleteMany({}));

  afterAll(() => testServer.close());

  test('should return all todos - GET "/"', async () => {
    await prisma.todo.createMany({ data: [todo1, todo2] });

    const response = await requestGET("/")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveLength(2);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.at(0).completedAt).toBeNull();
  });

  test('should return TODO by ID - GET "/:id"', async () => {
    const todoInsert = await prisma.todo.create({
      data: todo1,
    });

    const response = await requestGET(todoInsert.id);

    expect(response.body).toBeDefined();
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toEqual({
      text: todo1.text,
      id: todoInsert.id,
      completedAt: null,
    });
  });

  test("should return 404 if TODO ID does not exist", async () => {
    const idDoesNotExist = 1;
    await prisma.todo.deleteMany({ where: { id: idDoesNotExist } });

    const response = await requestGET(idDoesNotExist);

    expect(response.body.error).toEqual("Todo with id 1 not found");
  });

  test('should return a new TODO - "/"', async () => {
    const response = await requestPOST().send(todo1).expect(201);

    expect(response.body).toEqual({
      id: expect.any(Number),
      text: todo1.text,
      completedAt: null,
    });
  });

  test("should return an error - if text does not exist", async () => {
    const response = await requestPOST().send({}).expect(400);

    expect(response.body).toEqual({ error: "Text property is required" });
  });

  test("should return an error - if text is empty", async () => {
    const response = await requestPOST().send({ text: "" }).expect(400);

    expect(response.body).toEqual({ error: "Text property is required" });
  });

  test("should return an updated TODO api/todos/:id with Object", async () => {
    const updateDate = new Date("2024-11-04");
    const todo = await prisma.todo.create({ data: todo1 });

    expect(todo.completedAt).toBeNull();

    todo.completedAt = updateDate;

    const response = await requestPUT(todo.id).send(todo).expect(200);

    expect(response.body.completedAt).not.toBeNull();
    expect(new Date(response.body.completedAt)).toEqual(updateDate);
  });

  test("should return an updated TODO api/todos/:id with property in Object", async () => {
    const updateDate = new Date("2024-11-04");
    const todo = await prisma.todo.create({ data: todo1 });

    expect(todo.completedAt).toBeNull();

    const response = await requestPUT(todo.id)
      .send({ completedAt: updateDate })
      .expect(200);

    expect(response.body.completedAt).not.toBeNull();
    expect(new Date(response.body.completedAt)).toEqual(updateDate);
  });

  test("should return an updated TODO api/todos/:id with new text", async () => {
    const udpateText = "Text updated";
    const todo = await prisma.todo.create({ data: todo1 });

    expect(todo.text).toEqual("First Todo");

    const response = await requestPUT(todo.id)
      .send({ text: udpateText })
      .expect(200);

    expect(response.body.text).toEqual(udpateText);
  });

  test("should return an TODO api/todos/:id with ID todo", async () => {
    const todo = await prisma.todo.create({ data: todo1 });

    const response = await requestPUT(todo.id).expect(200);

    expect(response.body).toEqual(todo);
  });

  test("should return 404 if todo not found", async () => {
    const idDoesNotExist = 1;
    await prisma.todo.deleteMany({ where: { id: idDoesNotExist } });

    const response = await requestPUT(idDoesNotExist).expect(404);

    expect(response.body.error).toEqual("Todo with id 1 not found");
  });

  test("should delete a TODO api/todos/:id", async () => {
    const todo = await prisma.todo.create({ data: todo1 });

    await requestGET(todo.id).expect(200);

    await requestDELETE(todo.id)
      .expect(200)
      .then((res) => expect(res.body).toEqual(todo));

    await requestGET(todo.id).expect(404);
  });
});
