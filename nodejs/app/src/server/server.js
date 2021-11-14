import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import Dotenv from 'dotenv';
import '../env/env.js';
import 'regenerator-runtime'
const port = process.env.POST || 8888;

import api from '../routes/index';
import apiBoard from '../routes/boardRouter';
import apiLogs from '../routes/logsRouter';
import apiMenu from '../routes/menu';
import cors from 'cors';
import login from '../routes/login'

app.use(cors());
app.use(bodyParser.json());
app.use('/api', api);
app.use('/api/board', apiBoard);
app.use('/api/logs', apiLogs);
app.use('/api/category', apiMenu);
app.use('/api/auth', login);

app.listen(port, () => {
    console.log(`express is running on ${port}`);
});