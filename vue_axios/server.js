const express = require('express');
const http = require('http');
const path = require('path');
const { pool } = require('./DB/DB');
const { ss } = require('./DB/credential');

const app = new express();
const server = http.createServer(app);
const bodyParser = require('body-parser');
const session = require('express-session');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use( express.static( path.join(__dirname, 'public') ) );

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(session({
    resave : false,
    saveUninitialized : true,
    secret : ss
}));


app.get('/', (req, res)=>{
    res.render('main');
});

app.post("/api/login" , async ( req , res ) => {
    const { email , password } = req.body;
    let result = await pool.query( "SELECT * FROM `axios_users` WHERE `email` = ? AND `password` = PASSWORD(?)" ,[ email , password ]);
    if( result[0].length === 0 ){
        res.json({
            success : false,
            msg : "로그인 실패, 아이디와 비밀번호 확인"
        });
    } else {
        //  바로 로그인 처리 ㄱ
        res.json({
            success : true,
            msg : "로그인 성공"
        });
    }
});

app.post("/api/register", async (req,res)=>{

    let { email , name , password , password_check } = req.body;
    let result = await pool.query("SELECT * FROM `axios_users` WHERE `email` = ?" , [ email ]);
    if( result[0].length === 1 ){
        res.json({
            msg : "중복된 회원이 있습니다.",
            success : false
        });
        return;
    }

    await pool.query( 'INSERT INTO `axios_users`(`idx`, `name`, `password`, `email`, `level`) VALUES (null,?,PASSWORD(?),?,?)' , [ name , password , email , 1 ] );
    res.json({
        msg : "회원가입 완료",
        success : true
    });
});

app.get('/test', async (req, res)=>{
    let r = await pool.query("SELECT * FROM dummy");
    res.json(r[0]);
});

app.post('/data', async (req, res)=>{
    //req.body.title
});

server.listen(54000, ()=>{
    console.log("서버가 54000포트에서 구동중입니다.");
});