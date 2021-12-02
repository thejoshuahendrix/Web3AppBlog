import BaseController from "./base.controller";
import { Comment, CommentI } from "../models/comment.model";
import { Request, Response } from 'express'
import { Todo } from "../models/todo.model";


export default class CommentController extends BaseController {

    constructor() {
        super(Comment)
    }

    post = async (req: Request, res: Response) => {
        try {
            const data = req.body
            const { todoId } = data
            if (!todoId) {
                res.status(400).send(`Error todo id is required`)
            }
            const comment: CommentI = data
            const c: CommentI = {
                title: comment.title,
                description: comment.description,
                todoId: todoId
            }
            const dbData = await Comment.create(c)
            const commentId = dbData._id
            const newTodo = await Todo.updateOne({ _id: todoId }, { $push: { comments: [commentId] } })
            const out = {
                newTodo,
                dbData
            }
            res.send(out);
        } catch (error: any) {
            console.log(error.message)
            res.status(400).send(`Error in POST ${this.modelName}`)
        }
    }

    delete = async (req: Request, res: Response) => {
        try{
            const { id } = req.params;
            const dbData = await Comment.deleteOne({_id: id});
            res.send(dbData);

        } catch (error){
            res.status(400).send(`Error in DELETE ${Comment.modelName}`);
        }
    }

}