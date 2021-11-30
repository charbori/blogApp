import express from 'express';
import { logger } from '../config/winston';
import bodyParser from 'body-parser';
import Dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

app.use(cookieParser);