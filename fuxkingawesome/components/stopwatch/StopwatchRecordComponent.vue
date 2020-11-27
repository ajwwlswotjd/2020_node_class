<template>
  <div class="border col-3 d-flex p-3 justify-content-center align-items-center pr">
      <div class="fowe-4 fosi-125">{{ lab.cs.toTimeObject("cs").toColonString() }}</div>
      <button @click="removeClick" class="btn btn-sm btn-secondary ml-auto">삭제</button>
  </div>
</template>

<script>
export default {
    props : {
        lab : { type : Object , default : { idx : -1 , cs : 0 } }
    },
    methods : {
        removeClick(){

            this.$emit("remove" , this.lab );
            
        }
    }
}
</script>

<style scoped>
    
</style>