<template>
  <div class="form__input-copy">
    <input
      class="form__input form__input-copy"
      placeholder="Link"
      v-model="getValue"
      type="text"
    />
    <button class="form__button-copy" type="button" @click="copyInputData">
      <svg width="24px" height="24px" viewBox="0 0 24 24"
           version="1.1"
           xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="Wireframes" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="report---share-modal" transform="translate(-307.000000, -623.000000)">
            <g id="input-copy" transform="translate(24.000000, 603.000000)">
              <g id="icon-copy" transform="translate(283.000000, 20.000000)">
                <polygon id="Path" points="0 0 24 0 24 24 0 24"></polygon>
                <path d="M7,6 L7,3 C7,2.44771525 7.44771525,2 8,2 L20,2
                    C20.5522847,2 21,2.44771525 21,3 L21,17 C21,17.5522847
                    20.5522847,18 20,18 L17,18 L17,21 C17,21.552 16.55,22.000018
                    15.993,22.000018 L4.007,22.000018 C3.74065346,22.0015966 3.48465319,21.8969771
                    3.29565863,21.7092963 C3.10666406,21.5216155 3.0002613,21.2663512 3,21
                    L3.003,7 C3.003,6.448 3.453,6 4.01,6 L7,6 Z M5.003,8 L5,20 L15,20 L15,8
                    L5.003,8 Z M9,6 L17,6 L17,16 L19,16 L19,4 L9,4 L9,6 Z"
                      id="Shape" fill="#999999" fill-rule="nonzero">
                </path>
              </g>
            </g>
          </g>
        </g>
      </svg>
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
