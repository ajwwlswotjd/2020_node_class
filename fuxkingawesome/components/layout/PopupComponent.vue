<template>
    <div id="popup">
        <div class="popup_container">
            <div class="popup_inner">

                <div class="row">
                    <h2 class="col-12 tealc">{{ title }}</h2>

                    <popup-input-component v-for="input in input_list" :label="input.label" :type="input.type" :placeholder="input.placeholder" :value="input.value" :name="input.name" :key="input.name" :ref="input.name" />
                </div>


                <div class="row mt-5">
                    <button @click="submit" class="btn btn-primary ml-auto mr-1">완료</button>
                    <button @click="close" class="btn btn-danger mr-3">취소</button>
                </div>

            </div>
        </div>
  </div>
</template>

<script>
import PopupInputComponent from "@/components/layout/PopupInputComponent";
export default {
    props : {
        title : { type : String , default : "POPUP" },
        input_list : { type : Array , default : [] }
    },
    components : {
        PopupInputComponent
    },
    mounted(){
        
    },
    methods : {
        close(){
            this.$emit("close");
        },
        submit(){
            let result = this.input_list.reduce( (current , input) => {

                let value = this.$refs[input.name][0].$refs.input.value;
                current[input.name] = value;
                return current;

            } , new Object() );

            if(Object.values(result).includes("")){
                alert("빈 값이 있습니다.");
                return;
            }

            this.$emit( "submit" , result );
        }
    }
};
</script>

<style scoped>
#popup {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #0007;
  z-index: 100;
}

.popup_container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup_inner {
  width: 50%;
  height: auto;
  background-color: #fff;
  padding: 2rem;
  border-radius: 0.25rem;
  padding: relative;
}
</style>