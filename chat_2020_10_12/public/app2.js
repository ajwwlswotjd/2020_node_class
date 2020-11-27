const log = console.log;

class Chat {
    constructor() {
        this.socket = io(); //서버에 소캣 연결
        this.nicknameInput = document.querySelector("#nickname");
        this.user_list_dom = document.querySelector(".user_list_box");
        this.popup = document.querySelector("#popup");
        this.msgBox = document.querySelector("#msgBox");
        this.msgInput = document.querySelector("#msg");
        this.msgBox_innerHeight = this.msgBox.scrollHeight;
        this.msgBox.innerHTML = "";
        this.my_name = "";
        this.init();
    }

    init() {
        this.socketEvent();
        this.addEvent();
    }


    myMsgEvent(msg) {
        msg.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            document.querySelectorAll(".context_popup").forEach(x => x.remove());
            let div = document.createElement("div");
            div.classList.add("context_popup");
            div.innerHTML = `<div class="menu" data-value="menu">모두에게서 삭제</div>
            <div class="menu" data-value="menu">나에게만 삭제</div>
            <div class="menu" data-value="menu">답장</div>`;
            div.style.left = e.pageX + "px";
            div.style.top = e.pageY + "px";
            document.body.appendChild(div);
        });
    }


    socketEvent() {
        this.socket.on('login_ok', data => {
            this.popup.remove();
        });
        this.socket.on("user_list", data => {
            this.user_list_dom.innerHTML = "";
            data[0].forEach(user => {
                let div = document.createElement("div");
                div.innerHTML = `<div class="user_icon">
                                     <i class="fas fa-user"></i>
                                 </div>
                                 <p>${user.nickname}</p>`;
                div.classList.add("user");
                if (user.id === this.socket.id) {
                    div.classList.add("my");
                    this.my_name = user.nickname;
                    this.user_list_dom.prepend(div);

                } else {
                    this.user_list_dom.appendChild(div);
                }

            });
            document.querySelector("#chat > div.chat_header > p").innerHTML = `${this.my_name} 외${data[0].length - 1}명`;


            if (!data[1]) {
                let news = document.createElement("div");
                news.classList.add("news");
                news.innerHTML = `<span>${data[0][data[0].length - 1].nickname}</span> 님이 방에 입장하셨습니다.`;
                this.msgBox.appendChild(news);
            } else {
                let news = document.createElement("div");
                news.classList.add("news");
                news.innerHTML = `<span>${data[1]}</span> 님이 방에서 나가셨습니다.`;
                this.msgBox.appendChild(news);
            }

        });
        this.socket.on("req_msg", data => {
            let msg = document.createElement("div");
            msg.classList.add("msg");
            if (data.user.id === this.socket.id) {
                msg.classList.add("my");
                msg.innerHTML = data.msg;
                this.myMsgEvent(msg);
            } else {
                msg.innerHTML = data.user.nickname + " : " + data.msg;
            }
            this.msgBox.appendChild(msg);
            this.msgBox.scrollTop = (this.msgBox.scrollHeight * 1) - this.msgBox_innerHeight;
        });

    }
    addEvent() {
        document.querySelector("#btnLogin").addEventListener('click', (e) => {
            if (this.nicknameInput.value === "") {
                alert("닉네임을 입력해주세여");
                return;
            }
            this.socket.emit("login", this.nicknameInput.value);
        });
        document.querySelector("#btnSend").addEventListener("click", (e) => {
            if (this.msgInput.value !== "") {
                this.socket.emit("chat_msg", this.msgInput.value);
                this.msgInput.value = "";
            }
        });
        document.querySelector("#nickname").addEventListener("keydown", (e) => {
            if (e.keyCode == 13) {
                document.querySelector("#btnLogin").click();
            }
        });

        document.querySelector("#msg").addEventListener("keydown", (e) => {
            if (e.keyCode == 13) {
                document.querySelector("#btnSend").click();
            }
        });
        window.addEventListener('click', (e) => {
            if (e.target.dataset.value != "menu") {
                document.querySelectorAll(".context_popup").forEach(x => x.remove());
            }
        });
    }
}

window.addEventListener("load", () => {

    let chat = new Chat();


});