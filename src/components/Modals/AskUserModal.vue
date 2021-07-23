<template>
  <div class="ask-user-modal">
    <b-modal
      data-app
      modal-class="modal-sticky-bottom ask-contacts"
      class="ask-contacts"
      id="modal-multi-1"
      hide-footer
    >
      <template v-slot:modal-title>
        {{configEnv.report.textForReport.title}}
      </template>
      <p class="text mb-3" v-html="configEnv.report.textForReport.paragraph1">
        {{configEnv.report.textForReport.paragraph1}}
      </p>
      <p class="text mb-3">
        {{configEnv.report.textForReport.paragraph2}}
      </p>
      <p class="text mb-3" v-html="configEnv.report.textForReport.paragraph3">
        {{configEnv.report.textForReport.paragraph3}}
      </p>
      <p class="text mb-4">
        Click the <b>copy button below</b> and paste the explanatory
        text and link to your colleagues using your favorite method.
      </p>

      <div class="block-buttons" v-if="isFreeVersion">
        <div class="links-free-version">
          <v-select class="select-ask-user" ref="select" :items="items" solo @click="blurEvent"
                    :label.sync="labelSelect"
                    color="white"
                    @input="changeGroup"
                    v-model="selected">
          </v-select>
        </div>
        <InputCopy v-model="newLink" class="mb-4" />
      </div>
      <InputCopy v-else v-model="shareLink" class="mb-4" />
      <br/>
      <br/>
      <div>
        <b-modal
          v-model="showWindowModalWithCustomOptions"
          modal-class="modal-select-option"
          hide-footer
          hide-header-close
          data-app
        >
            <v-card-title class="headline">
              <v-text-field
                class="remindEvery"
                ref="input"
                id="remind-every-select-time"
                label="What do you want to call the group ..."
                v-model="customOption"
                counter
                :rules="[ correctOption ]"
                maxlength="15"
              />
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                class="saveButton"
                @click.stop="chooseFromModal"
                :disabled="disableButtonEnterCustom"
              >
                Enter
              </v-btn>
            </v-card-actions>
         </b-modal>
      </div>
    </b-modal>
  </div>
</template>

<script>
import configEnv from '@configEnv';
import InputCopy from '@components/InputCopy/InputCopy.vue';
import { encode } from 'js-base64';

import { validationMixin } from 'vuelidate';

// eslint-disable-next-line no-unused-vars
const mustNotBeColleagues = (field) => {
  const checkResult = field.toLowerCase();

  return checkResult !== 'colleagues' && checkResult !== 'colleague'
    && checkResult !== 'friends' && checkResult !== 'family';
};

export default {
  name: 'AskUserModal',
  components: {
    InputCopy,
  },
  mixins: [validationMixin],
  props: {
    shareLink: {
      type: String,
    },
    isFreeVersion: {
      type: Boolean,
    },
  },
  validations: {
    defineUser: {
      mustNotBeColleagues,
    },
  },
  watch: {
    selected(newData) {
      if (this.selected != null) {
        if (newData === 'choose') {
          this.showWindowModalWithCustomOptions = true;
          this.createLink(newData);
        } else {
          this.createLink(newData);
        }
        this.selected = null;
      }
    },
  },
  data: () => ({
    configEnv,
    valid: true,
    labelSelect: 'Who do you want to ask',
    rulesCustomGroup: [v => v !== ('colleagues' && v !== 'colleague') || 'Please use another world'],
    selected: null,
    newLink: '',
    showWindowModalWithCustomOptions: false,
    customOption: '',
    disableButtonEnterCustom: false,
    items: [
      {
        text: 'Family',
        value: 'Family',
        disabled: false,
      },
      {
        text: 'Friends',
        value: 'Friends',
        disabled: false,
      },
      {
        text: 'You choose',
        value: 'choose',
        disabled: false,
      },
      {
        text: 'Colleagues',
        value: 'colleagues',
        disabled: true,
      },
    ],
    defineUser: '',
    generateLink: '',
    shareFamilyLink: '',
  }),
  methods: {
    changeGroup(newData) {
      if (this.selected != null) {
        if (newData === 'choose') {
          this.showWindowModalWithCustomOptions = true;
        } else {
          this.createLink(newData);
        }
        this.selected = null;
      }
    },
    blurAutoSelect() {
      this.$refs.select.blur();
    },
    correctOption(value) {
      if (value.toLowerCase() === 'colleagues' || value.toLowerCase() === 'colleague') {
        this.disableButtonEnterCustom = true;
        return 'Please use another world';
      }
      this.disableButtonEnterCustom = false;
      return '';
    },
    blurEvent() {
      this.$refs.select.internalValue = [];
      const autocompleteInput = this.$refs.select.$refs.input;
      autocompleteInput.addEventListener('blur', this.blurAutoSelect, true);
    },
    createLink(newData) {
      this.newLink = `${this.shareLink}?option=${encode(newData)}`;
      this.customOption = '';
    },
    chooseFromModal() {
      this.showWindowModalWithCustomOptions = false;
      this.createLink(this.customOption);
    },
    test(event) {
      event.stopPropagation();
    },
  },
};
</script>

<style lang="scss">
  .ask-user-modal {
    .block-buttons {
      text-align: center;
    }

    .input {
      width: 135px;
      border: none;
      outline: none;
      color: white;
    }

    ::-webkit-input-placeholder {
      text-align: center;
      color: white;
    }

    :-moz-placeholder { /* Firefox 18- */
      text-align: center;
      color: white;
    }

    ::-moz-placeholder { /* Firefox 19+ */
      text-align: center;
      color: white;
    }

    :-ms-input-placeholder {
      text-align: center;
      color: white;
    }

    .table-buttons {
      margin-left: auto;
      margin-right: auto;
    }
  }

  .links-free-version .v-input__slot .v-select__slot .v-label {
    color: white;
    font-size: 20px;
    left: 48% !important;
    transform: translate(-50%, 0);
  }
  .links-free-version .v-input__slot .v-select__slot .v-select__selection {
    color: white;
    font-size: 20px;
    position: absolute;
    left: 48% !important;
    transform: translate(-50%, 0);
  }

  .links-free-version .v-input__slot {
    background: #FF5151 !important;
  }

  #modal-multi-1___BV_modal_outer_ .v-list {
    background-color: #FF8E8E !important;
    font-size: 20px;
  }
  #modal-multi-1___BV_modal_outer_ .v-list .v-list-item__title {

    color: white !important;
    font-size: 20px;
  }
  #modal-multi-1___BV_modal_outer_ .v-list .v-list-item--disabled .v-list-item__title {
    color: #919191 !important;
    font-size: 20px;
  }

  .modal-select-option{
    overflow: hidden !important;
    .modal-dialog {
      bottom: 0;
      top: 30%;
      width: 25%;
      min-width: 300px;
      margin: auto;
      left: 0;
      right: 0;
      text-align: center;
      transform: translate(-50%, 0);
    }
    .modal-body {
      background-color: #FF8E8E !important;
      border-radius: 0 0 10px 10px ;
    }
    .modal-header {
      background-color: #FF8E8E !important;
      border-radius: 10px 10px 0 0;
    }
    .saveButton {
      color: white;
      background: #FF5151 !important;
    }
    .modal-content {
      border-radius: 12px;
    }
  }
</style>
