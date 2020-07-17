<template>
  <div class="timosicns-icons">
    <tc-hero tc-dark-container height="400" :class="{ anim: $route.query.q }">
      <img alt="" src="assets/hero.jpg" slot="background" />
      <tc-input
        v-model="query"
        :frosted="true"
        :dark="true"
        icon="lens"
        placeholder="Find Your next icon"
      />
    </tc-hero>
    <tc-header
      variant="sticky"
      top="50"
      :title="'Showing ' + filtered + '/' + icons.length + ' Icons'"
    >
      <div v-for="(q, index) in queries" :key="'query_' + index" class="query">
        <span>{{ q }}</span>
        <i class="ti-cross" @click="removeQuery(index)" />
      </div>
    </tc-header>
    <div content>
      <timosicons-icon-gallery
        :queries="queries"
        @update="c => (filtered = c)"
      />
    </div>

    <tc-scroll-up />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Icon } from '@/models/Icon.model';
import TimosIconsIconGallery from '@/components/icons/TimosIcons-IconGallery.vue';

@Component({
  components: {
    'timosicons-icon-gallery': TimosIconsIconGallery
  }
})
export default class TimosIconsIcons extends Vue {
  public query = '';
  public filtered = this.icons.length;

  mounted() {
    const q = this.$route.query.q;
    if (q) this.query = '' + q;
  }

  get queries(): string[] {
    return this.query.split(',').filter(x => x.length > 0);
  }

  public removeQuery(index: number) {
    this.query = this.queries.filter((x, i) => i !== index).join(',');
  }

  get icons(): Icon[] {
    return this.$store.getters.icons;
  }
}
</script>

<style lang="scss" scoped>
.tc-hero {
  &:not(.anim) {
    height: 200px !important;
  }
  &.anim {
    animation: shrink 0.8s ease-in-out both;
  }
}
@keyframes shrink {
  from {
    height: 400px;
  }
  to {
    height: 200px;
  }
}
.tc-header {
  .query {
    background: $paragraph;
    border-radius: 500px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 3px;
    height: 30px;
    span {
      padding: 0 5px {
        left: 10px;
      }
    }
    i {
      $scale: 22px;
      cursor: pointer;
      width: $scale;
      height: $scale;
      margin-right: 4px;
      line-height: $scale;
      text-align: center;
      font-size: 8px;
      background: darken($paragraph, 15%);
      color: lughten($color, 10%);
      opacity: 0.8;
      border-radius: inherit;
      transition: 0.2s ease-in-out;
      &:hover {
        opacity: 1;
      }
    }
  }
}

.tc-scroll-up {
  @media #{$isMobile} {
    bottom: calc(60px + env(safe-area-inset-bottom));
  }
}

.tc-hero {
  .tc-input {
    padding: 10px;
    width: 70vw;
    max-width: 500px;
  }
}
</style>
