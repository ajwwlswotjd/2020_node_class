<template>
  <div class="col-6 border alarm-item">
    <h4 class="col-12">{{ alarm.title }}</h4>
    <div class="col-12">생성 시간 : {{ new Date(alarm.created_at).toKorString() }}</div>
    <div class="col-12">작동 시간 : {{ new Date(alarm.active_at).toKorString() }}</div>
    <div class="col-12 mt-05">
        {{ alarm.description }}
    </div>
    <div class="row">
        <div class="btn btn-danger ml-auto mr-3 mt-2" @click="removeAlarm">삭제</div>
    </div>
  </div>
</template>

<script>
export default {

    props : {
        alarm : { type : Object , default : {} }
    },

    data(){
        return {
            frame : null
        }
    },

    mounted(){
        this.frame = setInterval(()=>{
            if(new Date().sameTime(this.alarm.active_at)){
                alert(this.alarm.title+"의 알람이 울렸습니다.");
                this.$store.commit("record/removeAlarm" , this.alarm );
                clearInterval(this.frame);
            }
        }, 1000);
    },
    destroyed(){
        clearInterval(this.frame);
    },
    methods : {
        removeAlarm(){
            this.$emit("remove" , this.alarm );
        }
    }
}
</script>

<style scoped>
    .alarm-item {
        padding: 1rem;
    }
</style>