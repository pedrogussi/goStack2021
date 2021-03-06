import 'reflect-metadata';
import express, {Request, Response, NextFunction} from 'express';

import cors from 'cors';
import 'express-async-errors'
import routes from './routes';
import uploadConfig from '@config/upload';
import AppError from '@shered/errors/AppError'


import '@shered/infra/typeorm';
import '@shered/container';


const app = express();

app.use(cors())
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory))
app.use(routes);
app.use((err:Error, request:Request, response:Response, next:NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }
    console.log(err)

    return response.status(500).json({
        status: 'error',
        message: err.message,
    })
})



app.listen(3333, () => {
    console.log('Server starte on port 3333')
})