import Home from "./components/Home.vue";
import Students from "./components/Students.vue";
import Classes from "./components/Classes.vue";

export const routes = [
    { path: "/", component: Home },
    { path: "/classes", component: Classes },
    { path: "/students", component: Students },
];
