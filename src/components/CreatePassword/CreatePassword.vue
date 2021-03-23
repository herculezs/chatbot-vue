<template>
  <div class="password-input">
    <form class="form">
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
          <div
            class="form__input-error"
            v-if="!$v.formData.password.minLength"
          >
            Password must have at least {{ $v.formData.password.$params.minLength.min }} letters
          </div>
        </template>
      </div>
      <div
        class="form-group"
        :class="{'form-group-error': $v.formData.repeatPassword.$error}"
      >
        <input
          class="form__input"
          placeholder="Confirm password"
          type="password"
          v-model="formData.repeatPassword"
        />
        <template v-if="$v.formData.repeatPassword.$error">
          <div
            class="form__input-error"
            v-if="!$v.formData.repeatPassword.sameAsPassword"
          >
            Passwords must be identical
          </div>
        </template>
      </div>
      <div class="form-group form-group_submit">
        <button
          class="button button_w-100 button_theme-default button_size-m"
          @click.prevent="changePassword"
        >
          Create
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';

const { required, sameAs, minLength } = require('vuelidate/lib/validators');

export default {
  components: {},
  name: 'CreatePassword',
  mixins: [validationMixin],
  validations: {
    formData: {
      password: {
        required,
        minLength: minLength(4),
      },
      repeatPassword: {
        sameAsPassword: sameAs('password'),
      },
    },
  },
  data: () => ({
    formData: {
      password: null,
      repeatPassword: null,
    },
  }),
  computed: {},
  methods: {
    changePassword() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit('submit', this.formData);
      }
    },
  },
};
</script>

<style lang="scss">
  .password-input input {
    background-color: white;
  }
</style>
