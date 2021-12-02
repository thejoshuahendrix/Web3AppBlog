import { Router } from 'express'
import CommentController from '../controllers/comment.controller'
const commentRouter = Router()

const todoCtrl = new CommentController()

commentRouter.get("/", todoCtrl.get)
commentRouter.get("/:id", todoCtrl.getById)
commentRouter.post("/", todoCtrl.post)
commentRouter.delete("/:id", todoCtrl.delete)

export default commentRouter