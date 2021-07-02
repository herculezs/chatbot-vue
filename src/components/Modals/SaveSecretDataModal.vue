<template>
  <div class="save-secret-data-modal" data-app>
    <v-dialog
      v-model="openModal"
      min-width="200"
      max-width="600"
      persistent
    >
      <v-card>
        <v-card-title class="headline orange lighten-2">
          Save secret answer
        </v-card-title>
        <v-card-text >
          <br/>
          <h4>
            Please choose secret question and enter answer.
          </h4>
        </v-card-text>
        <div class="form-input-modal">
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
              placeholder="Secret Answer"
              type="text"
              v-model="formData.secretAnswer"
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
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="primary"
            class="saveButton"
            text
            @click="updateSecretData"
          >
            SAVE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import secretQuestions from '@constants/secretQuestions';
import { mapGetters } from 'vuex';

const { required } = require('vuelidate/lib/validators');

export default {
  name: 'SaveSecretDataModal',
  mixins: [validationMixin],
  validations: {
    formData: {
      secretAnswer: {
        required,
      },
      selectSecretQuestion: {
        required,
      },
    },
  },
  props: {
    openModal: {
      types: Boolean,
    },
  },
  watch: {
    formData: {
      // eslint-disable-next-line no-unused-vars
      handler() {
        if (this.formData.secretAnswer) {
          this.formData.secretAnswer = this.formData.secretAnswer.trim();
        }
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      getProfile: 'auth/getProfile',
    }),
  },
  data: () => ({
    questions: secretQuestions,
    formData: {
      secretAnswer: null,
      selectSecretQuestion: null,
    },
  }),
  methods: {
    updateSecretData() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const dataRequest = {
          questionId: this.formData.selectSecretQuestion.questionId,
          secretAnswer: this.formData.secretAnswer,
        };

        this.$api.auth.saveSecretAnswer(dataRequest, this.getProfile.id).then(() => {
          this.$store.dispatch('auth/updateSavedSecretAnswers');
          console.log(this.getProfile);
        });
      }
    },
  },
};
</script>

<style lang="scss">
  .save-secret-data-modal .form-input-modal {
    width: 70%;
    margin-left: auto;
    margin-right: auto;
  }
</style>
