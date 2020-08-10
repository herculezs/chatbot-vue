<template>
  <div class="reset-password">
    <Content>
      <h1 class="h4 text-center mb-6">Login</h1>
      <form class="form">
<!--        <div-->
<!--          class="form-group"-->
<!--          :class="{'form-group-error': $v.formData.phone.$error}"-->
<!--        >-->
<!--          <input-->
<!--            class="form__input"-->
<!--            placeholder="Phone number"-->
<!--            v-model="formData.phone"-->
<!--          />-->
<!--          <template v-if="$v.formData.phone.$error">-->
<!--            <div-->
<!--              class="form__input-error"-->
<!--              v-if="!$v.formData.phone.required"-->
<!--            >-->
<!--              Field is required-->
<!--            </div>-->
<!--            <div-->
<!--              class="form__input-error"-->
<!--              v-if="!$v.formData.phone.isPhone"-->
<!--            >-->
<!--              The field must contain only numbers-->
<!--            </div>-->
<!--          </template>-->
<!--        </div>-->

        <div
          class="form-group"
          :class="{'form-group-error': $v.formData.phone.$error}"
        >
          <vue-tel-input
            class="form__input-tel"
            :class="getClassByLengthCountryCode"
            defaultCountry="GB"
            placeholder="65 243 236"
            enabledCountryCode
            validCharactersOnly
            @input="changeTel"
            @country-changed="countryChanged"
            v-model="formData.phone"
          >
            <template slot="arrow-icon">
              <span class="form__input-tel-arrow-icon">
                ⌄
              </span>
            </template>
          </vue-tel-input>
          <template v-if="$v.formData.phone.$error">
            <div
              class="form__input-error"
              v-if="!$v.formData.phone.required"
            >
              Field is required
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

// const isPhone = value => /^([+\d].*)?\d$/.test(value);

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
    diaCode: '',
  }),
  computed: {
    getClassByLengthCountryCode() {
      return `code-length-${this.diaCode.length}`;
    },
  },
  methods: {
    prepareDataForRequest() {
      const phone = `+${this.diaCode}${this.formData.phone}`
        .replace(/\s/g, '');

      return {
        name: this.formData.name,
        phone,
      };
    },
    changeTel(e, isValid) {
      this.formData.phone = isValid.number.input;
    },
    countryChanged(data) {
      this.diaCode = data.dialCode;
    },
    login() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const data = this.prepareDataForRequest();
        this.$store.dispatch('auth/loginRequest', data).then(() => {
          this.$router.push('questions');
        });
      }
    },
  },
};
</script>

<style lang="scss">
  .form__input-tel.code-length-3{
    .vti__input{
      padding-left: 62px;
    }
  }

  .form__input-tel.code-length-4{
    .vti__input{
      padding-left: 67px;
    }
  }
</style>
