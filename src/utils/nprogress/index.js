import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const nprogress = NProgress.configure({
  showSpinner: false,
});

export default {
  start: () => {
    nprogress.start();
    // store.dispatch('loading/setAppLoading', true)
  },
  done: () => {
    nprogress.done();
    // store.dispatch('loading/setAppLoading', false)
  },
};
