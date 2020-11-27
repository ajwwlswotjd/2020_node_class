window.addEventListener("load",(e)=>{


    window.v = new Vue({
        el:"#chatApp",
        mounted(){
            this.socket = new io();
        },
        data : {
            nickName : "",
            isLogin : false,
            socket : null
        },
        methods : {
            login(){
                if(this.nickName === "") return;
                this.socket.emit("login", this.nickName);
                this.isLogin = true;
            },

            loginOk(){
                
            },

            userList(){

            }
        }
    });

});