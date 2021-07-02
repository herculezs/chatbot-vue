<template>
  <div>
    <h1 class="h4 text-center mb-3">Enter security code</h1>
    <div class="text text-center mb-4">
      Please check your phone for SMS with your security code
    </div>
    <form class="form">
      <div
        class="form-group input_enter_code"
        :class="{'form-group-error': $v.code.$error}"
      >
        <input
          class="form__input"
          placeholder="Enter code"
          v-model="code"
        />
        <template v-if="$v.code.$error">
          <div
            class="form__input-error"
            v-if="!$v.code.required"
          >
            Field is required
          </div>
        </template>
      </div>
      <div class="form-group form-group_submit">
        <button
          class="form button button_w-100 button_theme-default button_size-m"
          @click.prevent="submit"
        >
          Continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';

const { required } = require('vuelidate/lib/validators');

export default {
  name: 'PhoneNumberConfirmation',
  mixins: [validationMixin],
  props: {
    objectRequest: {
      types: Object,
    },
  },
  validations: {
    code: {
      required,
    },
  },
  data: () => ({
    code: null,
  }),
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.objectRequest.smsCode = this.code;
        this.$api.auth.updateUserDetails(this.objectRequest).then(() => {
          this.$router.push({ path: '/login' });
        });
      }
    },
  },
};
</script>

<style scoped>

</style>
