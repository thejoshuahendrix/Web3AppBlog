import {Router} from 'express'
import todoRouter from './todo'
import commentRouter from './comment'

const router = Router()

router.use("/todos", todoRouter)
router.use("/comments", commentRouter)

export default router;