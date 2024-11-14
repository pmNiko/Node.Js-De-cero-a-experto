import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { FileUploadService } from "../services";

export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  private handlerError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);

    return res.status(500).json({ error: "Internal Server Error" });
  };

  public uploadFile = (req: Request, res: Response) => {
    this.fileUploadService
      .uploadSingle(req.body.files, `uploads/${req.params.type}`)
      .then((uploaded) => res.json(uploaded))
      .catch((err) => this.handlerError(err, res));
  };

  public fileMultipleUpload = async (req: Request, res: Response) => {
    this.fileUploadService
      .uploadMultiple(req.body.files, `uploads/${req.params.type}`)
      .then((uploaded) => res.json(uploaded))
      .catch((err) => this.handlerError(err, res));
  };
}
