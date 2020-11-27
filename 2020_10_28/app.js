import Vue from "vue";
import MainApp from '@/MainApp';
import Router from 'vue-router';

import swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

Vue.use(Router);

import NewsComponent from '@/components/NewsComponent';
import BoardComponent from '@/components/BoardComponent';

const router = new Router({
    routes : [
        {
            path : '/',
            name : 'news-page',
            component : NewsComponent
        },
        {
            path : '/board',
            name : 'board-page',
            component : BoardComponent
        }
    ]
});

window.swal = swal;

window.addEventListener('load',()=>{

    new Vue({
        el : "#app",
        router,
        render : h => h(MainApp)
    });
    
});