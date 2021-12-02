import BaseController from './base.controller'
import { Todo } from '../models/todo.model'
import { Comment, CommentI } from "../models/comment.model";
import { Request, Response } from 'express';

export default class TodoController extends BaseController {

    constructor() {
        super(Todo)
    }

    delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const todo = await this.model.findById({ _id: id })
            const deletedComments = await Comment.deleteMany({ todoId: id })
            const dbData = await this.model.deleteOne({ _id: id });
            res.send(dbData);

        } catch (error) {
            res.status(400).send(`Error in DELETE ${this.modelName}`);
        }
    }
}