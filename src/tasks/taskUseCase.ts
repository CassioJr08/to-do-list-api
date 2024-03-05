import { NextFunction } from 'express';
import { TaskRepository } from '../tasks/repository/task.repository'
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { AppError } from '../shared/error/AppError';

export class TaskUseCase {
    constructor(private readonly repository: TaskRepository){}

    async createTask(createTaskDTO: CreateTaskDTO) {
        const create = await this.repository.create(createTaskDTO)
        
        return create
    }

    async findTask(id: string, next: NextFunction) {

        try {

            const find = await this.repository.findOne(id)
    
            if(!find) {
                throw new Error
            }
    
            return find
        } catch (error) {
            next(new AppError('Task Not Found!', 404))
        }
    }

    async findAllTasks(next: NextFunction) {
        try {

            const findAll = await this.repository.findAll()
    
            if(findAll.length === 0) {
                throw new Error
            }
    
            return findAll
        } catch (error) {
            next(new AppError('Tasks Not Found!', 404))
        }
    }

    async updateTask(updateTaskDTO: UpdateTaskDTO, id: string, next: NextFunction) {
        const update = await this.repository.update(updateTaskDTO, id, next)

        return update
    }
    async deleteTask(id: string, next: NextFunction) {
        const deleteTask = await this.repository.remove(id, next)
    }
}