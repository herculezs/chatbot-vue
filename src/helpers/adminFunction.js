import Store from '../store';

const checkRole = {
  isSeleniumUser() {
    const userAuth = Store.getters['auth/getProfile'].token;
    const userRole = Store.getters['auth/getProfile'].roles;
    return !!(userAuth && userRole.includes('SELENIUM_USER'));
  },
  isAdmin() {
    const userAuth = Store.getters['auth/getProfile'].token;
    const userRole = Store.getters['auth/getProfile'].roles;
    return !!(userAuth && (userRole.includes('ADMIN_USER')));
  },
  isSuperUser() {
    const userAuth = Store.getters['auth/getProfile'].token;
    const userRole = Store.getters['auth/getProfile'].roles;
    return !!(userAuth && (userRole.includes('SUPER_USER')));
  },
  isAdminAndSuperUser() {
    const userAuth = Store.getters['auth/getProfile'].token;
    const userRole = Store.getters['auth/getProfile'].roles;
    return !!(userAuth && (userRole.includes('ADMIN_USER') || userRole.includes('SUPER_USER')));
  },
  isAdminAndSuperUserAndSeleniumUser() {
    const userAuth = Store.getters['auth/getProfile'].token;
    const userRole = Store.getters['auth/getProfile'].roles;
    return !!(userAuth && (userRole.includes('ADMIN_USER') || userRole.includes('SUPER_USER')
      || userRole.includes('SELENIUM_USER')));
  },
};

export default checkRole;
