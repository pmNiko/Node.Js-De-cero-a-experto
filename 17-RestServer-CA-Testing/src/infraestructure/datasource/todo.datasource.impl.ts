import { prisma } from "../../data/postgres";
import {
  CreateTodoDTO,
  CustomError,
  TodoDatasource,
  TodoEntity,
  UpdateTodoDTO,
} from "../../domain";

export class TodoDatasourceImpl implements TodoDatasource {
  constructor() {}

  async create(dto: CreateTodoDTO): Promise<TodoEntity> {
    const todo = await prisma.todo.create({ data: dto });

    return TodoEntity.fromObject(todo);
  }

  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();

    return todos.map(TodoEntity.fromObject);
  }

  async findById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo) throw new CustomError(`Todo with id ${id} not found`, 404);

    return TodoEntity.fromObject(todo);
  }

  async updateTodoById(dto: UpdateTodoDTO): Promise<TodoEntity> {
    await this.findById(dto.id);

    const updatedTodo = await prisma.todo.update({
      where: { id: dto.id },
      data: dto.values,
    });

    return TodoEntity.fromObject(updatedTodo);
  }

  async deleteTodoById(id: number): Promise<TodoEntity> {
    await this.findById(id);

    const deletedTodo = await prisma.todo.delete({ where: { id } });

    return TodoEntity.fromObject(deletedTodo);
  }
}
