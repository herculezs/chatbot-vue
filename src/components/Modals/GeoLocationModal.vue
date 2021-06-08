<template>
  <v-app class="geolocationModal" v-if="showWindowModal">
    <v-dialog
      v-model="showWindowModal"
      max-width="800"
      persistent
    >
        <v-card>
          <v-card-title class="modal-geolocation-title headline purple lighten-2 white--text
           text-center">
            <span class="modal-title-text">Geolocation Information</span>
          </v-card-title>
          <v-card-text class="modal-geolocation-content">
            <br/>
            <h5>
              Hello,   <br/><br/>Your device is just about to ask you to give us permission
              to know your
              location (it's actually your approximate latitude and longitude):
              we wanted to explain why we are asking for it.
              <br/><br/>
              We need to know your location to help make sure that you are who you say you are
              (country etc) so that we can reduce fraudulent assessments.
              Of course, we would never want you to give information unwillingly but helping us
              will help you have a more trustworthy and valuable profile.
              <br/><br/>
              Thanks, Joe and Oli
            </h5>
          </v-card-text>
        </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: 'GeoLocationModal',
  props: {
    showWindowModal: {
      type: Boolean,
    },
  },
  data: () => ({
    showModal: true,
  }),
};
</script>

<style lang="scss">
  .geolocationModal {
    width: 0;
    height: 0;
  }
  .modal-geolocation-title {
    background-color: $bgCardColor1;
  }
  .modal-geolocation-content {
    background-color: $bgColor1;
  }
  .modal-title-text {
    display: block;
    margin-left: auto;
    margin-right: auto
  }
</style>
