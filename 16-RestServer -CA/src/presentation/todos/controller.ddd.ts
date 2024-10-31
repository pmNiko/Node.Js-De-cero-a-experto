import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

export class TodoController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();

    res.json(todos);
  };

  public getTodoByID = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
      const todo = await this.todoRepository.findById(id);

      todo
        ? res.status(200).json(todo)
        : res.status(404).json({ message: `Todo ${id} not found` });
    } catch (error) {
      res.status(400).json({ error });
    } finally {
      return;
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDTO] = CreateTodoDTO.create(req.body);

    if (error) {
      res.status(400).json({ message: "Body not available!" });
      return;
    }

    const todo = await this.todoRepository.create(createTodoDTO!);

    res.status(200).json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const [error, updatedTodoDTO] = UpdateTodoDTO.create({ ...req.body, id });

    if (error) {
      res.status(400).json(error);
      return;
    }

    try {
      const updatedTodo = await this.todoRepository.updateTodoById(
        updatedTodoDTO!
      );
      res.status(200).json(updatedTodo);
    } catch (error: any) {
      res.status(404).json({ message: error.message.split("\n").at(-1) });
    }
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
      const deleted = await this.todoRepository.deleteTodoById(id);
      res.status(200).json({ deleted });
    } catch (error: any) {
      res.status(404).json({ message: error.message.split("\n").at(-1) });
    }
  };
}
