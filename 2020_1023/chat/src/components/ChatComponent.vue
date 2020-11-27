<template>
<div class="window">
    <div class="chat-list">

    </div>
    <div class="controller">
        <input-component :type="input.type" :value="input.value" :placeholder="input.placeholder" :data-shape='input.shape' />
        <input-component :type="button.type" :value="button.value" :placeholder="button.placeholder" :data-shape='button.shape' />
    </div>
</div>
</template>

<script>
import InputComponent from './InputComponent';

export default {
    name : 'ChatComponent',
    components : {
    'input-component' : InputComponent
    },
    data(){
        return {
            input : {
                type : "text",
                value : "",
                placeholder : "내용 입력",
                shape : "input"
            },
            button : {
                type : "button",
                value : "보내기",
                placeholder : "",
                shape : "button"
            }
        }
    }
}
</script>

<style scoped>
    .window { display: grid; grid-template-rows: 1fr 55px; padding-bottom: 20px; }
    .controller {
        display: grid;
        width: 100%;
        grid-template-columns: 5fr 1fr;
    }
</style>