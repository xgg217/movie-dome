import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const Index = () => import("./../views/Index.vue");

const routes:RouteRecordRaw[] = [
  {
    path: "/",
    component: Index
  }, {
    path: "/home",
    component: () => import("./../views/Home.vue"),
    children: [
      {
        path: "",
        component: Index
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
  },  {
    path: "/login",
    component: () => import("./../views/Login.vue")
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
})