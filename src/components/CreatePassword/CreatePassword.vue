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
      <div
        class="form-group"
        :class="{'form-group-error': $v.formData.selectSecretQuestion.$error}"
      >
        <v-select
          hide-details
          id="select"
          class="form-group"
          :items="questions"
          v-model="formData.selectSecretQuestion"
          label="Choose a Question"
          background-color="#ffffff"
          solo
          ref="select"
          item-text="question"
          item-value="id"
          return-object
        ></v-select>

        <template v-if="$v.formData.selectSecretQuestion.$error">
          <div
            class="form__input-error"
            v-if="!$v.formData.selectSecretQuestion.required"
          >
            Choose please secret question
          </div>
        </template>
      </div>
      <div
        class="form-group"
        :class="{'form-group-error': $v.formData.secretAnswer.$error}"
      >
        <input
          class="form__input"
          placeholder="Secret Answer - entered as AllOneWord"
          type="text"
          v-model="formData.secretAnswer"
          maxlength="25"
        />
        <template v-if="$v.formData.secretAnswer.$error">
          <div
            class="form__input-error"
            v-if="!$v.formData.secretAnswer.required"
          >
            Fill this field please
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
import secretQuestions from '@constants/secretQuestions';

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
      secretAnswer: {
        required,
      },
      selectSecretQuestion: {
        required,
      },
    },
  },
  data: () => ({
    questions: secretQuestions,
    formData: {
      password: null,
      repeatPassword: null,
      secretAnswer: null,
      selectSecretQuestion: null,
    },
  }),
  watch: {
    formData: {
      // eslint-disable-next-line no-unused-vars
      handler() {
        if (this.formData.secretAnswer) {
          this.formData.secretAnswer = this.formData.secretAnswer.replace(/\s+/gi, '');
        }
      },
      deep: true,
    },
  },
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
  .questions-secret-list {
    height: 50px !important;
  }

  .password-input .form__input {
    background-color: white;
  }

  .password-input .v-input__slot {
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    border: 1px solid #ddd !important;

  }

  .password-input .v-select__slot > label {
    padding-left: 10px;
  }
  .password-input #select {
    padding-left: 10px;
    color: #A89C99;
  }

  .password-input .v-select__selections {
    margin-left: 10px;
    color: #A89C99;
  }
</style>
