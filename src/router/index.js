import Vue from 'vue';
import Router from 'vue-router';
import Store from '../store';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: { name: 'Main' },
    },
    {
      path: '/',
      name: 'Main',
      component: () => import('@views/Main.vue'),
      beforeEnter: (to, from, next) => {
        // eslint-disable-next-line no-underscore-dangle
        const userAuth = Store.getters['auth/getProfile'].token;

        if (userAuth) {
          next('/questions');
          return;
        }

        next();
      },
    },
    {
      path: '/questions',
      name: 'Questions',
      component: () => import('@views/Questions.vue'),
      props: { default: true },
      children: [
        {
          path: 'invitation/:id',
          component: () => import('@views/Questions.vue'),
        },
      ],
      beforeEnter: (to, from, next) => {
        // eslint-disable-next-line no-underscore-dangle
        const userAuth = Store.getters['auth/getProfile'].token;
        const personalityType = Store.getters['auth/getProfile'].selfPersonalityType;

        if (!userAuth) {
          next('/');
          return;
        }
        if (personalityType) {
          next('/report');
          return;
        }

        next();
      },
    },
    // {
    //   path: '/questionsdrag',
    //   name: 'QuestionsDragTest',
    //   component: () => import('@views/QuestionsDragTest.vue'),
    //   // beforeEnter: (to, from, next) => {
    //   //   // eslint-disable-next-line no-underscore-dangle
    //   //   const userAuth = Store.getters['auth/getProfile'].token;
    //   //
    //   //   if (!userAuth) {
    //   //     next('/');
    //   //   }
    //   //
    //   //   next();
    //   // },
    // },
    {
      path: '/report',
      name: 'report',
      component: () => import('@views/Report.vue'),
      beforeEnter: (to, from, next) => {
        // eslint-disable-next-line no-underscore-dangle
        const userAuth = Store.getters['auth/getProfile'].token;

        if (!userAuth) {
          next('/');
        }

        next();
      },
    },
    {
      path: '/personality-type',
      name: 'personality-type',
      component: () => import('@views/PersonalityType.vue'),
      beforeEnter: (to, from, next) => {
        // eslint-disable-next-line no-underscore-dangle
        const userAuth = Store.getters['auth/getProfile'].token;

        if (!userAuth) {
          next('/');
        }

        next();
      },
    },
    {
      path: '/create-password',
      name: 'create-password',
      component: () => import('@views/CreatePassword.vue'),
      beforeEnter: (to, from, next) => {
        // eslint-disable-next-line no-underscore-dangle
        const userAuth = Store.getters['auth/getProfile'].token;

        if (userAuth) {
          next('/questions');
          return;
        }

        next();
      },
    },
    {
      path: '/create-new-password',
      name: 'create-new-password',
      component: () => import('@views/CreateNewPassword.vue'),
      beforeEnter: (to, from, next) => {
        // eslint-disable-next-line no-underscore-dangle
        const userAuth = Store.getters['auth/getProfile'].token;

        if (userAuth) {
          next('/questions');
          return;
        }

        next();
      },
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('@views/ResetPassword.vue'),
      beforeEnter: (to, from, next) => {
        // eslint-disable-next-line no-underscore-dangle
        const userAuth = Store.getters['auth/getProfile'].token;

        if (userAuth) {
          next('/questions');
          return;
        }

        next();
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@views/Login.vue'),
      beforeEnter: (to, from, next) => {
        // eslint-disable-next-line no-underscore-dangle
        const userAuth = Store.getters['auth/getProfile'].token;

        if (userAuth) {
          next('/questions');
        }

        next();
      },
    },
    {
      path: '/enter-security-code',
      name: 'enter-security-code',
      component: () => import('@views/EnterSecurityCode.vue'),
    },
  ],
});
