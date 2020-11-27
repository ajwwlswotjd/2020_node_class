const express = require('express');
const http = require('http');
const path = require('path');
const socket = require("socket.io");
// 찾는 순서
// 1. program files의 노드 설치 폴더를 뒤진다.
// 2. 없으면 현재 실행되는 파일이 있는 경로의 node_modules 뒤진다.
// 3. 현재 폴더를 뒤진다.

const app = express();
const server = http.createServer(app);
const io = socket(server);
const SERVER_PORT = 37645;

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use( express.static(path.join(__dirname , "public")) );

app.get("/" , (req , res)=>{
    res.render("main");
});

server.listen(SERVER_PORT,()=>{
   console.log(`Server is listen on ${SERVER_PORT} port`);
});

let userList = [];

io.on("connect", socket => {
    console.log(socket.id + "연결");

    socket.on("login", data => {
        let user = { id : socket.id , nickname : data };
        userList.push( user );
        socket.emit("login-ok", { id: socket.id , nickname : data } );
        io.emit( 'user-list' , { userList : userList , user : user , enter : true } );
    });

    socket.on("disconnect", ()=>{
        let idx = userList.findIndex( x => x.id === socket.id );
        if(idx < 0) return;
        let user = userList[idx];
        userList.splice(idx , 1);
        io.emit( 'user-list' , { userList : userList , user : user , enter : false } );
        console.log(user.nickname + "이 접속을 종료하였습니다. ");
    });

    socket.on("chat msg", data => {
        let sendUser = userList.find(x => x.id === socket.id);
        io.emit("awesome", { user:sendUser, msg:data });
    });

});