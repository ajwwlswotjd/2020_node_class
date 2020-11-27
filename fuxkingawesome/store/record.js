export const state = () => ({
    alarms : null,
    labs : null
});

export const mutations = {
    
    readData( state ){
        state.alarms = localStorage.alarms ? JSON.parse(localStorage.alarms) : [];
        state.labs = localStorage.labs ? JSON.parse(localStorage.labs) : [];
    },

    insertAlarm( state , alarm ){
        state.alarms.push(alarm);
        localStorage.alarms = JSON.stringify(state.alarms , null , 0);
        alert("알람 등록이 완료되었습니다.");
    },

    removeAlarm( state , alarm ){
        let idx = state.alarms.findIndex( x => x.idx == alarm.idx );
        if(idx === -1){
            alert("알람 삭제에 실패하였습니다.");
            return;
        }
        state.alarms.splice( idx , 1 );
        localStorage.alarms = JSON.stringify(state.alarms , null , 0);
        alert("알람을 삭제하였습니다.");
    },

    insertLab( state , lab ){
        state.labs.push(lab);
        localStorage.labs = JSON.stringify(state.labs , null , 0);
    },

    removeLab( state , lab ){
        let idx = state.labs.findIndex( x => x.idx == lab.idx );
        if(idx === -1){
            alert("기록 삭제에 실패하였습니다.");
            return;
        }
        state.labs.splice( idx , 1 );
    },

    clearLabs( state ){
        state.labs.splice( 0 , state.labs.length );
        localStorage.labs = JSON.stringify(state.labs , null , 0);
    }

}