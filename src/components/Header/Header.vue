<template>
  <div class="header">
    <!-- eslint-disable -->
    <span v-if="$route.path.startsWith(pathWithoutLinkInIcon)">
      <img src="../../assets/logo.png" alt="logo" height="70" />
    </span>
    <router-link v-else to="/">
      <img src="../../assets/logo.png" alt="logo" height="70" id="redirect_home"/>
    </router-link>
    <div v-if="headerRegistration()">
      <span class="header__link" @click.prevent="redirectToRegistration" id="coop_registration"  v-if="!getProfile.token">
        Registration
      </span>
    </div>
    <div v-else>
      <span class="header__link" id="sing_in" @click.prevent="redirectToLogIn" v-if="!getProfile.token">
        Sign in
      </span>
      <div class="header__link" v-else @click.prevent="logOut" id="log_out"> Log out</div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import isFreeVersion from '@helpers/func';

export default {
  computed: {
    ...mapGetters({
      getProfile: 'auth/getProfile',
    }),
  },
  data: () => ({
    pathWithoutLinkInIcon: '/building-credibility-score',
  }),
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    },
    headerRegistration() {
      const route = this.$route.path.split('/').filter(x => x !== '');
      return route[0] === 'login';
    },
    redirectToRegistration() {
      if (isFreeVersion()) {
        this.$router.push('registration');
      } else {
        this.$router.push({
          name: 'main',
          params: {
            slide: 3,
          },
        });
      }
    },
    redirectToLogIn() {
      this.$router.push({ name: 'login' });
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
