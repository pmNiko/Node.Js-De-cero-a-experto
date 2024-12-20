import { CreateTodoDTO, UpdateTodoDTO } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoRepository {
  abstract create(dto: CreateTodoDTO): Promise<TodoEntity>;
  //todo: paginación
  abstract getAll(): Promise<TodoEntity[]>;

  abstract findById(id: number): Promise<TodoEntity>;

  abstract updateTodoById(dto: UpdateTodoDTO): Promise<TodoEntity>;

  abstract deleteTodoById(id: number): Promise<TodoEntity>;
}
