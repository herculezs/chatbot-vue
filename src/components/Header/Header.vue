<template>
  <div class="header">
    <!-- eslint-disable -->
    <router-link to="/">
      <img src="../../assets/logo.png" alt="logo" height="70"/>
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
