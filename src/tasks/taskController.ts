import { Request, Response } from "express";
import { TaskUseCase } from "./taskUseCase";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { UpdateTaskDTO } from "./dto/update-task.dto";

export class TaskController {
    constructor(private readonly useCase: TaskUseCase){}

    async create(req: Request, res: Response) {
        const body = req.body as CreateTaskDTO

        const createTask = await this.useCase.createTask(body)

        return res.status(201).json(createTask)
    }

    async findOne(req: Request, res: Response) {
        const { id } = req.params

        const find = await this.useCase.findTask(id)

        return res.status(200).json(find)

    }

    async findAll(req: Request, res: Response) {
        const findAll = await this.useCase.findAllTasks()

        return res.status(200).json(findAll)
    }

    async update(req: Request, res: Response) {
        const body = req.body as UpdateTaskDTO
        const { id } = req.params

        const updateTask = await this.useCase.updateTask(body, id)

        return res.status(200).json(updateTask)
    }

    async remove(req: Request, res: Response) {
        const { id } = req.params

        const deleteTask = await this.useCase.deleteTask(id)

        return res.status(204).json()
    }
} 