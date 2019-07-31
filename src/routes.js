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
import CompetitionPreview from "./components/CompetitionPreview.vue";
import Messages from './components/Messages.vue';

export const routes = [
    { path: "/user", component: Home },
    { path: "/admin", component: Home },
    { path: '/login', component: Login },
    { path: "/admin/classes", component: Classes },
    { path: "/admin/students", component: Students },
    { path: '/admin/students/:id', component: StudentEdit },
    { path: "/admin/achivments", component: Achivments, props: { getById: true } },
    { path: "/admin/competitions", component: Competitions },
    { path: "/admin/admins-tab", component: AdminsTab },
    { path: "/admin/students/:id/achivments/", component: Achivments, props: { getById: true }},
    { path: "/admin/edits", component: Edits },
    { path: "/admin/requests", component: Messages },
    { path: "/admin/achivments/create", component: AchivmentsEdit },
    { path: "/admin/achivments/:id/edit/", component: AchivmentsEdit },
    { path: "/admin/competitions/:id/edit", component: CompetitionEdit },
    { path: "/admin/competitions/:id/preview", component: CompetitionPreview },
    { path: "/admin/competitions/create", component: CompetitionEdit },
    { path: "/admin/type-edits/:titleIndex/create", component: GlobalEdit },
    { path: "/admin/level-edits/:titleIndex/create", component: GlobalEdit },
    { path: "/admin/type-edits/:titleIndex/:id", component: GlobalEdit },
    { path: "/admin/level-edits/:titleIndex/:id", component: GlobalEdit },
    { path: '*', redirect: '/login' }
];
