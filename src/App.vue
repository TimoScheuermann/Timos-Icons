<template>
  <div class="timosicons">
    <timosicons-navbar />
    <timosicons-tabbar />
    <timosicons-header />

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
  mounted() {
    const xhr = new XMLHttpRequest(); // a new request
    xhr.open('GET', 'https://icons.timos.design/resources/icons.json', true);
    xhr.send(null);
    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        this.$store.commit('updateIcons', JSON.parse(xhr.responseText));
      }
    };
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
