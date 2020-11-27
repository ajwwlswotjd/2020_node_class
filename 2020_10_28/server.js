const express = require('express');
const http = require('http');
const path = require('path');

const app = new express();
const server = http.createServer(app);
const bodyParser = require('body-parser');
const session = require('session');

app.set( 'views' , path.join(__dirname , 'views') );
app.set('view engine' , 'ejs');

app.use( express.static(path.join(__dirname, 'public')) );

app.get('/',(req,res)=>{
    res.render("main");
});
const PORT = 100;
server.listen(PORT, ()=>{
    console.log(`Server on ${PORT}port`)
});
