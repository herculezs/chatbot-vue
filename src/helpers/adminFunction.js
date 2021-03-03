import Store from '../store';

const checkRole = {
  isAdmin() {
    const userAuth = Store.getters['auth/getProfile'].token;
    const userRole = Store.getters['auth/getProfile'].roles;
    return !!(userAuth && (userRole.includes('ADMIN_USER') || userRole.includes('SUPER_USER')));
  },
};

export default checkRole;
