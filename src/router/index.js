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
      name: 'QuestionsDragTest',
      component: () => import('@views/QuestionsDragTest.vue'),
    },
    {
      path: '/report',
      name: 'report',
      component: () => import('@views/Report.vue'),
    },
    {
      path: '/personality-type',
      name: 'personality-type',
      component: () => import('@views/PersonalityType.vue'),
    },
  ],
});
