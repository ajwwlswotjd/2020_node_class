import Vue from 'vue';
import VueBemCn from 'vue-bem-cn';
Vue.use(VueBemCn);


window.log = console.log;
window.dir = console.dir;
const { floor } = Math;
window.sum = function(){
    return [...arguments].reduce( (acc,current)=> acc+=current , 0 );
}

Date.prototype.toKorString = function(){
    let year   =  this.getFullYear().padStart( 4 , ""  );
    let month  = (this.getMonth()+1).padStart( 2 , "0" );
    let date   =      this.getDate().padStart( 2 , "0" );
    let hour   =     this.getHours().padStart( 2 , "0" );
    let minute =   this.getMinutes().padStart( 2 , "0" );
    let sec    =   this.getSeconds().padStart( 2 , "0" );
    return `${year}년 ${month}월 ${date}일 ${hour}시 ${minute}분 ${sec}초`;
}

Date.prototype.sameTime = function(date){
    if(typeof date !== "object") date = new Date(date);
    return (
        this.getFullYear() === date.getFullYear() &&
        this.getMonth() === date.getMonth() &&
        this.getDate() === date.getDate() &&
        this.getHours() === date.getHours() &&
        this.getMinutes() === date.getMinutes() &&
        this.getSeconds() === date.getSeconds()
    );
    
}

Number.prototype.padStart = function( maxLength , fillString ){
    return (this+"").padStart( maxLength , fillString );
}

Number.prototype.toTimeObject = function(type){

    let this_clone = this; 
    if(type == "sec") this_clone *= 100;
    let cs = this_clone % 100;
    let sec = floor( this_clone / 100 ) % 60;
    let minute = floor( floor( this_clone / 100 ) / 60 ) % 60 ;
    let hour = floor( floor( this_clone / 100 ) / (60 * 60) );
    let obj = { cs , sec , minute , hour };
    obj.toColonString = function(){
        return `${hour.padStart(2,"0")} : ${minute.padStart(2,"0")} : ${sec.padStart(2,"0")}${ type == "sec" ? "" : "." + cs.padStart(2,"0") }`;
    }
    return obj;
    
}