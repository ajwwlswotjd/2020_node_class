const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server);

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.get("/",(req,res)=>{
    res.render("main");
});

io.on('connection', socket =>{
    console.log("유저 연결");

    socket.on("SEND_MSG", data =>{
        console.log(data);
        io.emit('SERVER_MSG' , data);
    });

});







const SERVER_PORT = 54000;
server.listen(SERVER_PORT, ()=>{
    console.log(`server listen on ${SERVER_PORT} port`);
});