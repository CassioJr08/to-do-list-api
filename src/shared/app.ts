import 'dotenv/config'
import express, { NextFunction, Request, Response, json } from 'express'
import { TaskController } from '../tasks/taskController'
import { TaskUseCase } from '../tasks/taskUseCase'
import { TaskRepository } from '../tasks/repository/task.repository'
import { prisma } from '../../prisma/prisma.service'
import { errorMiddleware } from './middlewares/middleware-error'

const app = express()

app.use(json())

const prismaRespository = new TaskRepository(prisma)
const tasUseCase = new TaskUseCase(prismaRespository)
const taskController = new TaskController(tasUseCase)

app.post('/tasks', async (req: Request, res: Response) => {
    return taskController.create(req, res)
})

app.get('/tasks/:id', async (req: Request, res: Response, next: NextFunction) => {
    return taskController.findOne(req, res, next)
})

app.get('/tasks', async (req: Request, res: Response, next: NextFunction) => {
    return taskController.findAll(req, res, next)
})

app.put('/tasks/:id', async (req: Request, res: Response, next: NextFunction) => {
    return taskController.update(req, res, next)
})

app.delete('/tasks/:id', async (req: Request, res: Response, next: NextFunction) => {
    return taskController.remove(req, res, next)
})

app.get('/', (req: Request, res: Response) => {
    return res.send('Hello Word Gostoso')
})

app.use(errorMiddleware)

app.listen(process.env.PORT,() => {
    console.log(`Servidor aberto na porta ${process.env.PORT}`)
})
