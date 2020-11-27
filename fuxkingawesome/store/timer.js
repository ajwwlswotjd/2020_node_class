export const state = ()=> ({
    frame : null,
    sec :  localStorage.timer ? JSON.parse(localStorage.timer).sec : 0 ,
    origin :  localStorage.timer ? JSON.parse(localStorage.timer).origin : 0 ,
    stop : true
});

export const mutations = {

    setFrame( state ){
        state.stop = false;
        state.frame = setInterval(() => {
            this.commit("timer/tick");
        }, 1000 );
    },

    stopFrame( state ){
        clearInterval(state.frame);
        state.stop = true;
    },

    setOrigin( state , sec ){
        state.sec = sec;
        state.origin = sec;
        this.commit("timer/saveLocal");
    },

    resetFrame( state ){
        state.sec = state.origin;
    },

    tick( state ){
        state.sec--;
        if(state.sec <= -1){
            state.sec = 0;
            alert("타이머 종료");
            this.commit("timer/stopFrame");
        }
        this.commit("timer/saveLocal");
    },

    saveLocal( state ){
        localStorage.timer = JSON.stringify( { sec : state.sec , origin : state.origin } , null , 0 );
    }

}