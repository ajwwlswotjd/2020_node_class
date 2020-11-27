const log = console.log;
const local = window.localStorage;

class TodoApp {
    constructor(){

        this.listDom = document.querySelector("#list");
        this.titleInput = document.querySelector("#title");
        this.contentInput = document.querySelector("#content");
        this.garbage = document.querySelector("#garbage");
        this.msgBox = document.querySelector(".msg-box");
        this.todoList = [];
        this.idx = 0;

        this.init();
    }

    get titleValue() { return this.titleInput.value.toXSSFilteredText().trim() }
    get contentValue() { return this.contentInput.value.toXSSFilteredText().trim() }
 
    loadData(){

        if(local.datas){
            let json = JSON.parse(local.datas);
            this.idx = json.idx * 1;
            this.todoList = json.todoList;
        }

    }

    saveData(){
        let json = JSON.stringify( {todoList : this.todoList , idx : this.idx } , null , "");
        local.datas = json;
    }

    init(){
        this.loadData();
        this.render();
        this.addEvent();
    }

    render(){
        this.listDom.innerHTML = "";
        this.todoList.forEach(x=>{

            const { TITLE , CONTENT , IDX } = x;
            const DOM = this.makeTodoDom( { TITLE, CONTENT, IDX } );
            x.DOM = DOM;
            this.listDom.prepend(DOM);
            DOM.draggable = true;
            DOM.addEventListener("dragstart", this.DOMDragStartEventHandler);

        });
    }

    addEvent(){
        document.querySelector("#addBtn").addEventListener("click", this.addTodo.bind(this));
        this.garbage.addEventListener("dragover", (e)=> e.preventDefault());
        this.garbage.addEventListener("drop", this.garbageDropEventHandler);
    }

    garbageDropEventHandler = e => {
        const IDX = e.dataTransfer.getData("idx") * 1;
        const TARGET_IDX = this.todoList.findIndex(x=> x.IDX === IDX);
        const TARGET_DOM = this.todoList[TARGET_IDX].DOM;
        TARGET_DOM.classList.add("off");
        setTimeout(() => {TARGET_DOM.remove()}, 800);
        this.todoList.splice(TARGET_IDX , 1);
        this.saveData();
    }

    addTodo(){
        const TITLE = this.titleValue;
        const CONTENT = this.contentValue;

        if(TITLE == "" || CONTENT == ""){
            this.showToast("값 빈거 에반데 ㅋㅋ");
            return;
        }

        const IDX = ++this.idx;
        const DOM = this.makeTodoDom( { TITLE , CONTENT , IDX } );
        DOM.draggable = true;
        DOM.addEventListener("dragstart", this.DOMDragStartEventHandler);

        this.todoList.push( { TITLE, CONTENT, DOM , IDX } );
        this.listDom.prepend(DOM);
        DOM.classList.add("off");
        setTimeout(() => {DOM.classList.remove("off")}, 1);

        this.titleInput.value = "";
        this.contentInput.value = "";
        this.saveData();
    }

    DOMDragStartEventHandler = e => {
        const IDX = e.currentTarget.dataset.idx;
        e.dataTransfer.setData("idx", IDX);
    }

    makeTodoDom( { TITLE, CONTENT, IDX } ){
        let div = document.createElement("div");
        div.innerHTML = 
        `<div class="item" data-idx="${IDX}">
            <h4 class="title">${TITLE}</h4>
            <span class="msg">${CONTENT}</span>
        </div>`;
        return div.firstChild;
    }

    showToast(msg){
        this.msgBox.innerHTML = msg;
        this.msgBox.classList.add("on");
        setTimeout(() => {this.msgBox.classList.remove("on")}, 1000);
    }
}

window.addEventListener("load",(e)=>{
    window.todoApp = new TodoApp();
});

String.prototype.toXSSFilteredText = function () {
    let entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };
    let returnTxt = this.replace(/[&<>"'`=\/]/g, function (s) {
        return entityMap[s];
    });
    return returnTxt;
}