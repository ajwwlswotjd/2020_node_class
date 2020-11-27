window.log = console.log;

window.addEventListener("load", () => {
    window.app = new App();
});

class App {
    constructor() {

        this.socket = new io();
        this.popup = document.querySelector("#popup");
        this.nickname_input = document.querySelector('#nickname');
        this.userList = document.querySelector("#userList");
        this.msgBox = document.querySelector("#msgBox");
        this.msg_input = document.querySelector('#msg');
        this.send_btn = document.querySelector("#btnSend");
        this.login_btn = document.querySelector("#btnLogin");

        this.init();
    }

    init() {
        this.render();
        this.addEvent();
    }

    render() {

    }

    addEvent() {
        this.login_btn.addEventListener("click", this.loginBtnClickEventHandler);
        this.send_btn.addEventListener("click", this.sendBtnClickEventGHandler);
        this.msg_input.addEventListener("keydown", this.msgKeydownEventHandler);
        this.nickname_input.addEventListener("keydown", this.nickKeydownEventHandler);

        this.socket.on("login-ok", this.socket_loginOkEventHandler);
        this.socket.on("user-list", this.socket_userListEventHandler);
        this.socket.on("awesome", this.socket_awesomeEventHandler);
    }

    nickKeydownEventHandler = e => {
        if (e.keyCode === 13) this.login_btn.click();
    }

    msgKeydownEventHandler = e => {
        if (e.keyCode === 13) this.send_btn.click();
    }

    socket_awesomeEventHandler = data => {

        if (data.user.id === this.socket.id) this.msgShow_me(data.msg);
        else this.msgShow_other( data );
        this.msgScrollDown();

    }

    msgShow_other( { user , msg } ) {
        
        let div = document.createElement("div");
        div.classList.add("msg");
        div.innerHTML = 
        `
        <div class="msg_inner">
            <div class="msg_user">${user.nickname}</div>                            
            <div class="msg_content">${msg}</div>
        </div>
        `;
        //
        this.msgBox.appendChild(div);
        this.msgScrollDown();
    }

    msgShow_me(content) {
        let msg = document.createElement("div");
        msg.classList.add("msg");
        msg.classList.add("my");
        msg.innerHTML =
            `<div class="msg_inner my">
                <div class="msg_content">
                    ${content}
                </div>
            </div>`;
        //
        this.msgBox.appendChild(msg);
        this.msgScrollDown();
    }

    msgShow_broadcast(content) {
        let msg = document.createElement("div");
        msg.classList.add("msg");
        msg.classList.add("broadcast");
        msg.innerHTML =
            `<div class="msg_inner broadcast">
                <div class="msg_content">${content}</div>
            </div>`;
        //
        this.msgBox.appendChild(msg);
        this.msgScrollDown();
    }

    msgScrollDown(){
        let end = this.msgBox.scrollHeight;
        this.msgBox.scrollTop = end;
    }

    sendBtnClickEventGHandler = e => {
        if (this.msg_input.value.trim() !== "") {
            this.socket.emit('chat msg', this.msg_input.value);
            this.msg_input.value = "";
        }
    }



    socket_userListEventHandler = data => {
        this.userList.innerHTML = "";
        data.userList.forEach(user => {
            let div = document.createElement("div");
            div.classList.add("user");
            div.innerHTML = user.nickname;
            if (user.id === this.socket.id) {
                div.classList.add("my");
                this.userList.prepend(div);
            } else this.userList.appendChild(div);
        });

        let txt = `${data.user.nickname} ${data.enter ? "어서오고" : "잘가고"}`;
        this.msgShow_broadcast(txt);
    }

    socket_loginOkEventHandler = data => {
        this.popup.remove();
    }

    loginBtnClickEventHandler = e => {
        if (this.nickname_input.value.trim() === "") {
            alert("닉네임을 입력해라");
            return;
        }

        this.socket.emit('login', this.nickname_input.value);
    }
}


