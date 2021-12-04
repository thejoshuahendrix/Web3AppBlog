import styled from "styled-components"


const BlogWrapper = styled.div`
    color: ${({theme}) => theme.heading};
    padding: 20px;
`


const ControllerBlog = () => {


    return (
        <BlogWrapper>
            <h2>Welcome to my blog post about controllers, what you see below is code for a base controller class. </h2>

            <h4> The benefit of using a base controller class is a lot of the operations we will do with our backend models will be the same.</h4>

            <p>You only need to call super in other controllers and place the model name in the constructor.
                Then if you have any requests with differences from this code you can customize the controller accordingly.
                But for the most part you will be able to use this code for most simple CRUD operations.

            </p>
            
            <code>
            
                //controllers/base.controller.ts<br />
                import &#123; Request, Response &#125; from 'express';<br />
                import * as mongoose from 'mongoose';<br />
                <br />
                export default class BaseController&#123;<br />
                <br />
                model: mongoose.Model&lt;any, any&gt;;<br />
                modelName: string;<br />
                <br />
                constructor(model: mongoose.Model&lt;any, any&gt;)&#123;<br />
                &emsp;    this.model = model;<br />
                &emsp;    this.modelName = model.modelName;<br />
                &#125;;<br />
                <br />
                post = async (req: Request, res: Response) =&gt; &#123;<br />
                &emsp;    try &#123;<br />
                    &emsp;&emsp;        const data = req.body;<br />
                        &emsp;&emsp;        const dbData = await this.model.create(data);<br />
                        &emsp;&emsp;        res.send(dbData);<br />
                        &emsp;    &#125; catch (error) &#123;<br />
                    &emsp;&emsp;       console.log(error);<br />
                        &emsp;&emsp;       res.status(400).send(`Error in POST $&#123;this.modelName&#125;`);<br />
                        &emsp;    &#125;<br />
                &#125;;<br />
                <br />
                get = async (req: Request, res: Response) =&gt; &#123;<br />
                &emsp;   try &#123;<br />
                    &emsp;&emsp;   const dbData = await this.model.find().populate("comments");<br />
                    &emsp;&emsp;   res.send(dbData);<br />
                    &emsp;    &#125; catch (error) &#123;<br />
                    &emsp;&emsp;    res.status(400).send(`Error in GET $&#123;this.modelName&#125;`);<br />
                        &emsp;    &#125;<br />
                &#125;;<br />
                <br />
                getById = async (req: Request, res: Response) =&gt; &#123;<br />
                &emsp; try &#123;<br />
                    &emsp;&emsp;  const &#123; id &#125; = req.params;<br />
                <br />
                &emsp;&emsp;     const dbData = await this.model.find(&#123;_id: id&#125;);<br />
                        &emsp;&emsp;     res.send(dbData);<br />
                        &emsp; &#125; catch (error: any) &#123;<br />
                    &emsp;&emsp;     res.status(400).send(`Error in GET $&#123;this.modelName&#125;`);<br />
                        &emsp;  &#125;<br />
                &#125;;<br />
                <br />
                delete = async (req: Request, res: Response) =&gt; &#123;<br />
                &emsp;  try&#123;<br />
                    &emsp;&emsp;     const &#123; id &#125; = req.params;<br />
                        &emsp;&emsp;    const dbData = await this.model.deleteOne(&#123;_id: id&#125;);<br />
                        &emsp;&emsp;     res.send(dbData);<br />
                <br />
                &emsp; &#125; catch (error)&#123;<br />
                &emsp;&emsp;   res.status(400).send(`Error in DELETE $&#123;this.modelName&#125;`);<br />
                        &emsp;&emsp;   &#125;<br />
                        &emsp; &#125;<br />
                <br />
                &#125;;<br />
                
            </code><br /><br />
            Notice how we have the basic operations, POST, DELETE, GET, and GET-By ID. You will find that almost all APIs have these basic routes.
            <br />
            Like I state before, all you need to do is create a todo.controller file then extend the BaseController class.
            Here is an example.
            <code><br /><br />
                //controllers/todo.controller.ts<br />
                import BaseController from './base.controller'<br />
                import &#123; Todo &#125; from '../models/todo.model'<br />
                <br />
                export default class TodoController extends BaseController  &#123;<br />
                <br />
                &emsp;constructor() &#123;<br />
                &emsp;&emsp;super(Todo)<br />
                &emsp;&#125;<br />
                <br />
                &#125;<br />
            </code><br />
            <br />

            Next we will show a basic schema that would work with this code.<br />
            Then we will define the routes and viola we have a basic API.<br />
            <br />
            <code>
                //models/todo.model.ts<br />
                import * as mongoose from "mongoose";<br />
                <br />
                export interface TodoI &#123;<br />
                &emsp;title: string;<br />
                &emsp;description?: string;<br />
                &emsp;done: boolean<br />
                &#125;<br />
                <br />
                const TodoSchema = new mongoose.Schema(&#123;<br />
                    &emsp;&emsp;title: &#123;<br />
                    &emsp;&emsp;type: String<br />
                    &emsp;&#125;,<br />
                    &emsp;&emsp;description: &#123;<br />
                    &emsp;&emsp;type: String,<br />
                    &emsp;&#125;,<br />
                    &emsp;&emsp;done: &#123;<br />
                    &emsp;&emsp;&emsp;type: Boolean,<br />
                    &emsp;&emsp;&emsp;default: false<br />
                    &emsp;&#125;,<br />
                    &emsp;&emsp;timestamps: true<br />
                &#125;);<br />
                <br />
                export const Todo = mongoose.model("todos", TodoSchema);<br />
            </code>
            Here we have a basic model of a Todo you would use in a Todo List!<br />
            Notice we just define the interface, define the schema and export it.<br />
            Its that easy to create Mongoose schemas.<br />
            <br />
            <br />
            Now we will define our router!<br />
            <br />
            <br />
            <code>
                //routes/todo.ts<br />
                import &#123; Router &#125; from 'express'<br />
                import TodoController from '../controllers/todo.controller'<br />
                const todoRouter = Router()<br />
                <br />
                const todoCtrl = new TodoController()<br />
                <br />
                todoRouter.get("/", todoCtrl.get)<br />
                todoRouter.get("/:id", todoCtrl.getById)<br />
                todoRouter.post("/", todoCtrl.post)<br />
                todoRouter.delete("/:id", todoCtrl.delete)<br />
                <br />
                export default todoRouter<br />
            </code>
            <br />
            Here is a basic router for our todo, we can now import it into an index.ts file in the same directory so we can add it to our main router.
            <br /><br />

            <code>
                /routes/index.ts<br />
                import &#123; Router &#125; from 'express'<br />
                import todoRouter from './todo'<br />
                <br />
                <br />
                const router = Router();<br />
                <br />
                router.use("/todos", todoRouter);<br />
                <br />
                <br />
                export default router;<br />
            </code>
            <br />
            We utilize this file as a proxy to keep our server code clean!<br />
            Now all we have to do is bring in our router to our old server.ts file from the first blog post.<br />
            <br />
            It should look like this<br />
            <code><br />
                //server.ts<br />
                import express, &#123; Express, Request, Response &#125; from 'express';<br />
                import mongoose from 'mongoose';<br />
                import dotenv from 'dotenv';<br />
                import helmet from 'helmet';<br />
                import router from './routes/index';<br />
                import cors from 'cors';<br />
                <br />
                dotenv.config();<br />
                const PORT = process.env.PORT || 5000;<br />
                <br />
                <br />
                const app: Express = express();<br />
                app.use(helmet());<br />
                app.use(cors());<br />
                app.use(express.json())<br />
                app.use("/api", router);<br />
                <br />
                app.get('/', (req: Request, res: Response) =&gt; &#123;<br />
                &emsp;res.send('Well done!');<br />
                &#125;)<br />
                <br />
                app.listen(PORT, () =&gt; &#123;<br />
                &emsp;console.log(`Listening on http://localhost:$&#123;PORT&#125;`)<br />
                &emsp;mongoose.connect(process.env.MONGO_URI || "").then(() =&gt; &#123;<br />
                &emsp;console.log("Connected to the database")<br />
                &emsp;&#125;).catch((e: any) =&gt; &#123;<br />
                &emsp;&emsp;console.log("Error connecting to the DB")<br />
                &emsp;&emsp;console.log(e.message)<br />
                &emsp;&#125;);<br />
                &#125;);<br />

                <br /><br />
                And thats it you now have an extendable API to work with on the back end, feel free to run and test it with Postman or you favorite HTTP client.<br />
                <br />
                <br />
            </code>
        </BlogWrapper>
    )
}

export default ControllerBlog
