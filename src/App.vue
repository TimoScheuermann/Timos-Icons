<template>
  <div class="timosicons">
    <timosicons-navbar />
    <timosicons-tabbar />
    <timosicons-header />

    <tc-modal
      v-model="isUpdateAvailable"
      title="new content"
      subtitle="download now"
    >
      <tc-button
        @click="updateNow"
        name="Update application"
        icon="download"
        variant="filled"
      />
    </tc-modal>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import TimosIconsNavbar from '@/components/shared/TimosIcons-Navbar.vue';
import TimosIconsTabbar from '@/components/shared/TimosIcons-Tabbar.vue';
import TimosIconsHeader from '@/components/shared/TimosIcons-Header.vue';

@Component({
  components: {
    'timosicons-navbar': TimosIconsNavbar,
    'timosicons-tabbar': TimosIconsTabbar,
    'timosicons-header': TimosIconsHeader
  }
})
export default class App extends Vue {
  public isUpdateAvailable = false;
  private swRegistration: ServiceWorkerRegistration | undefined = undefined;

  async mounted() {
    const res = await fetch('/resources/icons.json').then(r => r.json());
    this.$store.commit('updateIcons', res);

    document.addEventListener(
      // eslint-disable-next-line
      'swUpdated' as any,
      (e: CustomEvent<ServiceWorkerRegistration>) => {
        console.log('sw update');
        if (!e.detail || !e.detail.waiting) {
          return;
        }
        this.isUpdateAvailable = true;
        this.swRegistration = e.detail;
      },
      {
        once: true
      }
    );

    navigator.serviceWorker.addEventListener('controllerchange', () =>
      window.location.reload()
    );
  }

  public updateNow() {
    // eslint-disable-next-line
    this.swRegistration!.waiting!.postMessage({ type: 'SKIP_WAITING' });
  }
}
</script>

<style lang="scss">
html {
  font-family: -apple-system, BlinkMacSystemFont, SF Pro Display, Segoe UI,
    Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji,
    Segoe UI Symbol;
  scroll-behavior: smooth;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}

body {
  background: $background;
  color: $color;
  margin: 0;
}
a {
  text-decoration: none;
}
[content] {
  padding: 20px 5vw calc(20px + env(safe-area-inset-bottom));
  @media #{$isMobile} {
    padding-bottom: calc(70px + env(safe-area-inset-bottom));
  }
}
</style>
