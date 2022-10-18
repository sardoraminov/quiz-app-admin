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
    path: "/create/subject",
    name: "create",
    component: CreateSubjectView,
  },
  {
    path: "/subject/:id",
    name: "subject",
    component: SubjectView,
    props: (route) => ({ id: route.params.id }),
  },
  {
    path: "/pupil/:id",
    name: "pupil",
    component: () => import("../views/PupilView.vue"),
    props: (route) => ({ id: route.params.id }),
  },
  {
    path: "/create/exam",
    name: "exam",
    component: () => import("../views/CreateExamView.vue"),
  },
  {
    path: "/results/:id",
    name: "examResults",
    component: () => import("../views/ExamResults.vue"),
    props: (route) => ({ id: route.params.id }),
  },
  {
    path: "/results",
    name: "results",
    component: () => import("../views/ResultsView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes, 
});

export default router;
