// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import App from "./App.vue";
import { routes } from "./routes";
import VueHead from 'vue-head';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VTooltip from 'v-tooltip';

Vue.use(VTooltip);
Vue.use(VueSweetalert2);
Vue.use(VueRouter);
Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(VueHead);

const router = new VueRouter({
  mode: "history",
  routes
});

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});

Vue.filter('capitalize',  value => value.toUpperCase());

router.beforeEach((to, from, next) => {
    const user = 'admin';
    if(to.path === '/login') {
        if(sessionStorage.getItem("szr_auth"))
            sessionStorage.removeItem('szr_auth');
        if(localStorage.getItem("szr_auth"))
            localStorage.removeItem('szr_auth');
        next();
    } else if (sessionStorage.getItem("szr_auth") || localStorage.getItem("szr_auth")){
        if (localStorage.getItem("szr_auth") && !sessionStorage.getItem("szr_auth")) {
            sessionStorage.setItem('szr_auth', localStorage.getItem("szr_auth"));
        }
        if(to.path.includes('admin')) {
            if(user === 'admin') {
                next();
            } else {
                next('/login');
            }
        } else if (to.path.includes('user')) {
            if(user === 'user') {
                next();
            } else {
                next('/login');
            }
        }
    } else {
        next('/login');
    }
});
