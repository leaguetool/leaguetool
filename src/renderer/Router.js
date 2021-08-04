import { createRouter, createWebHashHistory } from "vue-router";

import CheckClientRuning from "./views/CheckClientRuning";
import HomePage from "./views/Home/HomePage";
import ProFile from "./views/ProFile/ProFile";
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
    children: [
      {
        path: "/home/pro-file",
        name: "ProFile",
        component: ProFile,
      }
    ]
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
