import { createRouter, createWebHashHistory } from "vue-router";

import CheckClientRuning from "@/views/CheckClientRuning";
import HomePage from "@/views/Home/HomePage";
import HomeIndex from "@/views/Home/Index";
import GameTeam from "@/views/Game/GameTeam";
import ProFile from "@/views/ProFile/ProFile";
import Update from "@/views/System/Update.vue";
import Error from "@/views/Error.vue";
const routes = [
  {
    path: "/",
    name: "CheckClientRuning",
    component: CheckClientRuning,
    meta: {
      background: true,
    },
  },
  {
    path: "/home",
    name: "HomePage",
    component: HomePage,
    redirect: "/home/index",
    children: [
      {
        path: "/home/index",
        name: "Index",
        component: HomeIndex,
        meta: {
          background: true,
        },
      },
      {
        path: "/home/pro-file",
        name: "ProFile",
        component: ProFile,
      },
    ],
  },
  {
    path: "/game",
    name: "GamePage",
    component: HomePage,
    redirect: "/game/team",
    children: [
      {
        path: "/game/team",
        name: "GameTeam",
        component: GameTeam,
      },
    ],
  },
  {
    path: "/update",
    name: "update",
    component: Update,
  },
  {
    path: "/:catchAll(.*)",
    name: "Error",
    component: Error,
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
