<template>
  <tc-tabbar>
    <tc-tabbar-item
      v-for="r in routes"
      :key="r.routeName"
      :routeName="r.routeName"
      :title="r.name"
      :icon="r.icon"
    />
  </tc-tabbar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import routes from '@/routes';

@Component
export default class TimosIconsTabbar extends Vue {
  public routes = routes;
}
</script>

<style lang="scss" scoped>
.tc-tabbar {
  @media #{$isDesktop} {
    display: none !important;
  }
}
</style>
