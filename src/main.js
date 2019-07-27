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
            modalOpen: false,
            modalTitle: JSON.parse(this.$props.data).mTitle,
            titles: JSON.parse(this.$props.data).titles,
            pickerOptions: []
        }
    },
    created: function () {
        this.fetchData();
    },
    methods: {
        fetchData: function () {
            fetch(`http://localhost:3000/api/get${JSON.parse(this.$props.data).apiRoute}`, { method: "GET" })
                .then(response => response.json())
                .then(data => (this.pickerOptions = data['data']));
        },
        tryModalClose: function () {
            if (window.event.target.className === 'w3-modal')
                this.toggleModal()
        },
        toggleModal: function () {
            this.modalOpen = !this.modalOpen
        },
        pickerClick: function (item) {
            console.log(this.pickerOptions, item);
        }
    },
    template: (`
        <div>
            <div v-on:click="tryModalClose()" v-if="modalOpen" style="display:block" class="w3-modal">
                <div class="w3-modal-content">
                    <header class="w3-container cstm-color"> <span v-on:click="toggleModal()" class="w3-button exit-btn w3-display-topright">&times;</span>
                        <h2>{{ modalTitle }}</h2> </header>
                    <div style="padding: 0 !important;" class="w3-container">
                        <table style="!important; box-shadow: none !important; table-layout: fixed !important;" class="ui celled table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th v-for="title in titles">{{ title }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="option in pickerOptions">
                                    <td>
                                        <a v-on:click="pickerClick(option)" class="add-btn ui round-button"> <i class="add icon"></i> </a>
                                    </td>
                                    <td v-for="item in Object.values(option).splice(1)">{{ item }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <footer style="height: .5vw !important;" class="w3-container cstm-color">
                    </footer>
                </div>
            </div>
            <div style="width:100%" class="ui inverted right icon input">
                <input type="text" /> <i v-on:click="toggleModal()" class="formIcon add icon"></i> </div>
        </div>
    `)
});

Vue.component('admin-nav', {
    data() {
        return {}
    },
    methods: {
        moveUrl: link => window.location.pathname != link ? window.location = link : null
    },
    template: (`
        <div class="ui vertical borderless fluid text menu">
            <a v-on:click="moveUrl('/admin/students')" class="item">
            <i class="graduation cap icon"></i>Dijaki
            </a>
            <a v-on:click="moveUrl('/admin/competitions')" class="item">
            <i class="sort numeric up icon"></i>Tekmovanja
            </a>
            <a v-on:click="moveUrl('/admin/classes')" class="item">
            <i class="book icon"></i>Predmeti
            </a>
            <a v-on:click="moveUrl('/admin/edits')" class="item">
            <i class="edit icon"></i>Urejanja
            </a>
            <a v-on:click="moveUrl('/admin/achivments')" class="item">
            <i class="trophy icon"></i>Dosezki
            </a>
            <a v-on:click="moveUrl('/admin/admins-tab')" class="item">
            <i class="address book icon"></i>Administratorji
            </a>
            <div style="height:3vw" class="ui hidden divider"></div>
            <a v-on:click="moveUrl('/login')" class="item">
            <i class="sign out alternate icon"></i>Odjava
            </a>
        </div>
    `)
})
