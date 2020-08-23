<template>
  <div class="timosicons-home">
    <tc-hero tc-dark-container>
      <img alt="" src="assets/hero.jpg" slot="background" />
      <h1>Versions</h1>
    </tc-hero>
    <div content>
      <tl-grid>
        <tc-card
          v-for="(v, i) in versions"
          :key="v"
          rounded="true"
          :dark="i === 0"
          :title="v"
        >
          <div class="latest" v-if="i === 0">latest</div>
          <div>
            <b>{{ getIconsOfVersion(v).length }} icons added in this update</b>
          </div>
          <tl-grid minWidth="20">
            <router-link
              v-for="i in getIconsOfVersion(v)"
              :key="i"
              class="icon"
              tag="div"
              :to="{ name: 'iconsdetails', params: { icon: i } }"
            >
              <i :class="'ti-' + i" />
            </router-link>
          </tl-grid>
          <!-- Icons: {{ getIconsOfVersion(v) }} -->
        </tc-card>
      </tl-grid>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Icon } from '@/utils/model';
import { getIconsOfVersion, getIconVersions } from '@/utils/functions';

@Component
export default class TimosIconsVersions extends Vue {
  get icons(): Icon[] {
    return this.$store.getters.icons;
  }

  get versions(): string[] {
    return getIconVersions();
  }

  getIconsOfVersion(v: string): string[] {
    return getIconsOfVersion(v);
  }
}
</script>

<style lang="scss" scoped>
.tc-hero {
  color: #fff;
}
.latest {
  position: absolute;
  top: 10px;
  right: 10px;
  color: $error;
  border: 1px solid $error;
  padding: 2.5px 10px;
  border-radius: $border-radius;
  font-size: 14px;
}
.tc-card {
  height: fit-content;
}
.tl-grid {
  margin-top: 20px;
}
.icon {
  cursor: pointer;
  color: inherit;
  font-size: 2em;
  transition: 0.2s ease-in-out;
  &:hover {
    color: $primary;
  }
}
</style>
