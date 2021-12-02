
import { Router } from 'express'
import TodoController from '../controllers/todo.controller'
const todoRouter = Router()

const todoCtrl = new TodoController()

todoRouter.get("/", todoCtrl.get)
todoRouter.get("/:id", todoCtrl.getById)
todoRouter.post("/", todoCtrl.post)
todoRouter.delete("/:id", todoCtrl.delete)

export default todoRouter