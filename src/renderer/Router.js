import { createRouter, createWebHashHistory } from "vue-router";

import CheckClientRuning from "@/views/CheckClientRuning";
import HomePage from "@/views/Home/HomePage";
import HomeIndex from "@/views/Home/Index";
import ProFile from "@/views/ProFile/ProFile";
import Update from "@/views/System/Update.vue";
import Error from "@/views/Error.vue";
const routes = [
  {
    path: "/",
    name: "CheckClientRuning",
    component: CheckClientRuning,
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
      },
      {
        path: "/home/pro-file",
        name: "ProFile",
        component: ProFile,
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
