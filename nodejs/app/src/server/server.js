import path from "path";
import dotenv from 'dotenv';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.POST || 8888;
const api = require('../routes/index');
const apiBook = require('../routes/booksRouter');
const apiBoard = require('../routes/boardRouter');
const cors = require('cors');

if (process.env.NODE_ENV === 'prod') {
	dotenv.config({ path: path.join("env", ".env.prod") })
} else if (process.env.NODE_ENV === 'dev') {
	dotenv.config({ path: path.join("env", ".env.dev") })
} else {
	throw new Error("process.env.NODE_ENV를 설정하지 않았습니다.")
}

app.use(cors());
app.use(bodyParser.json());
app.use('/api', api);
app.use('/book', apiBook);
app.use('/board', apiBoard);
//app.use('/api', (req, res) => res.json({username:'bryan'}));

app.listen(port, () => {
    console.log(`express is running on ${port}`);
})
