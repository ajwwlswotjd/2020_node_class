<template>
    <div>
        <h1>회원가입</h1>

        <div class="row">
            <div class="col-8 offset-2">
                <form @submit.prevent="sendForm">
                    <div class="form-group">
                      <label for="name">이름</label>
                      <input type="name" v-model="formData.name" ref="name" class="form-control" id="name" placeholder="이름을 입력해주세요">
                    </div>
                    <div class="form-group">
                      <label for="email">이메일</label>
                      <input type="text" v-model="formData.email" class="form-control" ref="email" id="email" placeholder="이메일을 입력해주세요">
                    </div>
                    <div class="form-group">
                      <label for="password">비밀번호</label>
                      <input type="password" v-model="formData.password" class="form-control" ref="password" id="password" placeholder="비밀번호를 입력해주세요">
                    </div>
                    <div class="form-group">
                      <label for="password_check">비밀번호 확인</label>
                      <input type="password" v-model="formData.password_check" class="form-control" ref="password_check" id="password_check" placeholder="비밀번호를 한번 더 입력해주세요">
                    </div>
                    
                    <button type="submit" class="btn btn-primary">회원가입</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name:"registerComponent",
    data(){
        return {
          email_reg : new RegExp(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i),
            formData:{
                email:'',
                name:'',
                password:'',
                password_check:''
            },
            swalData : {
              title : '',
              text : ''
            }
        }
    },
    watch:{
        formData: {
            deep:true,
            handler(n, o){
                if( this.formData.email === "" || !this.email_reg.test(this.formData.email) ) {
                    this.$refs.email.classList.add("is-invalid");
                    this.$refs.email.classList.remove("is-valid");
                } else {
                    this.$refs.email.classList.add("is-valid");
                    this.$refs.email.classList.remove("is-invalid");
                }
            }
        }
    },
    methods:{
        sendForm(){

          let { email , name , password , password_check } = this.formData;
          let arr = Object.values(this.formData);
          if( arr.findIndex(x=> x.trim() === "" ) !== -1 ) {
            this.swalData.title = "타임 코스모스 깐따삐야";
            this.swalData.text = "빈값 어서오고";
            swal.fire( this.swalData );
            return;
          }

          if( !email_reg.test(email) ){
            this.swalData.title = "꼴받게 하네?";
            this.swalData.text = '역시 이메일 정규식이야 성능 확실하구만';
            swal.fire( this.swalData );
            return;
          }

          if( password !== password_check ){
            this.swalData.title = "아이 싯팔";
            this.swalData.text = "비밀번호 처신 잘하라고 ㅋㅋ;";
            swal.fire( this.swalData );
            return;
          }
          
          
          const URL = "/api/register";
          axios.post( URL , this.formData ).then( res =>{
            let { msg , success } = res.data;
            this.swalData.text = msg;
            this.swalData.title = "서버 메시지";
            swal.fire(this.swalData);
            if(success) this.$router.push("/login");

          });
          
        }

    }
}
</script>

<style scoped>

</style>