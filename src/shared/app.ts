import 'dotenv/config'
import express, { Request, Response, json } from 'express'
import { TaskController } from '../tasks/taskController'
import { TaskUseCase } from '../tasks/taskUseCase'
import { TaskRepository } from '../tasks/repository/task.repository'
import { prisma } from '../../prisma/prisma.service'

const app = express()

app.use(json())

const prismaRespository = new TaskRepository(prisma)
const tasUseCase = new TaskUseCase(prismaRespository)
const taskController = new TaskController(tasUseCase)

app.post('/tasks', async (req: Request, res: Response) => {
    return taskController.create(req, res)
})

app.get('/tasks/:id', async (req: Request, res: Response) => {
    return taskController.findOne(req, res)
})

app.get('/tasks', async (req: Request, res: Response) => {
    return taskController.findAll(req, res)
})

app.put('/tasks/:id', async (req: Request, res: Response) => {
    return taskController.update(req, res)
})

app.delete('/tasks/:id', async (req: Request, res: Response) => {
    return taskController.remove(req, res)
})

app.get('/', (req: Request, res: Response) => {
    return res.send('Hello Word Gostoso')
})

app.listen(process.env.PORT,() => {
    console.log(`Servidor aberto na porta ${process.env.PORT}`)
})