import styled from "styled-components"

const BlogWrapper = styled.div`
    padding: 100px;

    @media (max-width:${({theme})=> theme.mobile}){
        padding: 5px;
    }
`
const Blog = () => {

    return (
        <BlogWrapper>
            <h2> In the field of technology, what has really helped me is guidance from other developers through the use of blog posts. So today I am starting my journey of technical writing and working on putting out blog content for my websites. My first post will be about setting up a basic server for express in Typescript.</h2>
            <br />
            To begin we will use NPM or Yarn depending on your preference.
            <br />
            First we will create a folder for our desktop
            Open your terminal of choice or use your favorite method to create a folder.
            In your terminal:
            <br /><br />


            <code>mkdir folder-name</code>

            <code>cd folder-name</code>



            Next we will initialize our package.json using our selected package manager:
            <br /><br /><br />


            <code>npm init -y</code>
            <br />
            Or
            <br />
            <code>yarn init -y</code>
            <br /><br />


            This will create our package.json with the default settings, you can omit the -y and go through each setting individually through the terminal.

            Next in  order to use Typescript we will initialize our tsconfig.json

            <br /><br />

            <code>tsc init</code>

            <br /><br />

            This will create our tsconfig.json and give it some default properties as well as commented out properties that we can choose to use.

            Next we will create an index file for our Express server.
            <br /><br />


            <code>echo //Server &gt;index.ts</code>

            <br /><br />

            Once we have created our server file we will go ahead and add some dependencies that we will need.

            <br /><br />

            <code>npm install cors dotenv express helmet mongoose</code>
            <br />
            Or
            <br />
            <code>yarn add cors dotenv express helmet mongoose</code>


            <br /><br />
            After we install the dependencies we will install the dev dependencies.

            <br /><br />

            <code>npm install -D @types/cors @types/express @types/mongoose @types/node ts-node ts-node-dev typescript</code>
            <br />
            Or
            <br />
            <code>yarn add-D @types/cors @types/express @types/mongoose @types/node ts-node ts-node-dev typescript</code>

            <br /><br />

            Once our dependencies are installed we should set up our environment variables and set up a mongodb atlas account. If you are more familiar with mongoose you can setup a local server. But just follow the tutorial here to setup MongoDB Atlas.
            Lets setup our environment variables by creating a .env file inside our project directory.
            <br />
            <br />

            <code>echo MONGO_URI= &gt;.env</code>
            <br />
            <br />

            Open your .env file and add your URI you got from the mongoDB atlas setup.
            You can use quotes or not it doesn’t matter
            You can also choose to add your port here by adding PORT=port-number-here inside your .env file


            <br /><br /><br />






            Now we are ready to code our basic server. Inside our index.ts type:
            <br /><br />

            <code>
//Server
                import express, &#123; Express, Request, Response 	&#125; from 'express';<br />
                import mongoose from 'mongoose';<br />
                import dotenv from 'dotenv';<br />
                import helmet from 'helmet';<br />
                import cors from 'cors';<br />
                <br />
                dotenv.config();<br />
                const PORT = process.env.PORT || 5000;<br />
                <br />
                const app: Express = express();<br />
                app.use(helmet());<br />
                app.use(cors());<br />
                app.use(express.json())<br />
                <br />
                app.get('/', (req: Request, res: Response) =&gt; &#123;<br />
                res.send('Well done!');<br />
                &#125;)<br />
                <br />
                app.listen(PORT, () =&gt; &#123;<br />
                console.log('Listening on http://localhost:'+PORT)<br />
                mongoose.connect(process.env.MONGO_URI || '').then(() =&gt; &#123;<br />
                console.log('Connected to the database')<br />
                &#125;).catch((e: any) =&gt; &#123;<br />
                console.log('Error connecting to the DB')<br />
                console.log(e.message)<br />
                &#125;);<br />
                &#125;);
            </code>
            <br /><br />


            Viola! You have created your basic express server with Typescript that you can now connect to and create routes for! I will be going on in another tutorial to teach you mongoose schemas, routes and controllers.
        </BlogWrapper>
    )
}

export default Blog
