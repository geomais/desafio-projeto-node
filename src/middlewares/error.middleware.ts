import type { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { AppError } from "../shared/errors/app-error";
import type { ApiErrorResponse } from "../types/http.types";

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response<ApiErrorResponse>,
  next: NextFunction
): void => {
  void req;
  void next;

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
      statusCode: error.statusCode
    });
    return;
  }

  res.status(500).json({
    message: "Erro interno do servidor.",
    statusCode: 500
  });
};
