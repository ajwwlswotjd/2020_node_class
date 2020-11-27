<template>

<div class="chat-container">
    <chat-component ref="chat" @resize="resize" />
    <list-component />
</div>
  
</template>

<script>
import ChatComponent from './components/ChatComponent';
import ListComponent from './components/ListComponent';

export default {
  name : 'App',
  components : {
    'chat-component' : ChatComponent,
    'list-component' : ListComponent
  },
  methods :{
    resize(){
      this.$refs.chat.$el.style.height = window.innerHeight + "px";
    }
  },
  mounted(){
      // window.addEventListener("resize",()=>{ this.resize() });
      window.addEventListener('resize', this.resize);
      this.resize();
  }
}
</script>

<style scoped>
  .chat-container {
    width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 3fr 1fr;
  }

</style>

<style>

* { margin: 0; padding: 0; box-sizing: border-box; }
a  { text-decoration: none; }
li { list-style: none; }

</style>