<template>
  <tc-navbar :dark="true">
    <div slot="logo" class="logo">
      <img src="assets/logo.svg" alt="" />
      <b>Timo's Icons</b>
    </div>

    <tc-navbar-item
      v-for="r in routes"
      :key="r.routeName"
      :to="{ name: r.routeName }"
      :name="r.name"
      :icon="r.icon"
    />
  </tc-navbar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import routes from '@/routes';
@Component
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
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      height: 30px;
      width: 36px;
    }

    b {
      margin-left: 10px;
    }
  }
}
</style>
