import { NextFunction } from 'express'
import { prisma } from '../../../prisma/prisma.service'
import { AppError } from '../../shared/error/AppError'
import { CreateTaskDTO } from '../dto/create-task.dto'
import { UpdateTaskDTO } from '../dto/update-task.dto'

type PrismaType = typeof prisma

export class TaskRepository {
    constructor(private prisma: PrismaType) {}

    async create(createTaskDTO: CreateTaskDTO) {
        return this.prisma.task.create({
            data: {
                ...createTaskDTO
            }
        })
    }

    async findOne(id: string) {
        return this.prisma.task.findUnique({
            where: { id }
        })
    }

    async findAll() {
        return this.prisma.task.findMany()
    }

    async update(updateTaskDTO: UpdateTaskDTO, id: string, next: NextFunction) {
        try {
            const updateTask = await this.prisma.task.update({
                where: { id },
                data:{ ...updateTaskDTO } 
            })

            return updateTask
        }catch (error) {
            next(new AppError('Task Not Found!', 404))
        }
    }

    async remove(id: string, next: NextFunction) {
        return this.prisma.task.delete({
            where: { id }
        })
    }
}