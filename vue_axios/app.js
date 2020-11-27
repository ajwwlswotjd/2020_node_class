import Vue from 'vue';
import Router from 'vue-router';
import MainApp from '@/MainApp';

import swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewsComponent from '@/components/NewsComponent';
import BoardComponent from '@/components/BoardComponent';
import RegisterComponent from '@/components/RegisterComponent';
import LoginComponent from '@/components/LoginComponent';

import './app.css';

Vue.use(Router);

const router = new Router({
    routes:[
        {
            path:'/',
            name:'news-page',
            component:NewsComponent
        },
        {
            path:'/board',
            name:'board-page',
            component:BoardComponent
        },
        {
            path : '/register',
            name : 'register-page',
            component : RegisterComponent
        },
        {
            path : '/login',
            name : 'login-page',
            component : LoginComponent
        }
    ]
});

window.swal = swal;
window.onload = ()=>{
    new Vue({
        el:"#app",
        router,
        render: h => h(MainApp)
    })
}