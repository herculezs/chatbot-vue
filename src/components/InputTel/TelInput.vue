<template>
  <div
    class="form-group"
    :class="{'form-group-error': validPhone.$error}"
  >
    <vue-tel-input
      class="form__input-tel"
      id="telephone_number_main"
      :class="getClassByLengthCountryCode"
      :placeholder="this.placeHolder"
      :enabledCountryCode="enableCountryCode"
      :defaultCountry="defaultCountryCheck"
      :autoDefaultCountry="autoDefaultCountry"
      validCharactersOnly
      @input="changeTel"
      @country-changed="countryChanged"
      v-model="getPhone"
      :ignoredCountries="ignoredCountries"
      @focus="focusInput"
    >
      <template slot="arrow-icon">
              <span class="form__input-tel-arrow-icon">
              </span>
      </template>
    </vue-tel-input>
    <template v-if="validPhone.$error">
      <div
        class="form__input-error"
        v-if="!validPhone.required"
      >
        Field is required
      </div>
      <div
        class="form__input-error"
        v-if="!validPhone.mustBeCodeTheSameCountry"
      >
        Please enter valid phone number
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
    },
    diaCode: {
      type: String,
    },
    validPhone: {
      type: Object,
    },
    placeHolder: {
      type: String,
    },
    defaultCountry: {
      type: String,
    },
    enableCountryCode: {
      type: Boolean,
      default: true,
    },
    autoDefaultCountry: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    document.querySelector('#telephone_number_main .vti__input')
      .setAttribute('id', 'telephone_number');
  },
  computed: {
    defaultCountryCheck() {
      if (this.autoDefaultCountry) {
        return '';
      }
      return this.defaultCountry;
    },
    getClassByLengthCountryCode() {
      if (!this.enableCountryCode) {
        return 'code-length-1';
      }

      if (this.diaCode != null && this.diaCode && this.diaCode !== '') {
        return `code-length-${this.diaCode.length}`;
      }
      return 'code-length-3';
    },
    getPhone: {
      get() {
        return this.value;
      },
      set(newValue) {
        return this.$emit('input', newValue);
      },
    },
    ignoredCountries() {
      return ['EG', 'ID', 'CZ', 'RU', 'JP', 'KE', 'KZ', 'KW',
        'OM', 'PK', 'PH', 'SA', 'TZ', 'AE', 'VN'];
    },
  },
  methods: {
    changeTel(e, isValid) {
      this.$emit('input', isValid.number.input);
      // this.formData.phone = isValid.number.input;
    },
    countryChanged(data) {
      this.$emit('onDiaCode', data);
      // this.diaCode = data.dialCode;
    },
    focusInput() {
      if (!this.enableCountryCode && this.getPhone.length === 0 && this.getPhone === '') {
        this.getPhone = `+${this.diaCode}`;
      }
    },
  },
};
</script>

<style lang="scss">
  .form__input-tel.code-length-1 {
    .vti__input{
      padding-left: 20px;
    }
  }

  .form__input-tel.code-length-3 {
    .vti__input{
      padding-left: 62px;
    }
  }

  .form__input-tel.code-length-4{
    .vti__input{
      padding-left: 65px;
    }
  }
  .vti__dropdown-list {
    display: none !important;
  }
</style>
