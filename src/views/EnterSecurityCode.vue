<template>
  <div class="enter-security-code">
    <Content>
      <h1 class="h4 text-center mb-3">Enter security code</h1>
      <div class="text text-center mb-4">
        Please check your phone for SMS with your security code
      </div>
      <form class="form">
        <div
          class="form-group"
          :class="{'form-group-error': $v.formData.code.$error}"
        >
          <input
            class="form__input"
            placeholder="Enter code"
            v-model="formData.code"
          />
          <template v-if="$v.formData.code.$error">
            <div
              class="form__input-error"
              v-if="!$v.formData.code.required"
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
    </Content>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { mapGetters } from 'vuex';
import Content from '@components/Content/Content.vue';

const { required } = require('vuelidate/lib/validators');

export default {
  components: {
    Content,
  },
  mixins: [validationMixin],
  validations: {
    formData: {
      code: {
        required,
      },
    },
  },
  data: () => ({
    formData: {
      code: null,
    },
  }),
  computed: {
    ...mapGetters({
      getProfile: 'auth/getProfile',
    }),
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        // eslint-disable-next-line no-underscore-dangle
        this.$api.auth.validateCode(this.formData, this.getProfile.id).then(() => {
          this.$router.push('create-new-password');
        });
      }
    },
  },
};
</script>

<style lang="scss"></style>
