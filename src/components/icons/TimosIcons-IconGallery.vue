<template>
  <transition-group name="icon-trans" tag="div" class="tl-grid">
    <tc-tooltip
      v-for="i in filteredIcons"
      :key="i.name"
      :tooltip="i.name + ' [v' + (i.version || '1.0') + ']'"
    >
      <router-link :to="{ name: 'iconsdetails', params: { icon: i.name } }">
        <div class="icon-preview">
          <i class="icon" :class="'ti-' + i.name" />
          <div>{{ i.name.split('-').join(' ') }}</div>
        </div>
      </router-link>
    </tc-tooltip>
  </transition-group>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Icon } from '@/models/Icon.model';
@Component
export default class TimosIconsIconGallery extends Vue {
  @Prop({ default: [] }) queries!: string[];

  get icons(): Icon[] {
    return this.$store.getters.icons.sort((a: Icon, b: Icon) =>
      a.name.localeCompare(b.name)
    );
  }

  get filteredIcons(): Icon[] {
    if (this.queries.length == 0) return this.icons;
    return this.icons.filter(x => {
      let includes = false;
      for (const part of x.name.toLowerCase().split('-')) {
        if (
          this.queries
            .map(q => q.toLowerCase())
            .filter(q => q.startsWith(part) || part.startsWith(q)).length > 0
        ) {
          includes = true;
        }
      }
      return includes;
    });
  }

  @Watch('queries')
  public queriesChanged() {
    this.$emit('update', this.filteredIcons.length);
  }
}
</script>

<style lang="scss" scoped>
.tl-grid {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 30px;
}

.icon-preview {
  color: $color;
  background: $paragraph;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 70px;
  align-items: center;
  padding: 30px;
  border-radius: $border-radius;
  box-shadow: $shadow-light;
  &:hover {
    box-shadow: $shadow;
  }
  transition: 0.2s ease-in-out;
  position: relative;
  overflow: hidden;
  .icon {
    font-size: 2.5em;
    transition: font-size 0.2s ease-in-out;
  }
  div {
    transition: 0.4s ease-in-out;
    font-weight: 500;
    text-align: center;
  }

  &:hover {
    background: $primary;
    color: $color_dark;
    .icon {
      font-size: 4em;
    }
    div {
      overflow: hidden;
      opacity: 0;
    }
  }
}

.icon-trans-move {
  transition: all 0.4s ease-in-out;
}
.icon-trans-enter-active,
.icon-trans-leave-active {
  transition: all 0.4s;
}
.icon-trans-enter {
  opacity: 0;
  transform: translateY(50px);
}
.icon-trans-leave-to {
  transition: all 0.3s ease-in-out;
  opacity: 0;
  transform: scale(0);
}
</style>
