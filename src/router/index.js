import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Main',
      component: () => import('@views/Main.vue'),
    },
    {
      path: '/questions',
      name: 'Questions',
      component: () => import('@views/Questions.vue'),
    },
    {
      path: '/questionsdrag',
      name: 'QuestionsDrag',
      component: () => import('@views/QuestionsDrag.vue'),
    },
  ],
});
