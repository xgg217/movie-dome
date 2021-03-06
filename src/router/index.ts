import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const Index = () => import("/@/views/Index/Index.vue");

const routes:RouteRecordRaw[] = [
  {
    path: "/",
    redirect: '/home/index'
  },
  {
    path: "/home",
    component: () => import("/@/views/Home.vue"),
    children: [
      {
        path: "",
        redirect: '/home/index'
      }, {
        path: "index",
        component: Index
      }, {
        path: "category",
        component: () => import("/@/views/Category/Index.vue")
      }, {
        path: "rank",
        component: () => import("/@/views/Rank/Index.vue")
      }, {
        path: "search",
        component: () => import("/@/views/Search/Index.vue")
      },
    ]
  }, {
    path: "/login",
    component: () => import("/@/views/Login.vue")
  }, {
    path: "/movie/:id",
    component: () => import("/@/views/Movie/Index.vue")
  }, {
    path: "/list/:index",
    component: () => import("/@/views/List/Index.vue")
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
})