import { timingSafeEqual } from "crypto";

window.addEventListener("load",(e)=>{


    window.v = new Vue({
        el:"#chatApp",
        mounted(){
            this.socket = new io();
            this.socket.on("user_list" , data =>  this.userList = data );
            this.socket.on("login_ok", data => this.isLogin = true );
            this.socket.on("req_msg", data => this.chatList.push(data) );
        },
        data : {
            nickName : "",
            isLogin : false,
            socket : null,
            userList : [],
            textMsg : "",
            chatList : []
        },
        methods : {
            login(){
                if(this.nickName === "") return;
                this.socket.emit("login", this.nickName);
            },

            sendMsg(){
                if(this.textMsg === "") return;
                this.socket.emit("chat_msg" , this.textMsg);
                this.textMsg = "";
            }
        }
    });

});