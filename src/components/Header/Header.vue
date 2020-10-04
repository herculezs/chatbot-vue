<template>
  <div class="header">
    <!-- eslint-disable -->
    <router-link to="/">
      <svg class="header__logo" xmlns="http://www.w3.org/2000/svg" viewBox="30 0 330 330">
          <path d="M239.09,87.78a24.1,24.1,0,0,1-43.87,12.5v95a24.1,24.1,0,1,0,0,29.77v87H162.05a13.67,13.67,0,0,1-13.48-11.42l-5.9-35.4a1.7,1.7,0,0,0-2-1.4l-33,6.44a17.17,17.17,0,0,1-20.43-15.71l-2.74-40.84-19-.29A6.86,6.86,0,0,1,59,205l14.28-59.8a56.14,56.14,0,0,0,.79-22.65,104.9,104.9,0,0,1-1.56-19.78C73.41,45.5,121-.71,178.3,0h16.92V72.83a24.1,24.1,0,0,1,43.87,15Z" fill="#ff5151"/>
          <path d="M324.87,213.46l-18.94.29-2.74,40.84a17.18,17.18,0,0,1-20.43,15.71l-33-6.44a1.71,1.71,0,0,0-2,1.4l-5.89,35.4a13.67,13.67,0,0,1-13.48,11.42H195.22v-87a24.1,24.1,0,1,1,0-29.77v-95a24.1,24.1,0,1,0,0-27.45V0h16.93C269.43-.71,317,45.5,317.94,102.77a106.59,106.59,0,0,1-1.55,19.78,55.79,55.79,0,0,0,.79,22.65L331.46,205A6.87,6.87,0,0,1,324.87,213.46Z" fill="#7811c9"/>
      </svg>
    </router-link>
    <router-link class="header__link" to="/login" v-if="!getProfile.token">
      Sign in
    </router-link>
    <div class="header__link" v-else @click.prevent="logOut"> Log out</div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      getProfile: 'auth/getProfile',
    }),
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    },
  },
};

</script>

<style lang="scss">
  .header{
    /*padding: 24px;*/
    padding: 3vh 24px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-height: $xxsMaxHeight) {
      padding-top: 2vh;
      padding-bottom: 2vh;
    }
  }
  .header__logo{
    width: 7vh;
    height: 7vh;
    @media (max-height: $xxsMaxHeight) {
      width: 5vh;
      height: 5vh;
    }
  }
  .header__link{
    font-weight: bold;
    text-transform: uppercase;
    font-family: $titleFont;
    color: $lnkColor2;
    cursor: pointer;
    font-size: 16px;
    &:hover, &:focus{
      color: $lnkColor2;
      text-decoration: none;
    }
    @media (max-height: $xxsMaxHeight) {
      font-size: 14px;
    }
  }
</style>
