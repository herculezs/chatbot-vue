<template>
  <div class="reset-password">
    <Content>
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
        <div class="form-group form-group_submit">
          <button
            class="button button_w-100 button_theme-default button_size-m"
            @click.prevent="resetPassword"
          >
            Continue
          </button>
        </div>
      </form>
    </Content>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import Content from '@components/Content/Content.vue';

const { required } = require('vuelidate/lib/validators');

export default {
  components: {
    Content,
  },
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
      if (!this.$v.$invalid) {
        this.$store.dispatch('auth/resetPasswordRequest', this.formData).then(() => {
          this.$router.push('enter-security-code');
        });
      }
    },
  },
};
</script>

<style lang="scss"></style>
