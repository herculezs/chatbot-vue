<template>
  <div class="form__input-copy">
    <input
      class="form__input form__input-copy"
      placeholder="Link"
      v-model="getValue"
      type="text"
    />
    <button class="form__button-copy" type="button" @click="copyInputData">
      <img src="../../assets/copy-icon.svg" alt="copy-icon"/>
    </button>
  </div>
</template>

<script>
import copy from 'copy-to-clipboard';
import { mapGetters } from 'vuex';
import configEnv from '@configEnv';

export default {
  props: {
    value: {
      type: String,
    },
  },
  data: () => ({
    configEnv,
  }),
  computed: {
    ...mapGetters({
      getProfile: 'auth/getProfile',
    }),
    getValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);
      },
    },
  },
  methods: {
    changeName(text) {
      return text.replace(/{{firstName}}/g, this.getProfile.name).replace(/{{secondName}}/g,
        this.getProfile.lastName);
    },
    copyInputData() {
      const resultCopyText = `${configEnv.inputCopy.copyText}${this.value}${configEnv.inputCopy.copyText2}`;

      copy(this.changeName(resultCopyText));
      this.$notify({
        type: 'success',
        title: 'Link copied',
      });
    },
  },
};
</script>

<style lang="scss">
  .form__input-copy{
    .form__input{
      padding-right: 83px;
    }
  }
</style>
