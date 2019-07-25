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

router.beforeEach((to, from, next) => {
    let user = null;
    if (to.path === '/login') {
        if (sessionStorage.getItem("szr_auth")) sessionStorage.removeItem('szr_auth');
        next();
    } else if (sessionStorage.getItem("szr_auth")) {
        fetch("http://localhost:3000/api/auth/get-rights", {
            method: "POST",
            body: JSON.stringify({ tokenString: sessionStorage.getItem("szr_auth") }),
            headers: { "Content-Type": "application/json" }
        }).then(res => res.json()).then(response => {
            user = response.result._rights;
            if (to.path.includes('admin')) user === 'admin' ? next() : next('/login');
            else if (to.path.includes('user')) user === 'user' ? next() : next('/login');
        });
    } else
        next('/login');
});

new Vue({
    el: "#app",
    router,
    render: h => h(App)
});

Vue.filter('capitalize', value => value.toUpperCase());
Vue.filter('jsonStringify', value => JSON.stringify(value));

//// global vue components
Vue.component('szr-header', {
    props: ['title'],
    data() {
        return {}
    },
    template: (`
        <div class="ui szrheader">
            <h1 v-html="title" style="padding: 5px" class="ui header">
            </h1>
        </div>
    `)
});


Vue.component('szr-picker', {
    props: ['data'],
    data() {
        return {
            headers: JSON.parse(this.$props.data).titles.map(x => `<th>${x}</th>`)
        }
    },
    created: function() {
        this.fetchData();
    },
    methods: {
        fetchData: function() {
            fetch(JSON.parse(this.$props.data).apiRoute, { method: "POST"})
                .then(response => response.json())
                .then(res => console.log(res))
        },
        openPickerModal: function() {
            let component = this;
            this.$swal({
                title: '<strong>Izbirnik</strong>',
                onBeforeOpen: function() {
                },
                html: (`
                    <table
                        style="box-shadow: none !important; table-layout: fixed !important"
                        class="ui celled table"
                    >
                        <thead class="ui inverted blue table">
                        <tr>
                            <th>Dodaj</th>
                            ` + component.headers + `
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                            <a
                                v-tooltip.top-center="'Uredi podatke dijaka'"
                                v-on:click="changeLocation( student._id)"
                                class="add-btn ui round-button"
                            >
                                <i class="add icon"></i>
                            </a>
                            </td>
                            <td>24</td>
                            <td>Engineer</td>
                        </tr>
                        </tbody>
                    </table>
                `),
                showCloseButton: true,
                width: window.innerWidth/2,
                focusConfirm: false,
                showConfirmButton: false
              })
        }
    },
    template: (`
        <div style="width:100%" class="ui inverted right icon input">
            <input type="text" />
            <i v-on:click='openPickerModal()' class="formIcon add icon"></i>
        </div>
    `)
});
