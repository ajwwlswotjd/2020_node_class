<template>
    <div>
        <h1>로그인</h1>
        <div class="row">
            <div class="col-8 offset-2">
                <form @submit.prevent="sendLogin">
                  <div class="form-group">
                    <label for="email">이메일</label>
                    <input type="email" v-model="formData.email" class="form-control" id="email" placeholder="이메일 입력">
                  </div>
                  <div class="form-group">
                    <label for="password">비밀번호</label>
                    <input type="password" v-model="formData.password" class="form-control" id="password" placeholder="비밀번호 입력">
                  </div>
                  <button type="submit" class="btn btn-primary">로그인</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name:"boardComponent",
    data(){
        return {
            formData : {
                email : "",
                password : ""
            }
        }
    },
    methods : {
        sendLogin(){
            const URL = "/api/login";
            axios.post( URL , this.formData ).then( res => {
                const DATA = res.data;
                console.log(DATA);
            });
        }
    }
}
</script>
<style scoped>

</style>