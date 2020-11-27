const log = console.log;
class TlatlaApp {

    constructor(){
        this.canvas = document.querySelector("#canvas");
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.isDrawing = false;
        this.beforeX = null;
        this.beforeY = null;
        this.figureStatus = 0;
        this.beforeRect = { x : 0 , y : 0 , w : 0 , height : 0 };
        this.init();
    }

    init(){
        this.render();
        this.addEvent();
    }

    render(){
        this.ctx.strokeStyle = "#000";
        this.ctx.fillStyle = "#000";
        this.ctx.lineWidth = width.value;
        this.ctx.lineJoin = 'round';
    }

    addEvent(){
        window.addEventListener("mousedown", this.windowMouseDownEventHandler);
        window.addEventListener("mouseup", this.windowMouseUpEventHandler);

        this.canvas.addEventListener("mousemove", this.canvasMouseMoveEventHandler);
        this.canvas.addEventListener("mouseout", this.canvasMouseOutEventHandler);
        this.canvas.addEventListener("mouseup", this.canvasMouseUpEventHandler);

        document.querySelector('#width').addEventListener("input", this.widthInputEventHandler);
        document.querySelector('#color').addEventListener("input", this.colorInputEventHandler);

        document.querySelector("#circle").addEventListener("click", this.circleBtnClickEventHandler);
        document.querySelector("#rect").addEventListener("click", this.rectBtnClickEventHandler);
        document.querySelector("#draw").addEventListener("click", this.drawBtnClickEventHandler);
        document.querySelector("#clear").addEventListener("click", this.clearBtnClickEventHandler);
        // document.querySelector
    }

    canvasMouseUpEventHandler = e => {
        if(this.figureStatus == 1) this.beforeRect = { x : 0 , y : 0 , w : 0 , h : 0 };
    }

    circleBtnClickEventHandler = e => {
        this.figureStatus = 2;
        document.querySelector(".active").classList.remove("active");
        e.currentTarget.classList.add("active");
    }
    
    rectBtnClickEventHandler = e => {
        this.figureStatus = 1;
        document.querySelector(".active").classList.remove("active");
        e.currentTarget.classList.add("active");
    }

    drawBtnClickEventHandler = e => {
        this.figureStatus = 0;
        document.querySelector(".active").classList.remove("active");
        e.currentTarget.classList.add("active");
    }

    clearBtnClickEventHandler = e => {
        this.ctx.clearRect(0,0,this.width,this.height);
    }

    canvasMouseOutEventHandler = e => {
        this.beforeX = null;
        this.beforeY = null;
    }

    canvasMouseMoveEventHandler = e => {

        if( !this.isDrawing ) return;
        if(this.figureStatus == 0) this.canvasMouseMoveOnDraw(e);
        if(this.figureStatus == 1) this.canvasMouseMoveOnRect(e);
        if(this.figureStatus == 2) this.canvasMouseMoveOnCircle(e);

    }

    canvasMouseMoveOnRect(e){

        let {offsetX : x , offsetY : y} = e;
        let param = {
            x : Math.min( x , this.beforeX ),
            y : Math.min( y , this.beforeY ),
            w : Math.abs( x - this.beforeX ),
            h : Math.abs( y - this.beforeY )
        };
        
        this.ctx.clearRect( this.beforeRect.x , this.beforeRect.y , this.beforeRect.w , this.beforeRect.h );
        this.beforeRect = param;
        this.ctx.fillRect( param.x , param.y , param.w , param.h );
    }

    canvasMouseMoveOnDraw(e){
        let x = e.offsetX;
        let y = e.offsetY;

        if(this.beforeX != null && this.beforeY != null){
            this.ctx.beginPath();
            this.ctx.moveTo( this.beforeX , this.beforeY );
            this.ctx.lineTo( x , y );
            this.ctx.closePath();
            this.ctx.stroke();
        }

        this.beforeX = x;
        this.beforeY = y;
    }

    windowMouseDownEventHandler = e => {
        this.isDrawing = true;
        this.beforeX = e.offsetX;
        this.beforeY = e.offsetY;
    }

    windowMouseUpEventHandler = e => {
        this.isDrawing = false;
        this.beforeX = null;
        this.beforeY = null;
    }

    colorInputEventHandler = e => {
        let value = e.currentTarget.value;
        this.ctx.strokeStyle = value;
        this.ctx.fillStyle = value;
    }

    widthInputEventHandler = e => {
        let value = e.currentTarget.value;
        value = value.replace(/[^\d]/g,"") * 1;
        if(value >= 10) value = 10;
        e.currentTarget.value = value;
        this.ctx.lineWidth = value;
        document.querySelector("#width-span").innerHTML = value;
    }
    
}

window.addEventListener("load",(e)=>{
    window.tlatlaApp = new TlatlaApp();
});
