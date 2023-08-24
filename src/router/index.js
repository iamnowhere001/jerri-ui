import Vue from 'vue';
import VueRouter from 'vue-router';
import viewRoutes from "../views";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [{
    path: '/',
    redirect: '/homeView',
  },
  {
    path: "/homeView",
    name: "home",
    component: () => import('../views/home/homeView.vue')
  },
  ...viewRoutes
  ]
})

export default router
