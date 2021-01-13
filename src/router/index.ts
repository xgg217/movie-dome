import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const Index = () => import("./../views/Index/Index.vue");

const routes:RouteRecordRaw[] = [
  {
    path: "/",
    redirect: '/home/index'
  }, {
    path: "/home",
    component: () => import("./../views/Home.vue"),
    children: [
      {
        path: "",
        redirect: '/home/index'
      }, {
        path: "index",
        component: Index
      }, {
        path: "category",
        component: () => import("./../views/Category.vue")
      }, {
        path: "rank",
        component: () => import("./../views/Rank.vue")
      }, {
        path: "search",
        component: () => import("./../views/Search.vue")
      },
    ]
  }, {
    path: "/login",
    component: () => import("./../views/Login.vue")
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
})