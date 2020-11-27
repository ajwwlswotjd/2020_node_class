// 모듈을 지원
// require 이게 모듈을 가져오는 명령어
// require 안에 들어갈 때 그냥 패키지 이름만 (http)
// => 노드의 기본 패키지에서 찾아
// 없다면 node_modules
// 안에 들어가는게 ./http 이런식으로 되어 있으면
// 현재 실행되는 파일과 같은 폴더에 있는지 찾아

const express = require('express');
const http = require('http');
const path = require('path');

// 익스프레스 앱을 만들어준다.
const app = express();
app.set('views', path.join(__dirname, "views"));
app.set('view engine' , 'ejs');
const server = http.createServer( app );

app.get('/main' , ( req , res )=>{

    res.render('main' , {'msg' : "Hello node express"});
     
});

server.listen(52000 , ()=>{ console.log("Server is listening on port 52000") } );