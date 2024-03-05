import { NextFunction, Request, Response } from "express";
import { TaskUseCase } from "./taskUseCase";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { UpdateTaskDTO } from "./dto/update-task.dto";
import { AppError } from "../shared/error/AppError";

export class TaskController {
    constructor(private readonly useCase: TaskUseCase){}

    async create(req: Request, res: Response) {
        const body = req.body as CreateTaskDTO

        const createTask = await this.useCase.createTask(body)

        return res.status(201).json(createTask)
    }

    async findOne(req: Request, res: Response, next: NextFunction) {
        // try {

            const { id } = req.params
    
            const find = await this.useCase.findTask(id, next)
    
            return res.status(200).json(find)

    //     } catch (error) {
    //         next(new AppError('Task Not Found!', 404))
    //     }

    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        const findAll = await this.useCase.findAllTasks(next)

        return res.status(200).json(findAll)
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const body = req.body as UpdateTaskDTO
        const { id } = req.params

        const updateTask = await this.useCase.updateTask(body, id, next)

        return res.status(200).json(updateTask)
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {

            const { id } = req.params
    
            const deleteTask = await this.useCase.deleteTask(id, next)
    
            return res.status(204).json()
        } catch (error) {
            next(new AppError('Task Not Found!', 404))
        }
    }
} 