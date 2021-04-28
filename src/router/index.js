import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

import BestScores from "../views/BestScores.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/bestscores",
    name: "BestScores",
    component: BestScores
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
