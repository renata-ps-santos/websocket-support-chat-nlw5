import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';

import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import appRoutes from './routes';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname,'..','..','..','..','public')));
app.set('views', path.join(__dirname,'..','..','..','..','public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/pages/client', (req, res)=>{
  return res.render('html/client.html');
});

app.get('/pages/admin', (req, res)=>{
  return res.render('html/admin.html');
});

const http = createServer(app);

const io = new Server(http);

io.on('connection', (socket: Socket)=>{
  // console.log('Se conectou', socket.id);
});

app.use(cors());

app.use(express.json());

app.use(appRoutes);

const port = process.env.PORT || 3333;

export { http, io, port }
