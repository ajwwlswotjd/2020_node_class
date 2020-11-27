<template>
  <div class="container">
    <div class="jumbotron">
      <h1 class="display-4">FUXKIMGAWESOME</h1>
      <p class="lead">
        미안하다 이거 보여주려고 어그로 끌었다... NUXT 성능수준 ㄹㅇ 실화냐? 진짜 세계관최강 프레임워크다.. 그 찐따같던 Vue가 맞나? 진짜 NUXT는 전설이다.. 
      </p>
      <hr class="my-4" />
      <p>과제할 생각에 가슴이 웅장해진다...</p>
      <button class="btn btn-primary" @click="goHell">지옥 가기</button>
    </div>
  </div>
</template>

<script>
export default {
    methods : {
        goHell(){
            while(true) if(prompt("지옥에서 탈출해라!") === "응애") break;
        }
    }
};
</script>

<style scoped>
    .jumbotron {
        background: #fff;
    }
</style>