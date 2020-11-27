<template>
  <div class="container">
      <div class="row mt-5">
          <h1 class="tealc col-12">스탑워치</h1>
      </div>

      <p class="fosi-3 watch tealc mt-3 py-4">{{ nowCs.toTimeObject("cs").toColonString() }}</p>

      <div class="col-12 mt-3 d-flex justify-content-center">
          <button :class="{ 'btn-info' : stop , 'btn-dark' : !stop }" class="btn mr-1" @click="resetAndRecord">{{ stop ? "재설정" : "기록" }}</button>
          <button :class="{'btn-primary' : stop , 'btn-danger' : !stop }" class="btn" @click="startAndStop">{{ stop ? "시작" : "중지" }}</button>
      </div>

      <div class="row mt-3">
        <div class="col-12 d-flex justify-content-center align-items-center my-3">
            <h4 class="tealc mr-2">기록</h4>
            <button class="btn btn-sm btn-outline-danger" @click="clearLabs">전체삭제</button>
        </div>
          <stopwatch-record-component v-for="lab in lab_list" :key="lab.idx" :lab="lab" @remove="removeLab" />
      </div>
  </div>
</template>

<script>
import StopwatchRecordComponent from "@/components/stopwatch/StopwatchRecordComponent";

export default {
    components : { StopwatchRecordComponent },

    created(){
        this.$store.commit("record/readData");
        this.lab_list = this.$store.state.record.labs;
    },

    data(){
        return {
            stop : this.$store.state.stopwatch.stop,
            lab_list : []
        }
    },

    computed : {
        maxIdx(){
            return Math.max( ...this.lab_list.map( x => x.idx*1 ) )+1;
        },
        nowCs(){
            return this.$store.state.stopwatch.cs;
        }
    },
    methods : {

        clearLabs(){
            this.$store.commit("record/clearLabs");
        },

        removeLab( lab ){
            this.$store.commit( "record/removeLab" , lab );
        },

        resetAndRecord(){
            if(this.stop){ // 현재 멈춰있는 상태 ( 재설정 버튼 누름 )

                this.$store.commit("stopwatch/clearFrame");

            } else { // 현재 돌아가는중 ( 기록 버튼 누름 )
                
                let idx = this.maxIdx;
                if(idx < 0) idx = 0;
                let cs = this.nowCs;
                this.$store.commit("record/insertLab" , { idx , cs } );

            }
        },

        startAndStop(){

            if(this.stop){ // 현재 멈춰있는 상태 ( 시작버튼 누름 )

                this.$store.commit("stopwatch/setFrame");
                
            } else { // 현재 돌아가고 있는 상태 ( 중지버튼 누름 )

                this.$store.commit("stopwatch/stopFrame");

            }
            this.stop = !this.stop;

        }
    }
}
</script>

<style scoped>
    .watch {
        background: #f7f7f7;
        margin: 0 auto;
        display: block;
        width: auto;
        border-radius: 0.25rem;
    }
</style>