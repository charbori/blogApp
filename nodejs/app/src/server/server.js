const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.POST || 8888;
import "../../env/env.js";

const api = require('../routes/index');
const apiBoard = require('../routes/boardRouter');
const apiLogs = require('../routes/logsRouter');
const apiMenu = require('../routes/menu');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use('/api', api);
app.use('/api/board', apiBoard);
app.use('/api/logs', apiLogs);
app.use('/api/category', apiMenu);

app.listen(port, () => {
    console.log(`express is running on ${port}`);
})
