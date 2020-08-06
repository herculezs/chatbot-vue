import Vue from 'vue';
import Router from 'vue-router';
import Store from '../store';

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
    {
      path: '/create-password',
      name: 'create-password',
      component: () => import('@views/CreatePassword.vue'),
    },
    {
      path: '/create-new-password',
      name: 'create-new-password',
      component: () => import('@views/CreateNewPassword.vue'),
      beforeEnter: (to, from, next) => {
        // eslint-disable-next-line no-underscore-dangle
        const isRouter = Store.getters['auth/getRegister']._id;

        if (!isRouter) {
          next('/');
        }

        next();
      },
    },
    {
      path: '/reset-password',
      name: 'create-password',
      component: () => import('@views/ResetPassword.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@views/Login.vue'),
    },
    {
      path: '/enter-security-code',
      name: 'enter-security-code',
      component: () => import('@views/EnterSecurityCode.vue'),
      beforeEnter: (to, from, next) => {
        // eslint-disable-next-line no-underscore-dangle
        const isRouter = Store.getters['auth/getRegister']._id;

        if (!isRouter) {
          next('/');
        }

        next();
      },
    },
  ],
});
