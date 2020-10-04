<template>
  <notifications
    :class="{show: notifyCount}"
    position="top center"
    :speed="animationSpeed"
    :duration="800"
  >
    <template slot="body" slot-scope="props">
      <NotificationTemplate @init="init" @destroy="destroy" >
        <template>
          <div class="notification-content" :class="props.item.type" @click="props.close">
            <div class="notification-content__title">
              {{props.item.title}}
            </div>
            <div class="notification-content__text">
              {{props.item.text}}
            </div>
          </div>
        </template>
      </NotificationTemplate>
    </template>
  </notifications>
</template>

<script>
import NotificationTemplate from '@components/Notification/NotificationTemplate.vue';

export default {
  name: 'Notification',
  components: {
    NotificationTemplate,
  },
  data: () => ({
    notifyCount: 0,
    animationSpeed: 300,
  }),
  methods: {
    init() {
      this.notifyCount += 1;
    },
    destroy() {
      if (this.notifyCount === 1) {
        setTimeout(() => {
          this.notifyCount -= 1;
        }, this.animationSpeed);

        return;
      }

      this.notifyCount -= 1;
    },
  },
};
</script>

<style lang="scss">

  .vue-notification-wrapper{
    margin: 0;
    margin-bottom: 5px;
    overflow: auto;
  }
  .vue-notification-group.show{
    width: 100% !important;
    height: 100vh !important;
    left: 0 !important;;
    top: 0 !important;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255,255,255,0.2);
  }
  .notification-content{
    padding: 10px;
    cursor: pointer;
    border-radius: 4px;
    min-width: 150px;
    &.error{
      background-color: #FF5151;
    }
    &.success{
      background-color: #259c08;
    }
  }
  .notification-content__title{
    font-size: 16px;
    color: #fff;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  .notification-content__text{
    font-size: 14px;
    color: #fff;
    text-align: center;
  }

</style>
