import { Request, Response } from 'express';
import * as mongoose from 'mongoose';

export default class BaseController{

    model: mongoose.Model<any, any>;
    modelName: string;

    constructor(model: mongoose.Model<any, any>){
        this.model = model;
        this.modelName = model.modelName;
    };
    
    post = async (req: Request, res: Response) => {
        try { 
            const data = req.body;
            const dbData = await this.model.create(data);
            res.send(dbData);
        } catch (error) {
            console.log(error);
            res.status(400).send(`Error in POST ${this.modelName}`);
        }
    };

    get = async (req: Request, res: Response) => {
        try {
            const dbData = await this.model.find().populate("comments");
            res.send(dbData);
        } catch (error) {
            res.status(400).send(`Error in GET ${this.modelName}`);
        }
    };

    getById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            
            const dbData = await this.model.find({_id: id});
            res.send(dbData);
        } catch (error: any) {
            res.status(400).send(`Error in GET ${this.modelName}`);
        }
    };

    delete = async (req: Request, res: Response) => {
        try{
            const { id } = req.params;
            const dbData = await this.model.deleteOne({_id: id});
            res.send(dbData);

        } catch (error){
            res.status(400).send(`Error in DELETE ${this.modelName}`);
        }
    }

};