import Vue from 'vue';
import Router from 'vue-router';
import isFreeVersion from '@helpers/func';
import checkRole from '@helpers/adminFunction';
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

        if (isFreeVersion() && !userAuth) {
          next();
        } else if (userAuth) {
          next('/questionnaire');
          return;
        }

        next();
      },
    },
    {
      path: '/registration',
      name: 'registration',
      props: true,
      component: () => import('@components/Onboarding/RegistrationPage'),
      beforeEnter: (to, from, next) => {
        // eslint-disable-next-line no-underscore-dangle
        const userAuth = Store.getters['auth/getProfile'].token;

        if (userAuth || !isFreeVersion()) {
          next('/');
        }
        next();
      },
    },
    {
      path: '/admin/login',
      name: 'adminLogin',
      component: () => import('@views/adminViews/LoginAdminPage.vue'),
      beforeEnter: (to, from, next) => {
        const userAuth = Store.getters['auth/getProfile'].token;
        // eslint-disable-next-line no-underscore-dangle
        // isFreeVersion() ||
        if (userAuth) {
          next('/');
        }
        next();
      },
    },
    {
      path: '/admin/dashboard',
      name: 'adminDashboard',
      component: () => import('@views/adminViews/AdminDashboard.vue'),
      beforeEnter: (to, from, next) => {
        // if (isFreeVersion()) {
        //   next('/');
        // }

        if (!checkRole.isAdmin()) {
          next('/');
          return;
        }

        next();
      },
    },
    {
      path: '/admin/test-dashboard',
      name: 'adminTestDashboard',
      component: () => import('@views/adminViews/AdminTestDashboard.vue'),
      beforeEnter: (to, from, next) => {
        // if (isFreeVersion()) {
        //   next('/');
        // }

        if (!checkRole.isAdmin()) {
          next('/');
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

        if (isFreeVersion() && !completedQuestionnaires.includes(process.env.QUESTIONNAIRE_ID)) {
          next();
        } else {
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
        }

        next();
      },
    },
    {
      path: '/admin/menu',
      name: 'adminMenu',
      component: () => import('@views/adminViews/AdminMenu.vue'),
      beforeEnter: (to, from, next) => {
        // eslint-disable-next-line no-underscore-dangle
        // if (isFreeVersion()) {
        //   next('/');
        // }
        if (checkRole.isAdmin()) {
          next();
          return;
        }
        if (!checkRole.isAdmin()) {
          next('/');
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
        const { completedQuestionnaires = [] } = Store.getters['auth/getProfile'];
        if (isFreeVersion() && !completedQuestionnaires.includes(process.env.QUESTIONNAIRE_ID)) {
          next();
        } else if (!userAuth) {
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
