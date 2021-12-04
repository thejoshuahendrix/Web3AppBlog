### Welcome to my blog post about controllers, what you see below is code for a base controller class.
The benefit of using a base controller class is a lot of the operations we will do with our backend models will be the same.
You only need to call super in other controllers and place the model name in the constructor. Then if you have any requests with differences from this code you can customize the controller accordingly. But for the most part you will be able to use this code for most simple CRUD operations.


```
//controllers/base.controller.ts
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
```


Notice how we have the basic operations, POST, DELETE, GET, and GET-By ID. You will find that almost all APIs have these basic routes.
Like I state before, all you need to do is create a todo.controller file then extend the BaseController class. Here is an example.

```
//controllers/todo.controller.ts
import BaseController from './base.controller'
import { Todo } from '../models/todo.model'

export default class TodoController extends BaseController {

 constructor() {
  super(Todo)
 }

}
```


Next we will show a basic schema that would work with this code.
Then we will define the routes and viola we have a basic API.
```
//models/todo.model.ts
import * as mongoose from "mongoose";

export interface TodoI {
 title: string;
 description?: string;
 done: boolean
}

const TodoSchema = new mongoose.Schema({
  title: {
  type: String
 },
  description: {
  type: String,
 },
  done: {
   type: Boolean,
   default: false
 },
  timestamps: true
});
```
export const Todo = mongoose.model("todos", TodoSchema);
Here we have a basic model of a Todo you would use in a Todo List!
Notice we just define the interface, define the schema and export it.
Its that easy to create Mongoose schemas.


Now we will define our router!

```
//routes/todo.ts
import { Router } from 'express'
import TodoController from '../controllers/todo.controller'
const todoRouter = Router()

const todoCtrl = new TodoController()

todoRouter.get("/", todoCtrl.get)
todoRouter.get("/:id", todoCtrl.getById)
todoRouter.post("/", todoCtrl.post)
todoRouter.delete("/:id", todoCtrl.delete)

export default todoRouter
```
Here is a basic router for our todo, we can now import it into an index.ts file in the same directory so we can add it to our main router.
```
/routes/index.ts
import { Router } from 'express'
import todoRouter from './todo'


const router = Router();

router.use("/todos", todoRouter);


export default router;
```
We utilize this file as a proxy to keep our server code clean!
Now all we have to do is bring in our router to our old server.ts file from the first blog post.

It should look like this

```
//server.ts
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import router from './routes/index';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 5000;


const app: Express = express();
app.use(helmet());
app.use(cors());
app.use(express.json())
app.use("/api", router);

app.get('/', (req: Request, res: Response) => {
 res.send('Well done!');
})

app.listen(PORT, () => {
 console.log(`Listening on http://localhost:${PORT}`)
 mongoose.connect(process.env.MONGO_URI || "").then(() => {
 console.log("Connected to the database")
 }).catch((e: any) => {
  console.log("Error connecting to the DB")
  console.log(e.message)
 });
});
```

And thats it you now have an extendable API to work with on the back end, feel free to run and test it with Postman or you favorite HTTP client.