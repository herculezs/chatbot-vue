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
      :class="{'form-group-error': $v.formData.code.$error}"
    >
      <input
        class="form__input"
        placeholder="Confirm password"
        type="password"
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
      code: {
        required,
      },
    },
  },
  data: () => ({
    formData: {
      password: null,
      code: null,
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
