<template>
    <div class="container">
        <div class="row my-2">
            <div class="col-12">
                <ul class="nav nav-pills">
                    <li @click="changeMenu(0)" class="nav-item">
                        <router-link :class="{ active:menu === 0 }" to="/" class="nav-link">활성링크</router-link>
                    </li>
                    <li @click="changeMenu(1)" class="nav-item">
                        <router-link :class="{ active:menu === 1 }" to="/board" class="nav-link">메뉴2</router-link>
                    </li>
                    <li @click="changeMenu(2)" class="nav-item">
                        <router-link :class="{ active:menu === 2 }" to="#" class="nav-link">메뉴3</router-link>
                    </li>
                    <li @click="changeMenu(3)" class="nav-item">
                        <router-link :class="{ active:menu === 3 }" to="#" class="nav-link">메뉴4</router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <section class="content">
                    <transition name="sc" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </section>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name : "MainApp",
    data(){
        return {
            menu : 0
        }
    },
    methods : {
        changeMenu(idx){
            this.menu = idx;
        }
    }
}
</script>

<style scoped>

    .content {
        overflow: hidden;
    }

</style>