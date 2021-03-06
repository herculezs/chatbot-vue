import Vue from 'vue';
import Router from 'vue-router';
import isFreeVersion from '@helpers/func';
import checkRole from '@helpers/adminFunction';
import RouterPrefetch from 'vue-router-prefetch';
import Store from '../store';

Vue.use(Router);
Vue.use(RouterPrefetch);

Vue.use(RouterPrefetch, {
  componentName: 'QuickLink',
});


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
      component: () => import('@components/Onboarding/RegistrationPage.vue'),
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

        if (userAuth) {
          next('/');
        }
        next();
      },
    },
    {
      path: '/manage/login',
      name: 'manageLogin',

      component: () => import('@views/managePage/LoginManagePage.vue'),
      beforeEnter: (to, from, next) => {
        const userAuth = Store.getters['auth/getProfile'].token;
        // eslint-disable-next-line no-underscore-dangle

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
        if (!checkRole.isAdmin()) {
          next('/');
          return;
        }

        next();
      },
    },
    {
      path: '/admin/upload-employee',
      name: 'adminUploadEmployee',

      component: () => import('@views/adminViews/AdminUploadEmployee.vue'),
      beforeEnter: (to, from, next) => {
        if (!checkRole.isAdmin()) {
          next('/');
          return;
        }

        next();
      },
    },
    {
      path: '/manage/panel',
      name: 'adminPanel',

      component: () => import('@views/managePage/AdminPanel.vue'),
      beforeEnter: (to, from, next) => {
        if (!checkRole.isAdminAndSuperUserAndSeleniumUser()) {
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

        if (checkRole.isAdmin()) {
          next('/admin/menu');
          return;
        }

        if (checkRole.isSuperUser() || checkRole.isSeleniumUser()) {
          next('/manage/panel');
          return;
        }

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
        if (checkRole.isAdmin()) {
          next('/admin/menu');
          return;
        }

        if (checkRole.isSuperUser() || checkRole.isSeleniumUser()) {
          next('/manage/panel');
          return;
        }

        if (isFreeVersion() && !completedQuestionnaires.includes(process.env.QUESTIONNAIRE_ID)) {
          next();
        } else if (!userAuth) {
          next('/');
        }
        if (!isFreeVersion() && !completedQuestionnaires.includes(process.env.QUESTIONNAIRE_ID)
          && !checkRole.isAdmin()) {
          next('/questionnaire');
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
      path: '/building-credibility-score',
      name: 'building-credibility-score',
      component: () => import('@views/BuildingYourCredibilityScore.vue'),
      beforeEnter: (to, from, next) => {
        // eslint-disable-next-line no-underscore-dangle
        const userAuth = Store.getters['auth/getProfile'].token;
        const { userWithCreditCard, userWithIdentificationCard } = Store.getters['auth/getProfile'];

        if (userAuth && (userWithCreditCard && userWithIdentificationCard)) {
          next('/questionnaire');
        }

        if (!userAuth) {
          next('/');
        }

        if (isFreeVersion()) {
          next('/questionnaire');
        }

        next();
      },
    },
    {
      path: '/building-credibility-score/bank-account',
      name: 'bank-account',
      component: () => import('@views/BankAccountComponent.vue'),
      beforeEnter: (to, from, next) => {
        // eslint-disable-next-line no-underscore-dangle
        const userAuth = Store.getters['auth/getProfile'].token;
        const { userWithCreditCard } = Store.getters['auth/getProfile'];

        if (isFreeVersion()) {
          next('/questionnaire');
        }

        if (userAuth && userWithCreditCard) {
          next('/building-credibility-score');
        }

        if (!userAuth) {
          next('/');
          return;
        }

        next();
      },
    },
    {
      path: '/building-credibility-score/identification-card',
      name: 'identification-card',
      component: () => import('@views/IdentificationCard.vue'),
      beforeEnter: (to, from, next) => {
        // eslint-disable-next-line no-underscore-dangle
        const userAuth = Store.getters['auth/getProfile'].token;
        const { userWithIdentificationCard } = Store.getters['auth/getProfile'];

        if (userAuth && userWithIdentificationCard) {
          next('/building-credibility-score');
        }

        if (isFreeVersion()) {
          next('/questionnaire');
        }

        if (!userAuth) {
          next('/');
          return;
        }

        next();
      },
    },
    {
      path: '/confirm-user-details',
      name: 'confirm-user-details',
      component: () => import('@views/ConfirmUserDetails.vue'),
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
        if (checkRole.isAdminAndSuperUserAndSeleniumUser()) {
          next('/');
        }

        if (!userAuth) {
          next('/');
        }

        next();
      },
    },
  ],
});
