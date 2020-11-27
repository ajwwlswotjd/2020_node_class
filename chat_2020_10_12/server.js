const log = console.log;

const express = require("express");
const http = require("http"); // 노드의 기본 모듈이다
const path = require("path");
const socket = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//정적 폴더를 public 폴더로 지정한다.
app.use(express.static(path.join(__dirname, 'public')));

//request 를 받아서 처리후 response 를 보낸다.
app.get("/", (req, res) => {
    res.render('main');
});


let user_list = []; //로그인한 유저들을 저장하는 배열
io.on("connect", socket => {
    let user = '';
    log('유저 접속');
    socket.on("login", data => {
        user_list.push({ id: socket.id, nickname: data });
        user = { id: socket.id, nickname: data };
        socket.emit("login_ok", { id: socket.id, nickname: data });
        io.emit("user_list", [user_list , false]);
    });

    socket.on("disconnect", (data) => {
        let idx = user_list.findIndex(x => x.id === socket.id);
        if (idx < 0) return;
        let user = user_list.splice(idx, 1);
        io.emit("user_list", [user_list , user[0].nickname]);
        log(user[0].nickname + "이 접속을 종료했습니다.");
    });

    socket.on("chat_msg", data => {
        io.emit("req_msg", { user: user, msg: data });
    });
});

server.listen("54000", () => {
    log("서버 실행중");
});


