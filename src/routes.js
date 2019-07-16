import Home from "./components/Home.vue";
import Students from "./components/Students.vue";
import Classes from "./components/Classes.vue";
import Achivments from "./components/Achivments.vue";
import Competitions from "./components/Competitions.vue";
import StudentEdit from "./components/StudentEdit.vue";

export const routes = [
    { path: "/", component: Home },
    { path: "/classes", component: Classes },
    { path: "/students", component: Students },
    { path: '/students/:id', component: StudentEdit },
    { path: "/achivments", component: Achivments },
    { path: "/competitions", component: Competitions }
];
