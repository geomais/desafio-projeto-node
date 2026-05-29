import { AppError } from "./app-error";

export class NotFoundError extends AppError {
  public constructor(message = "Recurso não encontrado.") {
    super(message, 404);
  }
}
