<template>
  <div class="reset-password">
    <Content>
      <h1 class="h4 text-center mb-6">Login</h1>
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
            <div
              class="form__input-error"
              v-if="!$v.formData.phone.isPhone"
            >
              The field must contain only numbers
            </div>
          </template>
        </div>
        <div
          class="form-group"
          :class="{'form-group-error': $v.formData.password.$error}"
        >
          <input
            class="form__input"
            placeholder="Password"
            type="password"
            v-model="formData.password"
          />
          <template v-if="$v.formData.password.$error">
            <div
              class="form__input-error"
              v-if="!$v.formData.password.required"
            >
              Field is required
            </div>
          </template>
        </div>
        <div class="form-group form-group_link">
          <router-link to="/reset-password" class="link">Forgot password?</router-link>
        </div>
        <div class="form-group form-group_submit">
          <button
            class="form button button_w-100 button_theme-default button_size-m"
            @click.prevent="login"
          >
            Log in
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

const isPhone = value => /^([+\d].*)?\d$/.test(value);

export default {
  components: {
    Content,
  },
  mixins: [validationMixin],
  validations: {
    formData: {
      phone: {
        required,
        isPhone,
      },
      password: {
        required,
      },
    },
  },
  data: () => ({
    formData: {
      phone: null,
      password: null,
    },
  }),
  computed: {},
  methods: {
    login() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.dispatch('auth/loginRequest', this.formData);
      }
    },
  },
};
</script>

<style lang="scss"></style>
