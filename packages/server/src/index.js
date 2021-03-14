import express from "express";
import cors from 'cors';
import helmet from 'helmet';
import logger from './tools/logger';
import dbInit from './db/dbInit';
import config from './config/env';
import {auth,candidates} from './routes';



export const app = express();
app.use(express.json());


//express safety middleware
app.use(cors({exposedHeaders: 'auth-token'}));
app.use(helmet());

//DB connection
export const db = dbInit();

//routes
 auth();
 candidates();


const port = config.PORT || 5000;
app.listen(port, ()=>{
    logger.info(`Server is on localhost:${port}`);
});




