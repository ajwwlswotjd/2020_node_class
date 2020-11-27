<template>
<div>

    <transition name="fade">
        <popup-component title="알람 추가" :input_list="input_list" v-show="showAlarmFormPopup" @close="showAlarmFormPopup = false" @submit="insertAlarm" />
    </transition>
    
    <div class="container">
        <div class="row mt-5">
            <h1 class="col-12 tealc">알람 목록</h1>
            <div class="row col-12 alarm_list mt-4">
                <alarm-item-component v-for="alarm in alarm_list" :key="alarm.id" :alarm="alarm" @remove="removeAlarm" />
            </div>
        </div>
        <div class="row">
            <div @click="showAlarmFormPopup = true" class="btn btn-primary mt-4 ml-auto mb-5">알람 추가</div>
        </div>
    </div>
</div>
</template>

<script>
import AlarmItemComponent from '@/components/alarm/AlarmItemComponent';
import PopupComponent from '@/components/layout/PopupComponent';

export default {
  components: { AlarmItemComponent, PopupComponent },

    data(){
        return {
            showAlarmFormPopup : false,
            alarm_list : [],
            input_list : [
                { type : "text" , name : "title" , placeholder : "알람 제목을 입력해주세요." , value : "" , label : "알람 제목" },
                { type : "datetime-local" , name : "active_at" , placeholder : "" , value : "" , label : "작동 시간" },
                { type : "text" , name : "description" , placeholder : "알람을 설명해주세요." , value : "" , label : "알람 메모" },
            ]
        }
    },

    created(){
        this.$store.commit("record/readData");
        this.alarm_list = this.$store.state.record.alarms;
    },

    methods : {
        removeAlarm( alarm ){
            this.$store.commit("record/removeAlarm" , alarm );
        },
        insertAlarm( alarm ){
            alarm.idx = this.maxIdx;
            alarm.created_at = new Date();
            alarm.active_at = new Date(alarm.active_at);

            if( alarm.active_at <= new Date() ){
                alert("이미 지난 날짜에 알람을 등록할 수 없습니다.");
                return;
            }
            
            this.$store.commit("record/insertAlarm" , alarm );
            this.showAlarmFormPopup = false;
        }
    },

    computed : {
        maxIdx(){
            return Math.max( ...this.alarm_list.map( x => x.idx*1 ) )+1;
        }
    },

    mounted(){
        
    }
}
</script>

<style scoped>

</style>