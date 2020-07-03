<template>
  <div class="timosicons-howto">
    <tc-hero>
      <img src="assets/hero.png" slot="background" />
      <h1>Getting started</h1>
    </tc-hero>
    <div content>
      <h1>How to</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class TimosIconsHowTo extends Vue {}
</script>

<style lang="scss" scoped>
.tc-hero {
  color: #fff;
}
</style>
