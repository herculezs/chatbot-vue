<template>
  <b-modal
    modal-class="modal-sticky-bottom text-center"
    v-model="getModalShow"
    hide-footer
  >
    <h3 class="h5 mb-3">
      Did you find the app gave
      you new insight into your personality?
    </h3>
    <StarRatingReport v-model="formData.rating1" class="mb-5" />
    <h3 class="h5 mb-3">
      How would rate the app overall?
    </h3>
    <StarRatingReport v-model="formData.rating2" class="mb-5" />
    <h3 class="h5 mb-3">
      Thanks you!  Let us know what
      we can do to be even better or if you would like us to contact you?
    </h3>
    <textarea
      class="form__input mb-3"
      placeholder="Your messsage"
      v-model="formData.message"
    />
    <button
      class="button button_w-100 button_theme-default button_size-m"
      @click="sendFeedBack"
    >
      Send
    </button>
  </b-modal>
</template>

<script>
import StarRatingReport from '@components/StarRating/StarRatingReport.vue';

export default {
  components: {
    StarRatingReport,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getModalShow: {
      // eslint-disable-next-line
      get: function () {
        return this.value;
      },
      // eslint-disable-next-line
      set: function (newValue) {
        this.$emit('input', newValue);
      },
    },
  },
  data: () => ({
    formData: {
      message: '',
      rating1: 2,
      rating2: 1,
    },
  }),
  methods: {
    sendFeedBack() {
      console.log(this.formData);
    },
  },
};
</script>
