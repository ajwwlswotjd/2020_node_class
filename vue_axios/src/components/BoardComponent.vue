<template>
    <div>
        <h1>보드 컴포넌트</h1>
        <ul>
            <li v-for="item in list" :key="item.id">{{item.title}}</li>
        </ul>
        <div>
            <input type="text" v-model="title">
            <button @click="send">전송하기</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name:"boardComponent",
    data(){
        return {
            list:[],
            title:''
        }
    },
    mounted(){
        axios.get("/test").then(res =>{
            this.list = res.data;
        });
    },
    methods:{
        send(){
            axios.post('/data', {title:this.title}).then(res =>{
                //여기에 포스트 전송이 완료된 후 작업을 해주면된다.
            });
        }
    }
}
</script>
<style scoped>

</style>