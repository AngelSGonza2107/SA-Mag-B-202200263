import type { ErrorRequestHandler, RequestHandler } from "express";
import { DomainError } from "../../domain/errors/DomainError.js";

export const notFoundHandler: RequestHandler = (_request, response) => {
  response.status(404).json({
    error: { code: "ROUTE_NOT_FOUND", message: "La ruta solicitada no existe" },
  });
};

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof DomainError) {
    response.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message,
        ...(error.details !== undefined ? { details: error.details } : {}),
      },
    });
    return;
  }

  if (error instanceof SyntaxError && "body" in error) {
    response.status(400).json({
      error: { code: "INVALID_JSON", message: "El cuerpo contiene JSON inválido" },
    });
    return;
  }

  console.error(error);
  response.status(500).json({
    error: { code: "INTERNAL_ERROR", message: "Ocurrió un error interno" },
  });
};
