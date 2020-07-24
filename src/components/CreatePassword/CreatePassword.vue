<template>
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
      </template>
    </div>
    <div
      class="form-group"
      :class="{'form-group-error': $v.formData.confirm_password.$error}"
    >
      <input
        class="form__input"
        placeholder="Confirm password"
        v-model="formData.confirm_password"
      />
      <template v-if="$v.formData.confirm_password.$error">
        <div
          class="form__input-error"
          v-if="!$v.formData.confirm_password.required"
        >
          Field is required
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
</template>

<script>
import { validationMixin } from 'vuelidate';

const { required } = require('vuelidate/lib/validators');

export default {
  components: {},
  name: 'CreatePassword',
  mixins: [validationMixin],
  validations: {
    formData: {
      password: {
        required,
      },
      confirm_password: {
        required,
      },
    },
  },
  data: () => ({
    formData: {
      password: null,
      confirm_password: null,
    },
  }),
  computed: {},
  methods: {
    changePassword() {
      this.$v.$touch();
      if (!this.$v.$invalid) this.$emit('submit');
    },
  },
};
</script>
