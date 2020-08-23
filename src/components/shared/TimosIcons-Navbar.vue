<template>
  <tc-navbar :autoBackground="true">
    <router-link :to="{ name: 'home' }" slot="logo" class="logo">
      <i class="ti-timos-icons" />
      <b>Timo's Icons</b>
    </router-link>

    <tc-navbar-item
      v-for="r in routes"
      :key="r.routeName"
      :to="{ name: r.routeName }"
      :name="r.name"
      :icon="r.icon"
    />
    <timosicons-sign-in-out slot="actions" />
  </tc-navbar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import routes from '@/routes';
import TimosIconsSignInOut from './TimosIcons-SignInOut.vue';

@Component({
  components: {
    'timosicons-sign-in-out': TimosIconsSignInOut
  }
})
export default class TimosIconsNavbar extends Vue {
  public routes = routes;
}
</script>

<style lang="scss" scoped>
.tc-navbar {
  @media #{$isMobile} {
    display: none !important;
  }

  .logo {
    color: inherit;
    display: flex;
    align-items: center;
    i {
      font-size: 30px;
    }
    b {
      margin-left: 10px;
    }
  }
}
</style>
