<template>
  <b-modal
    modal-class="text-center"
    v-model="getModalShow"
    hide-footer
    no-close-on-backdrop
    hide-header-close
  >
    <h3 class="h5 mb-3">
      {{ formData.question1.question }}
    </h3>
    <StarRatingReport v-model="formData.question1.value" class="mb-5" />
    <h3 class="h5 mb-3">
      {{ formData.question2.question }}
    </h3>
    <StarRatingReport v-model="formData.question2.value" class="mb-5" />
    <h3 class="h5 mb-3">
      {{ formData.question3.question }}
    </h3>
    <textarea
      class="form__input mb-3"
      placeholder="What would you like to tell us?"
      v-model="formData.question3.value"
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
import { mapGetters } from 'vuex';

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
  data: () => ({
    formData: {
      question1: {
        type: 'rating',
        question: 'How would rate the INSIGHT into your personality the app gave you?',
        value: 0,
      },
      question2: {
        type: 'rating',
        question: 'How would you rate the ENJOYABILITY of the app?',
        value: 0,
      },
      question3: {
        type: 'textarea',
        question: 'What can we do to improve?',
        value: '',
      },
    },
  }),
  computed: {
    ...mapGetters({
      getProfile: 'auth/getProfile',
    }),
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
  watch: {
    'formData.question2.value': {
      handler() {
        this.formData.question3.question = this.getQuestionsByRating();
      },
    },
    'formData.question1.value': {
      handler() {
        this.formData.question3.question = this.getQuestionsByRating();
      },
    },
  },
  methods: {
    getQuestionsByRating() {
      const questionRating1 = this.formData.question1.value;
      const questionRation2 = this.formData.question2.value;
      const avgRating = (questionRating1 + questionRation2) / 2;

      let result = '';

      switch (true) {
        case (avgRating <= 3):
          result = 'What can we do to improve?';
          break;
        case (avgRating >= 3.5 && avgRating <= 4):
          result = 'What was the reason for your score?';
          break;
        case (avgRating > 4):
          result = 'Thank you! Let us know what we can do to be even better. '
            + 'We can contact you or you can use the in-app chat below to talk to us';
          break;
        default:
          result = 'What can we do to improve?';
          break;
      }

      return result;
    },
    objIsEmpty(data) {
      let isEmpty = true;

      // eslint-disable-next-line array-callback-return,consistent-return
      Object.values(data).some((item) => {
        if (item.value) {
          isEmpty = false;
          return true;
        }
      });

      return isEmpty;
    },
    prepareDatForRequest() {
      return {
        feedbackId: process.env.FEEDBACK_ID,
        U1: this.getProfile.name,
        items: Object.values(this.formData).map((item, index) => ({
          id: index + 1,
          question: item.question,
          answer: item.value,
        })),
      };
    },
    sendFeedBack() {
      const isEmptyForm = this.objIsEmpty(this.formData);

      if (isEmptyForm) {
        this._showErrorNotify('Rating is empty');
        return;
      }

      const data = this.prepareDatForRequest();
      this.$store.dispatch('auth/setCompletedFeedbackRequest', data);
      this.getModalShow = false;
    },
  },
};
</script>
