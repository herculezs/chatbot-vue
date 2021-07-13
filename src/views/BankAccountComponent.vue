<template>
  <div class="bank-account-component">
    <Content>
      <h1 class="h4 text-center mb-3">Bank Account</h1>
      <div class="content-building-your-credibility-score-main
      content-building-your-credibility-score-main-1">
        We would like you to give us your bank card details.
        We will take these details and verify that that card is real and belongs to you
      </div>
      <div class="content-building-your-credibility-score-main
      content-building-your-credibility-score-main-2">
        <b>Remember, we do not store the details of you card or take payment</b>
      </div>
      <div class="content-building-your-credibility-score-main
       content-building-your-credibility-score-main-3">
        If you provide actual details, your Credibility Score will increase which may
        help if you show your profile to others.  If you don’t feel comfortable at the moment,
        don’t worry, you can do this another time
      </div>
      <vue-paycard :value-fields="valueFields" :input-fields="inputFields"
                   :isCardNumberMasked="false"/>
      <br/>
      <form class="form">
        <div
          class="form-group"
          :class="{'form-group-error': $v.valueFields.cardName.$error}"
        >
          <input
            id="v-card-name"
            class="form__input"
            placeholder="Card Holder Name"
            v-model="valueFields.cardName"
            maxlength="27"
          />
          <template v-if="$v.valueFields.cardName.$error">
            <div
              class="form__input-error"
              v-if="!$v.valueFields.cardName.required"
            >
              Field is required
            </div>
          </template>
        </div>
        <div
          class="form-group"
          :class="{'form-group-error': $v.valueFields.cardNumber.$error}"
        >
          <input
            id="v-card-number"
            class="form__input"
            placeholder="Card Number"
            maxlength="19"
            v-model="valueFields.cardNumber"
          />
          <template v-if="$v.valueFields.cardNumber.$error">
            <div
              class="form__input-error"
              v-if="!$v.valueFields.cardNumber.required"
            >
              Field is required
            </div>
          </template>
        </div>
        <div class="block-card-data">
          <div
            class="form-group"
            :class="{'form-group-error': $v.valueFields.cardMonth.$error}"
          >
            <input
              id="v-card-month"
              class="form__input"
              placeholder="MM"
              v-model="valueFields.cardMonth"
              @change="correctCardMonth"
              maxlength="2"
            />
            <template v-if="$v.valueFields.cardMonth.$error">
              <div
                class="form__input-error"
                v-if="!$v.valueFields.cardMonth.required"
              >
                Field is required
              </div>
            </template>
          </div>
          <div
            class="form-group position-input-in-block-card"
            :class="{'form-group-error': $v.valueFields.cardYear.$error}"
          >
            <input
              id="v-card-year"
              class="form__input"
              placeholder="YYYY"
              v-model="valueFields.cardYear"
              @focus="yearInput"
            />
            <template v-if="$v.valueFields.cardYear.$error">
              <div
                class="form__input-error"
                v-if="!$v.valueFields.cardYear.required"
              >
                Field is required
              </div>
            </template>
          </div>
          <div
            class="form-group position-input-in-block-card"
            :class="{'form-group-error': $v.valueFields.cardCvv.$error}"
          >
            <input
              title="CVV"
              id="v-card-cvv"
              data-card-field=""
              autocomplete="off"
              class="card-input__input form__input -cvv "
              type="tel"
              placeholder="CVV"
              v-model="valueFields.cardCvv"
            />
            <template v-if="$v.valueFields.cardCvv.$error">
              <div
                class="form__input-error"
                v-if="!$v.valueFields.cardCvv.required"
              >
                Field is required
              </div>
            </template>
          </div>
        </div>
      </form>
      <div class="form-group form-group_submit">
        <div class="button-bank-account-score">
          <button
            @click="buttonSend"
            class="button button_w-100 button_theme-default button_size-m">
            <span class="outer-space-button-text">Submit</span>
          </button>
        </div>
        <div class="button-bank-account-score">
          <button
            @click="skipButton"
            class="button button_w-100 button_theme-default button_size-m">
            <span class="outer-space-button-text">Skip</span>
          </button>
        </div>
      </div>
    </Content>
  </div>
</template>

<script>
import Content from '@components/Content/Content.vue';

import { validationMixin } from 'vuelidate';
import { mapGetters } from 'vuex';

const { required } = require('vuelidate/lib/validators');


