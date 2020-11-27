export const state = () => ({
    frame : null,
    cs : localStorage.cs ? localStorage.cs*1 : 0, // centisecond :: 10밀리초를 일컫는다카더라 => 100cs = 1sec
    stop : true
});

export const mutations = {
    
    setFrame( state ){
        state.stop = false;
        state.frame = setInterval(()=>{
            this.commit("stopwatch/addCs");
        } , 10);
    },

    addCs( state ){
        state.cs++;
    },

    stopFrame( state ){

        state.stop = true;
        clearInterval(state.frame);
        localStorage.cs = state.cs;

    },

    clearFrame( state ){

        this.commit("stopwatch/stopFrame");
        state.cs = 0;
        localStorage.cs = state.cs;

    }
    

}