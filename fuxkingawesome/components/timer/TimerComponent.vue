<template>
<div>
    <transition name="fade">
        <popup-component title="타이머 수정" :input_list="input_list" @submit="editTimer" v-show="showPopup" @close="showPopup = false" />
    </transition>
    <div class="container">
        <div class="row mt-5">
            <h1 class="tealc col-12">타이머</h1>
        </div>

        <div class="row">
            <div class="col-12 timer py-4 tealc fosi-3 mt-3">
                {{ nowSec.toTimeObject("sec").toColonString() }}
            </div>

            <div class="col-12 mt-3 d-flex justify-content-center">
              <button @click="showPopup = true" class="btn btn-success mr-1">타이머 수정</button>
              <button @click="reset" class="btn btn-info mr-1">재설정</button>
              <button @click="startAndStop" class="btn" :class="{ 'btn-primary' : stop , 'btn-danger' : !stop }">{{ stop ? "시작" : "중지" }}</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import PopupComponent from '@/components/layout/PopupComponent.vue';
export default {
    components : {
        PopupComponent
    },
    data(){
        return {
            showPopup : false,
            input_list : [
                { type : "text" , name : "hour" ,   label : "시간", placeholder : "시간" },
                { type : "text" , name : "minute" , label : "분",   placeholder : "분" },
                { type : "text" , name : "sec" ,    label : "초",   placeholder : "초" }
            ]
        }
    },
    computed : {
        stop(){
            return this.$store.state.timer.stop;
        },
        nowSec(){
            return this.$store.state.timer.sec;
        }
    },
    methods : {
        reset(){
            this.$store.commit("timer/resetFrame");
        },
        startAndStop(){
            if(this.stop){ // 현재 멈춰있는 상태 ( 시작버튼 누름 )

                this.$store.commit("timer/setFrame");

            } else { // 중지 버튼 눌렀음

                this.$store.commit("timer/stopFrame");

            }
        },
        editTimer( result ){
            let { hour , minute , sec } = result;
            hour *= 1; minute *= 1; sec *= 1;
            if(hour < 0 || isNaN(hour)){
                alert("시간이 잘못 입력되었습니다.");
                return;
            }
            if(minute < 0 || minute >= 60 || isNaN(minute)){
                alert("분이 잘못 입력되었습니다.");
                return;
            }
            if(sec < 0 || sec >= 60 || isNaN(sec)){
                alert("초가 잘못 입력되었습니다.");
                return;
            }
            let sum = (hour * 60 * 60) + (minute * 60) + sec;
            this.$store.commit("timer/setOrigin" , sum );
            this.showPopup = false;
        }
    }
}
</script>

<style scoped>
    .timer {
        background-color: #f7f7f7;
    }
</style>