export default {
  name: 'BackAccountComponent',
  components: {
    Content,
  },
  mixins: [validationMixin],
  validations: {
    valueFields: {
      cardName: {
        required,
      },
      cardNumber: {
        required,
      },
      cardMonth: {
        required,
      },
      cardYear: {
        required,
      },
      cardCvv: {
        required,
      },
    },
  },
  watch: {
    'valueFields.cardCvv': {
      // eslint-disable-next-line no-unused-vars
      handler(after, before) {
        if (`${this.valueFields.cardCvv}`.length > 4) {
          this.valueFields.cardCvv = before;
        }
      },
    },
    'valueFields.cardMonth': {
      // eslint-disable-next-line no-unused-vars
      handler(after, before) {
        if (`${this.valueFields.cardMonth.length}`.length > 2) {
          this.valueFields.cardMonth = before;
        }

        if ((this.valueFields.cardMonth > 12 || this.valueFields.cardMonth < 0)) {
          this.valueFields.cardMonth = before;
        }

        if (!/^[1-9]\d*$|^$/.test(this.valueFields.cardMonth[0])
          && `${this.valueFields.cardMonth[0]}` !== '0') {
          this.valueFields.cardMonth = before;
        }
      },
    },
    'valueFields.cardYear': {
      // eslint-disable-next-line no-unused-vars
      handler(after, before) {
        if (`${this.valueFields.cardYear}`.length > 4) {
          this.valueFields.cardYear = before;
        }
        if (!this.valueFields.cardYear.startsWith('20')) {
          this.valueFields.cardYear = '20';
        }
        if (!/^[1-9]\d*$|^$/.test(this.valueFields.cardYear[0])) {
          this.valueFields.cardYear = before;
        }
      },
    },
    'valueFields.cardNumber': {
      // eslint-disable-next-line no-unused-vars
      handler(after, before) {
        if (before.length < after.length) {
          this.valueFields.cardNumber = after.replace(/[^0-9]/gi, '').replace(/(.{4})/g, '$1 ');
          if (after.length < 20) {
            this.valueFields.cardNumber = this.valueFields.cardNumber.substring(0, 19);
          }
        }
      },
    },
    'valueFields.cardName': {
      // eslint-disable-next-line no-unused-vars
      handler(after, before) {
        if (this.valueFields.cardName.length >= 27) {
          this.valueFields.cardName = before;
        }
      },
    },
  },
  methods: {
    yearInput() {
      if (!this.valueFields.cardYear.startsWith('20')) {
        this.valueFields.cardYear = '20';
      }
    },
    correctCardMonth() {
      if (this.valueFields.cardMonth <= 9
        && this.valueFields.cardMonth !== '' && this.valueFields.cardMonth[0] !== '0') {
        this.valueFields.cardMonth = `0${this.valueFields.cardMonth}`;
      }
    },
    skipButton() {
      const request = {
        skipThisStep: true,
      };

      this.$api.auth.checkBankAccountValidate(request, this.getProfile.id).then(() => {
        this.$router.push({ name: 'building-credibility-score' });
      });
    },
    buttonSend() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const request = {
          ...this.valueFields,
          skipThisStep: false,
        };
        this.$api.auth.checkBankAccountValidate(request, this.getProfile.id).then(() => {
          this.$router.push({ name: 'building-credibility-score' });
        });
      }
    },
  },
  computed: {
    ...mapGetters({
      getProfile: 'auth/getProfile',
    }),
  },
  data: () => ({
    cardName: '',
    valueFields: {
      cardName: '',
      cardNumber: '',
      cardMonth: '',
      cardYear: '',
      cardCvv: '',
    },
    inputFields: {
      cardNumber: 'v-card-number',
      cardName: 'v-card-name',
      cardMonth: 'v-card-month',
      cardYear: 'v-card-year',
      cardCvv: 'v-card-cvv',
    },
  }),
};
</script>

<style lang="scss">
  .content-building-your-credibility-score-main {
    margin-bottom: 20px;
    font-style: normal;
    font-weight: normal;
  }
  .content-building-your-credibility-score-main-3 {
    font-size: 18px;
    line-height: 22px;
    align-items: center;
    text-align: center;
  }
  .content-building-your-credibility-score-main-2 {
    font-size: 18px;
    line-height: 22px;
    align-items: center;
    text-align: center;
  }
  .content-building-your-credibility-score-main-1 {
    font-size: 18px;
    line-height: 22px;
    align-items: center;
    text-align: center;
  }

  .block-card-data {
    display: flex;
  }

  .position-input-in-block-card {
    margin-left: 10px;
  }

  .bank-account-component .card-item__cvvBand {
    padding-left: 10px;
  }

  .bank-account-component .form-group_submit {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .button-bank-account-score {
    padding-right: 10px;
    padding-left: 10px;
    width: 100%;
  }

  @media screen and (max-width: 400px) {
    .card-item__numberItem {
      width: 12px !important;
    }
  }
  @media screen and (max-width: 370px) {
    .card-item__numberItem {
      width: 11px !important;
      font-size: 16px;
    }
  }
  @media screen and (max-width: 351px) {
    .card-item__numberItem {
      width: 10px !important;
      font-size: 15px;
    }
  }
  @media screen and (max-width: 351px) {
    .card-item__numberItem {
      width: 10px !important;
      font-size: 15px;
    }
  }
  @media screen and (max-width: 330px) {
    .card-item__numberItem {
      width: 9px !important;
      font-size: 15px;
    }
    .card-item__date {
      padding-top: 4px !important;
    }
  }
</style>
