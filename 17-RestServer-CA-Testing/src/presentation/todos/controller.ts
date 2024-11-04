import { Request, Response } from "express";
import {
  CreateTodo,
  CustomError,
  DeleteTodo,
  GetTodo,
  GetTodos,
  TodoRepository,
  UpdateTodo,
} from "../../domain";
import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/dtos";

export class TodoController {
  constructor(private readonly todoRepository: TodoRepository) {}

  private hanldeError = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }

    res.status(500).json({ error: "Internal server error - check logs" });
  };

  public getTodos = (req: Request, res: Response) => {
    new GetTodos(this.todoRepository)
      .execute()
      .then((data) => res.json(data))
      .catch((err) => this.hanldeError(res, err));
  };

  public getTodoByID = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    new GetTodo(this.todoRepository)
      .execute(id)
      .then((data) => res.json(data))
      .catch((err) => this.hanldeError(res, err));
  };

  public createTodo = (req: Request, res: Response) => {
    const [error, createTodoDTO] = CreateTodoDTO.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    new CreateTodo(this.todoRepository)
      .execute(createTodoDTO!)
      .then((data) => res.status(201).json(data))
      .catch((err) => this.hanldeError(res, err));
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const [error, updatedTodoDTO] = UpdateTodoDTO.create({ ...req.body, id });

    if (error) {
      res.status(400).json(error);
      return;
    }

    new UpdateTodo(this.todoRepository)
      .execute(updatedTodoDTO!)
      .then((data) => res.json(data))
      .catch((err) => this.hanldeError(res, err));
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    new DeleteTodo(this.todoRepository)
      .execute(id)
      .then((data) => res.json(data))
      .catch((err) => this.hanldeError(res, err));
  };
}
