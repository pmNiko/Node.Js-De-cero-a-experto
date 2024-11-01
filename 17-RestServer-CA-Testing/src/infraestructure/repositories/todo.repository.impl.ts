import {
  CreateTodoDTO,
  TodoDatasource,
  TodoEntity,
  TodoRepository,
  UpdateTodoDTO,
} from "../../domain";

export class TodoRepositoryImpl implements TodoRepository {
  constructor(private readonly datasource: TodoDatasource) {}

  create(dto: CreateTodoDTO): Promise<TodoEntity> {
    return this.datasource.create(dto);
  }
  getAll(): Promise<TodoEntity[]> {
    return this.datasource.getAll();
  }
  findById(id: number): Promise<TodoEntity> {
    return this.datasource.findById(id);
  }
  updateTodoById(dto: UpdateTodoDTO): Promise<TodoEntity> {
    return this.datasource.updateTodoById(dto);
  }
  deleteTodoById(id: number): Promise<TodoEntity> {
    return this.datasource.deleteTodoById(id);
  }
}
