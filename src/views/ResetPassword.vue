<template>
  <div class="reset-password">
    <h1 class="h4 text-center mb-6">Reset your password</h1>
    <form class="form">
      <div
        class="form-group"
        :class="{'form-group-error': $v.formData.phone.$error}"
      >
        <input
          class="form__input"
          placeholder="Phone number"
          v-model="formData.phone"
        />
        <template v-if="$v.formData.phone.$error">
          <div
            class="form__input-error"
            v-if="!$v.formData.phone.required"
          >
            Field is required
          </div>
        </template>
      </div>

      <button
        class="button button_w-100 button_theme-default button_size-m slide-details__button"
        @click.prevent="resetPassword"
      >
        Continue
      </button>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';

const { required } = require('vuelidate/lib/validators');

export default {
  components: {},
  mixins: [validationMixin],
  validations: {
    formData: {
      phone: {
        required,
      },
    },
  },
  data: () => ({
    formData: {
      phone: null,
    },
  }),
  computed: {},
  methods: {
    resetPassword() {
      this.$v.$touch();
      if (!this.$v.$invalid) console.log('some api');
    },
  },
};
</script>

<style lang="scss"></style>
