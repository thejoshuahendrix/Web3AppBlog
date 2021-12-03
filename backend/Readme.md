### In the field of technology, what has really helped me is guidance from other developers through the use of blog posts. So today I am starting my journey of technical writing and working on putting out blog content for my websites. My first post will be about setting up a basic server for express in Typescript.

To begin we will use NPM or Yarn depending on your preference.

First we will create a folder for our desktop
Open your terminal of choice or use your favorite method to create a folder.
In your terminal:

`mkdir <folder-name>`

`cd <folder-name>`

Next we will initialize our package.json using our selected package manager:

`npm init -y` 

Or 

`yarn init -y`

This will create our package.json with the default settings, you can omit the -y and go through each setting individually through the terminal.

Next in  order to use Typescript we will initialize our tsconfig.json 

`tsc init`

This will create our tsconfig.json and give it some default properties as well as commented out properties that we can choose to use.

Next we will create an index file for our Express server.

`echo //Server >index.ts`

Once we have created our server file we will go ahead and add some dependencies that we will need.

`npm install chalk cors dotenv express helmet mongoose`

Or 

`yarn add chalk cors dotenv express helmet mongoose`

After we install the dependencies we will install the dev dependencies.

`npm install -D @types/cors @types/express @types/mongoose @types/node ts-node ts-node-dev typescript`

Or 

`yarn add-D @types/cors @types/express @types/mongoose @types/node ts-node ts-node-dev typescript`

Once our dependencies are installed we should set up our environment variables and set up a mongodb atlas account. If you are more familiar with mongoose you can setup a local server. But just follow the tutorial here to setup MongoDB Atlas.
Lets setup our environment variables by creating a .env file inside our project directory.

`echo MONGO_URI= >.env`

Open your .env file and add your URI you got from the mongoDB atlas setup.
You can use quotes or not it doesn’t matter
You can also choose to add your port here by adding PORT=<port-number-here> inside your .env file









Now we are ready to code our basic server.
```
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app: Express = express();
app.use(helmet());
app.use(cors());
app.use(express.json())

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

Viola! You have created your basic express server with Typescript that you can now connect to and create routes for! I will be going on in another tutorial to teach you mongoose schemas, routes and controllers. 
