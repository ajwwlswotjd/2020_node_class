<template>
    <input :type="type" :value="value" :placeholder="placeholder" :data-shape="shape">
</template>

<script>
export default {
    name : 'InputComponent',
    props : {
        type        : { type : String , default : 'text'  },
        value       : { type : String , default : ''      },
        placeholder : { type : String , default : ''      },
        shape       : { type : String , default : 'input' }
    }
}
</script>

<style scoped>
    input { outline: none; }

    input[data-shape='button']:hover { background-color:#6d15eb; }
    input[data-shape='button'] {
        cursor: pointer;
        background-color: #6200ee;
        color: #fff;
        border:none;
        transition: background-color .3s;
        border-radius: 0.25rem;
    }

    input[data-shape='input']:focus { box-shadow: 0px 0px 0px 3px #6d15eb33; }
    input[data-shape='input'] {
        transition: box-shadow .3s;
        border-radius: 0.25rem;
        border: 1px solid #999;
        padding-left: 10px;
    }

</style>