import { NextFunction, Request, Response } from "express";
import { AppError } from "../error/AppError";

export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if(error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        })
    } else {
        console.error(error); // Se não for um AppError, registre o erro no console para depuração
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        })
    }
}