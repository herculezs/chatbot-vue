export default {
  data: () => ({
  }),
  // computed: {
  //   isAppLoading: {
  //     get() {
  //       return this.$store.getters['global/getAppLoading'];
  //     },
  //   },
  // },
  methods: {
    _showErrorNotify(text) {
      this.$notify({
        group: 'global',
        type: 'error',
        text,
      });
    },
    _showSuccessNotify(text) {
      this.$notify({
        group: 'global',
        type: 'success',
        text,
      });
    },
    _isUndefined(value) {
      return value === undefined;
    },
    _isNull(value) {
      return value === null;
    },
    _isObject(value) {
      return value === Object(value);
    },
    _isArray(value) {
      return Array.isArray(value);
    },
    _isNumber(value) {
      return value !== null && typeof value.size === 'number';
    },
    _isFunction(value) {
      return value && {}.toString.call(value) === '[object Function]';
    },
    _copyObject(src) {
      const target = {};
      // eslint-disable-next-line
      for (const prop in src) {
        // eslint-disable-next-line
        if (src.hasOwnProperty(prop)) {
          target[prop] = src[prop];
        }
      }
      return target;
    },
    _booleanToNumber(value) {
      if (value) {
        return 1;
      }
      return 0;
    },
  },
};
