import { AppError } from "./app-error";

export class UnauthorizedError extends AppError {
  public constructor(message = "Não autorizado.") {
    super(message, 401);
  }
}
