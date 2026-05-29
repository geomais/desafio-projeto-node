import type { NextFunction, Request, Response } from "express";
import { findUserById } from "../modules/users/user.repository";
import { UnauthorizedError } from "../shared/errors/unauthorized-error";

export function authMiddleware(req: Request, _res: Response, next: NextFunction): void {
  const userIdHeader = req.headers["x-user-id"];

  if (typeof userIdHeader !== "string") {
    next(new UnauthorizedError("Header x-user-id é obrigatório."));
    return;
  }

  const user = findUserById(userIdHeader);

  if (!user) {
    next(new UnauthorizedError("Usuário inválido."));
    return;
  }

  req.user = {
    id: user.id,
    name: user.name,
    email: user.email,
    companyId: user.companyId,
    role: user.role
  };

  next();
}
