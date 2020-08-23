<template>
  <tc-header
    :autoBackground="true"
    :title="title"
    :backName="hasBack && $route.meta.back.title"
    :backTo="hasBack && { name: $route.meta.back.route }"
  >
    <timosicons-sign-in-out />
  </tc-header>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { getTitle } from '@/router';
import TimosIconsSignInOut from './TimosIcons-SignInOut.vue';

@Component({
  components: {
    'timosicons-sign-in-out': TimosIconsSignInOut
  }
})
export default class TimosIconsHeader extends Vue {
  public title = "Timo's Icons";

  get hasBack(): boolean {
    return !!this.$route.meta.back;
  }

  @Watch('$route', { deep: true, immediate: true })
  routeChanged(): void {
    this.title = getTitle().split('| ')[1] || "Timo's Icons";
    if (this.$route.name === 'issuesdetails') this.title = 'Issue';
  }
}
</script>

<style lang="scss" scoped>
.tc-header {
  @media #{$isDesktop} {
    display: none !important;
  }

  .logo {
    cursor: pointer;
    i {
      font-size: 30px;
    }
  }
}
</style>
