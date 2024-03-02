import { prisma } from '../../../prisma/prisma.service'
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

    async update(updateTaskDTO: UpdateTaskDTO, id: string) {
        return this.prisma.task.update({
            where: { id },
            data: {
                ...updateTaskDTO
            }
        })
    }

    async remove(id: string) {
        return this.prisma.task.delete({
            where: { id }
        })
    }
}