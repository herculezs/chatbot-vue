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
      redirect: { name: 'main' },
    },
    {
      path: '/',
      name: 'main',
      component: () => import('@views/Main.vue'),
      beforeEnter: (to, from, next) => {
        // eslint-disable-next-line no-underscore-dangle
        const userAuth = Store.getters['auth/getProfile'].token;

        if (userAuth) {
          next('/questionnaire');
          return;
        }

        next();
      },
    },
    {
      path: '/questionnaire',
      name: 'questionnaire',
      component: () => import('@views/Questions.vue'),
      children: [
        {
          path: `invitation/${process.env.QUESTIONNAIRE_ID}/u2/:id`,
          meta: { invitationType: process.env.QUESTIONNAIRE_ID },
          component: () => import('@views/Questions.vue'),
        },
      ],
      beforeEnter: (to, from, next) => {
        // eslint-disable-next-line no-underscore-dangle
        const userAuth = Store.getters['auth/getProfile'].token;
        const { completedQuestionnaires = [] } = Store.getters['auth/getProfile'];

        if (to.params.id) {
          next();
          return;
        }

        if (!userAuth) {
          next('/');
          return;
        }

        if (completedQuestionnaires.includes(process.env.QUESTIONNAIRE_ID)) {
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
      path: '/invintation-report/:userId',
      name: 'invintation-report',
      props: true,
      component: () => import('@views/InvintationReport.vue'),
      beforeEnter: (to, from, next) => {
        // eslint-disable-next-line no-underscore-dangle
        const userAuth = Store.getters['auth/getProfile'].token;
        const invitation = Store.getters['invitation/getPersonalityTest'].result;
        let invitationManager;
        if (Store.getters['invitation/getPersonalityTestForManager']) {
          invitationManager = Store.getters['invitation/getPersonalityTestForManager'];
        }

        if (!invitationManager && (invitation !== undefined)) {
          next('/');
        }

        if (!userAuth) {
          next('/');
        }

        next();
      },
    },
    // {
    //   path: '/personality-type',
    //   name: 'personality-type',
    //   component: () => import('@views/PersonalityType.vue'),
    //   beforeEnter: (to, from, next) => {
    //     // eslint-disable-next-line no-underscore-dangle
    //     const userAuth = Store.getters['auth/getProfile'].token;
    //
    //     if (!userAuth) {
    //       next('/');
    //     }
    //
    //     next();
    //   },
    // },
    {
      path: '/create-password',
      name: 'create-password',
      component: () => import('@views/CreatePassword.vue'),
      beforeEnter: (to, from, next) => {
        // eslint-disable-next-line no-underscore-dangle
        const userAuth = Store.getters['auth/getProfile'].token;

        if (userAuth) {
          next('/questionnaire');
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
          next('/questionnaire');
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
          next('/questionnaire');
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
          next('/questionnaire');
        }

        next();
      },
    },
    {
      path: '/enter-security-code',
      name: 'enter-security-code',
      component: () => import('@views/EnterSecurityCode.vue'),
      beforeEnter: (to, from, next) => {
        // eslint-disable-next-line no-underscore-dangle
        const userAuth = Store.getters['auth/getProfile'].token;

        if (userAuth) {
          next('/questionnaire');
          return;
        }

        next();
      },
    },
    {
      path: '/questionnaire-management',
      name: 'questionnaire-management',
      component: () => import('@views/QuestionnaireManagement.vue'),
      beforeEnter: (to, from, next) => {
        // eslint-disable-next-line no-underscore-dangle
        const userAuth = Store.getters['auth/getProfile'].token;

        if (!userAuth) {
          next('/');
        }

        next();
      },
    },
  ],
});
