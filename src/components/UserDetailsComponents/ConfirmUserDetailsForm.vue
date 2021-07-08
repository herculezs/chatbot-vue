<template>
  <div class="change-details-form">
    <div v-if="!showChangeData">
      <h1 class="h4 text-center mb-6">Confirm the following</h1>
      <form class="form">
        <div
          class="form-group"
          :class="{'form-group-error': $v.formData.previousPhoneNumber.$error}"
        >

          <input
            class="form__input"
            placeholder="Previous phone number (inc Country Code)"
            type="text"
            v-model="formData.previousPhoneNumber"
            :disabled="showInputQuestion"
          />
          <template v-if="$v.formData.previousPhoneNumber.$error">
            <div
              class="form__input-error"
              v-if="!$v.formData.previousPhoneNumber.required"
            >
              Field is required
            </div>
          </template>
        </div>
        <div
          class="form-group"
          :class="{'form-group-error': $v.formData.email.$error}"
        >
          <input
            class="form__input"
            placeholder="Email"
            type="text"
            v-model="formData.email"
            :disabled="showInputQuestion"
          />
          <template v-if="$v.formData.email.$error">
            <div
              class="form__input-error"
              v-if="!$v.formData.email.required"
            >
              Field is required
            </div>
          </template>
        </div>
        <div
          class="form-group"
          :class="{'form-group-error': $v.formData.firstNameAndLastName.$error}"
        >
          <input
            class="form__input"
            placeholder="First name Last name"
            type="text"
            v-model="formData.firstNameAndLastName"
            :disabled="showInputQuestion"
          />
          <template v-if="$v.formData.firstNameAndLastName.$error">
            <div
              class="form__input-error"
              v-if="!$v.formData.firstNameAndLastName.required"
            >
              Field is required
            </div>
          </template>
        </div>
        <div v-if="showInputQuestion"
             class="form-group"
             :class="{'form-group-error': $v.userSecretAnswer.$error}"
        >
          <input
            class="form__input"
            :placeholder="labelSecretQuestion"
            type="text"
            v-model="userSecretAnswer"
            maxlength="25"
          />
          <template v-if="$v.userSecretAnswer.$error">
            <div
              class="form__input-error"
              v-if="!$v.userSecretAnswer.required"
            >
              Field is required
            </div>
          </template>
        </div>
        <div v-if="showInputQuestion" class="form-group form-group_submit">
          <button
            class="button button_w-100 button_theme-default button_size-m"
            @click.prevent="confirmSecretAnswer"
          >
            Confirm Secret Answer
          </button>
        </div>
        <div v-else class="form-group form-group_submit">
          <button
            class="button button_w-100 button_theme-default button_size-m"
            @click.prevent="confirmData"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
    <ChangeUserDetailsForm v-else :old-phone-number="formData.previousPhoneNumber">
    </ChangeUserDetailsForm>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import secretQuestions from '@constants/secretQuestions';
import ChangeUserDetailsForm from '@components/UserDetailsComponents/ChangeUserDetailsForm.vue';

const mustBeCool = (emailValid) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(emailValid).toLowerCase());
};

const { required } = require('vuelidate/lib/validators');

export default {
  name: 'ConfirmUserDetailsForm',
  mixins: [validationMixin],
  components: {
    ChangeUserDetailsForm,
  },
  validations: {
    formData: {
      previousPhoneNumber: {
        required,
      },
      email: {
        required,
        mustBeCool,
      },
      firstNameAndLastName: {
        required,
      },
    },
    userSecretAnswer: {
      required,
    },
  },
  watch: {
    userSecretAnswer() {
      this.userSecretAnswer = this.userSecretAnswer.replace(/\s+/gi, '');
    },
  },
  data: () => ({
    showInputQuestion: false,
    formData: {
      previousPhoneNumber: null,
      email: null,
      firstNameAndLastName: null,
    },
    secretAnswerId: null,
    userSecretAnswer: null,
    labelSecretQuestion: null,
    showChangeData: false,
  }),
  methods: {
    confirmData() {
      this.$v.formData.$touch();
      if (!this.$v.formData.$invalid) {
        const data = {
          firstName: this.formData.firstNameAndLastName.split(' ')[0],
          lastName: this.formData.firstNameAndLastName.split(' ')[1],
          previousPhone: this.formData.previousPhoneNumber,
          email: this.formData.email,
        };

        this.$api.auth.confirmDataForChangeDetails(data).then((res) => {
          this.showInputQuestion = true;
          this.secretAnswerId = res;
          this.labelSecretQuestion = secretQuestions[res].question;
        });
      }
    },
    confirmSecretAnswer() {
      this.$v.userSecretAnswer.$touch();
      if (!this.$v.userSecretAnswer.$invalid) {
        const data = {
          previousPhone: this.formData.previousPhoneNumber,
          secretAnswer: this.userSecretAnswer,
        };

        this.$api.auth.confirmSecretAnswer(data).then(() => {
          this.showChangeData = true;
          console.log(this.showChangeData);
        });
      }
    },
  },
};
</script>

<style lang="scss">
  .change-details-form input {
    background-color: white;
  }
</style>
