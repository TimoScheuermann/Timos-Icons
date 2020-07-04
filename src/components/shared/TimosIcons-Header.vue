<template>
  <tc-header
    :dark="true"
    :title="title"
    :backName="hasBack && $route.meta.back.title"
    :backTo="hasBack && { name: $route.meta.back.route }"
  >
    <router-link tag="div" :to="{ name: 'home' }" class="logo">
      <img src="assets/logo.svg" alt="" />
    </router-link>
  </tc-header>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { getTitle } from '@/router';

@Component
export default class TimosIconsHeader extends Vue {
  public title = "Timo's Icons";

  get hasBack(): boolean {
    return !!this.$route.meta.back;
  }

  @Watch('$route', { deep: true, immediate: true })
  routeChanged(): void {
    this.title = getTitle().split('| ')[1] || "Timo's Icons";
  }
}
</script>

<style lang="scss" scoped>
.tc-header {
  @media #{$isDesktop} {
    display: none !important;
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    img {
      height: 30px;
      width: 36px;
    }
  }
}
</style>
