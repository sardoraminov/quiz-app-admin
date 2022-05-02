import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreateSubjectView from "../views/CreateSubjectView.vue";
import SubjectView from "../views/SubjectView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/create",
    name: "create",
    component: CreateSubjectView,
  },
  {
    path: "/subject/:id",
    name: "subject",
    component: SubjectView,
    props: (route) => ({ id: route.params.id }),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
