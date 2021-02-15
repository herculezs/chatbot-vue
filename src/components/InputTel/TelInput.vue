<template>
  <div
    class="form-group"
    :class="{'form-group-error': validPhone.$error}"
  >
    <vue-tel-input
      class="form__input-tel"
      :class="getClassByLengthCountryCode"
      :defaultCountry="this.defaultCountry"
      :placeholder="this.placeHolder"
      enabledCountryCode
      validCharactersOnly
      @input="changeTel"
      @country-changed="countryChanged"
      v-model="getPhone"
      :ignoredCountries="ignoredCountries"
    >
      <template slot="arrow-icon">
              <span class="form__input-tel-arrow-icon">
                ⌄
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
  },
  computed: {
    getClassByLengthCountryCode() {
      return `code-length-${this.diaCode.length}`;
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
  },
};
</script>

<style lang="scss">
  .form__input-tel.code-length-3 {
    .vti__input{
      padding-left: 62px;
    }
  }

  .form__input-tel.code-length-4{
    .vti__input{
      padding-left: 50px;
    }
  }
</style>
