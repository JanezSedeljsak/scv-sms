import Home from "./components/Home.vue";
import Students from "./components/Students.vue";
import Classes from "./components/Classes.vue";
import Achivments from "./components/Achivments.vue";
import Competitions from "./components/Competitions.vue";
import StudentEdit from "./components/StudentEdit.vue";
import AdminsTab from "./components/AdminsTab.vue";
import AchivmentsEdit from "./components/AchivmentsEdit.vue";
import CompetitionEdit from "./components/CompetitionEdit.vue";
import Edits from "./components/Edits.vue";
import GlobalEdit from "./components/GlobalEdit.vue";
import Login from "./components/Login.vue";

export const routes = [
    { path: "/", component: Home },
    { path: '/login', component: Login },
    { path: "/classes", component: Classes },
    { path: "/students", component: Students },
    { path: '/students/:id', component: StudentEdit },
    { path: "/achivments", component: Achivments },
    { path: "/competitions", component: Competitions },
    { path: "/admins-tab", component: AdminsTab },
    { path: "/students/:id/achivments/", component: Achivments },
    { path: "/edits", component: Edits },
    { path: "/students/:id/achivments/:achivment", component: AchivmentsEdit },
    { path: "/achivments/:id/:type/", component: AchivmentsEdit },
    { path: "/achivments/:id/:type/", component: AchivmentsEdit },
    { path: "/competitions/:id/:type", component: CompetitionEdit },
    { path: "/competitions/:id/:type/", component: CompetitionEdit },
    { path: "/type-edits/:titleIndex/create", component: GlobalEdit },
    { path: "/level-edits/:titleIndex/create", component: GlobalEdit },
    { path: "/type-edits/:titleIndex/:id", component: GlobalEdit },
    { path: "/level-edits/:titleIndex/:id", component: GlobalEdit },
    { path: '*', redirect: '/' }
];
