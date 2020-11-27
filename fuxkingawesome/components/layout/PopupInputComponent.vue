<template>
<div class="col-12 mt-15">
    <h6>{{ label }}</h6>
    <input :type="type" :placeholder="placeholder" :name="name" class="form-control" ref="input" />
</div>
</template>

<script>
export default {
    props : {
        type : { type : String , default : "text" },
        placeholder : { type : String , default : "" },
        name : { type : String, default : "" },
        value : { type : String, default : "" },
        label : { type : String , default : "입력" }
    },
    mounted(){
        if(this.type === "datetime-local") this.$refs.input.setAttribute("step" , 1);
    }
}
</script>

<style>

</style>