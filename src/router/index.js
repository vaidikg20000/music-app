/* eslint-disable prettier/prettier */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import addSong from "../views/AddSong.vue"
import login from "../views/Login.vue"
import signup from "../views/Signup.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path:"/addSong",
    name:"Add Song",
    component: addSong,
  },
  {
    path:"/login",
    name:"Login",
    component: login,
  },
  {
    path:"/signup",
    name:"Signup",
    component: signup,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
