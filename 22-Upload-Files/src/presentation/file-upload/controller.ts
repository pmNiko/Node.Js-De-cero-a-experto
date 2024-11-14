import { Request, Response } from "express";
import { CustomError } from "../../domain";

export class FileUploadController {
  constructor() {}

  private handlerError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);

    return res.status(500).json({ error: "Internal Server Error" });
  };

  public uploadFile = (req: Request, res: Response) => {
    console.log({ files: req.files });

    res.json("Upload File");
  };

  public fileMultipleUpload = async (req: Request, res: Response) => {
    res.json("file Multiple Upload");
  };
}
