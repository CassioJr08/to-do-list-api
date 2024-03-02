import { TaskRepository } from '../tasks/repository/task.repository'
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

export class TaskUseCase {
    constructor(private readonly repository: TaskRepository){}

    async createTask(createTaskDTO: CreateTaskDTO) {
        const create = await this.repository.create(createTaskDTO)
        
        return create
    }

    async findTask(id: string) {
        const find = await this.repository.findOne(id)

        if(!find) {
            console.log('Task nao encontrada')
        }

        return find
    }

    async findAllTasks() {
        const findAll = await this.repository.findAll()

        if(!findAll) {
            console.log('Tasks nao encontradas')
        }

        return findAll
    }

    async updateTask(updateTaskDTO: UpdateTaskDTO, id: string) {
        const update = await this.repository.update(updateTaskDTO, id)

        return update
    }
    async deleteTask(id: string) {
        const deleteTask = await this.repository.remove(id)
        
    }
}