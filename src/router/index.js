import {
  createRouter,
  createWebHistory
} from 'vue-router'

import Home from '@/views/HomeView.vue';
import About from '@/views/AboutView.vue';
import Manage from '@/views/ManageView.vue';
import useUserStore from '@/stores/user';

const routes = [{
  name: 'home',
  path: "/",
  component: Home,
},
{
  name: 'about',
  path: "/about",
  component: About,
  },
  {
    name: 'manage',
    // alias: '/manage',
    path: "/manage-music",
    component: Manage,
    beforeEnter: (to, from, next) => {
      console.log('Manage Route Guard');
      next();
    },
    meta: {
      //Basically attaches this requiresAuth field to the page when accessed
      requiresAuth: true,
    },
  },
  {
    path: "/manage",
    redirect: { name: "manage" }
  },

  {
    path: "/:catchAll(.*)*",
    redirect: { name: 'home' }
  }

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500',
})

router.beforeEach((to, from, next) => {
  console.log("Global Guard");
  //if the route doesnt require authentication then just go to it
  if (!to.meta.requiresAuth) {
    next();
    return;
  }
  const userStore = useUserStore()

  //if authentication is required and the user is logged in(authenticated) then go next, otherwise redirect
  //for example in this case, if we try to type /manage into our route, it will not work and redirect to home,otherwise go to the manage page.
  if (userStore.userLoggedIn) {
    next();
  } else {
    next({ name: 'home' })
  }

  // console.log(to, from);
});

export default router
