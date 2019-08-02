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
import moment from 'moment';

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
    //console.log('%c WebApp developed by Janez Sedeljsak & Luka Pavcnik (2k18/19)', 'background: #337; color: #fff; font-size:50px;');
    //console.log('%c      ', 'font-size:200px; background-image: url("https://media.giphy.com/media/REoKXuuCVu02A/giphy.gif")');
    console.log("%c© Janez Sedeljsak & Luka Pavcnik", "color: blue; font-size: 20px");
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

Vue.mixin({
    methods: {
        async getCurrentYear() {
            let response = await fetch("http://localhost:3000/api/get/curr-year");
            let data = await response.json()
            return data.ok ? data.result.id : null;
        }
    }
});

Vue.filter('capitalize', value => value.toUpperCase());
Vue.filter('dateFormat', date => moment(date).format('DD. MM. YYYY'));
Vue.filter('capFirst', item => item.split(" ").map(x => 
    x.substr(0,1).toUpperCase() + x.substr(1,x.length-1).toLowerCase()
).join(" "));

//// global vue components
Vue.component('szr-header', {
    props: ['title'],
    template: (`
        <div class="ui szrheader">
            <h1 v-html="title" style="padding: 5px" class="ui header">
            </h1>
        </div>
    `)
});

Vue.component('szr-loader', {
    template: (`
        <div class="customLoader ui segment">
            <div class="ui active dimmer">
                <div class="ui text loader">Loading...</div>
            </div>
            <p></p>
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
            pickerOptions: [],
            picked: null,
            pickedForDisplay: ""
        }
    },
    created: function () {
        this.fetchData();
    },
    methods: {
        fetchData: function () {
            fetch(`http://localhost:3000/api/get${JSON.parse(this.$props.data).apiRoute}`, { method: "GET" })
                .then(response => response.json())
                .then(data => (this.pickerOptions = data.result));
        },
        tryModalClose: function () {
            if (window.event.target.className === 'w3-modal')
                this.toggleModal()
        },
        toggleModal: function () {
            this.modalOpen = !this.modalOpen
        },
        pickerClick: function (item) {
            this.toggleModal();
            this.picked = item;
            this.pickedForDisplay = JSON.parse(this.$props.data).display.map(key => item[key]).join(" ");
        }
    },
    template: (`
        <div>
            <div @mousedown="tryModalClose()" v-if="modalOpen" style="display:block" class="w3-modal">
                <div class="w3-modal-content">
                    <header class="w3-container cstm-color"> <span v-on:click="toggleModal()" class="w3-button exit-btn w3-display-topright">&times;</span>
                        <h2>{{ modalTitle }}</h2> </header>
                    <div style="padding: 0 !important;" class="picker-container w3-container">
                        <table style="box-shadow: none !important; table-layout: fixed !important;" class="picker-table ui celled table">
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
                <input readonly type="text" v-model="pickedForDisplay" /> <i v-on:click="toggleModal()" class="formIcon add icon"></i> </div>
        </div>
    `)
});
