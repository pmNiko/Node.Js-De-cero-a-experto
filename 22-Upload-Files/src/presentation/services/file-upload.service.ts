import type{ UploadedFile } from "express-fileupload";

export class FileUploadService {
  constructor() {}

  private checkFolder() {
    throw new Error("Not implemeted");
  }

  public uploadSingle(
    file: UploadedFile,
    folder: string = "uploads",
    validExtensions: string[] = ["png", "pjg", "jpeg", "gif"]
  ) {
    const fileextension = file.
    
  }

  public uploadMultiple(
    file: UploadedFile[],
    folder: string = "uploads",
    validExtensions: string[] = ["png", "pjg", "jpeg", "gif"]
  ) {}
}
