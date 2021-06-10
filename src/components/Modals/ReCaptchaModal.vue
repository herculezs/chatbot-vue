<template>
  <v-app class="captcha" v-if="showWindowModal">
    <v-dialog
      v-model="showWindowModal"
      max-width="400"
      persistent
    >
      <v-card>
        <v-card-title class="modal-recaptcha-title headline lighten-2 white--text
           text-center">
          <span class="modal-recaptcha-title-text">Captcha</span>
        </v-card-title>
        <v-card-text class="modal-recaptcha-content">
          <br/>
          <h5>
            We have detected suspicious activity from you.
          </h5>
        </v-card-text>
        <v-card-actions class="modal-recaptcha-content">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="updateRecaptcha.captchaUpdate"
          >
            Please try Again
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: 'ReCaptchaModal',
  props: {
    showWindowModal: {
      type: Boolean,
    },
    updateRecaptcha: {
      type: Object,
    },
  },
};
</script>

<style lang="scss">
  .captcha {
    width: 0;
    height: 0;
  }
  .modal-recaptcha-title {
    background-color: #1A73E8;
  }
  .modal-recaptcha-content {
    background-color: $bgColor1;
  }
  .modal-recaptcha-title-text {
    display: block;
    margin-left: auto;
    margin-right: auto
  }
  .captcha .v-dialog {
    position: absolute;
    top: 25%;
  }
</style>
