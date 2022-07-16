import express from "express";
import {
  api_client,
  PORT
} from "./config.js";
import userRouter from "./routes/userRouter.js";
import cookieParser from 'cookie-parser';
import errorMiddleWare from './middleWare/errorMiddleWare.js'
import cors from 'cors'
import http from 'http';
import {
  Server
} from "socket.io";
import fileUpload from 'express-fileupload'
import * as path from 'path'
import {
  dirname
} from 'path';
import {
  fileURLToPath
} from 'url';
import messageRouter from "./routes/messageRouter.js";
import advertismentRouter from "./routes/advertismentRouter.js";
import basketRouter from "./routes/basketRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
//import allRouter from "./routes/allRouter.js";
const __dirname = dirname(fileURLToPath(
  import.meta.url));
const app = express();
app.use(fileUpload({}))
const AppServer = http.createServer(app)
const io = new Server(AppServer);

io.on('connection', function (socket) {
  socket.on('joinToChatRoom', function (room) {
    console.log('Подкл')
    socket.join(room);
  })
  console.log(socket.rooms)
  socket.on('disconnect', function () {});
  socket.on('message', function (data) {
    switch (data.event) {
      case 'message':
        console.log(data.chatroom_id)
        console.log('NIGGA')
        //      socket.broadcast.to(data.chatroom_id).emit('new-message',data)
        io.to(data.chatroom_id).emit('new-message', data);
    }
  });
});

function broadcastOther(socket, message, room) {
  return socket.to(room).emit('new-message', message)
}

app.use(cors({
  credentials: true,
  origin: api_client,
}));
app.use('/avatars', express.static(`${__dirname}/stor/avatars`))
app.use('/adverts', express.static(`${__dirname}/stor/adverts`))
app.use('/categoryAvatars', express.static(`${__dirname}/stor/categoryAvatars`))
///avatars/13/premium-icon-plus-3285480.png

app.use(express.json())
app.use(cookieParser());
app.use('/', userRouter)
app.use('/', advertismentRouter)
app.use('/', messageRouter)
app.use('/', basketRouter)
app.use('/', categoryRouter)
//app.use('/', allRouter)
app.use(errorMiddleWare)

function serverUp() {
  try {
    AppServer.listen(PORT, console.log(`"Сервер запущен на порту ${PORT} http://localhost:1500`))
  } catch (e) {
    console.log(e.message)
  }
}
serverUp();