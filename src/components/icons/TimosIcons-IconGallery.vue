<template>
  <transition-group name="icon-trans" tag="div" class="tl-grid">
    <router-link
      v-for="i in filteredIcons"
      :key="i.name"
      :to="{ name: 'iconsdetails', params: { icon: i.name } }"
    >
      <div class="icon-preview">
        <i class="watermark" :class="'ti-' + i.name" />
        <i class="icon" :class="'ti-' + i.name" />
        <div>{{ i.name.split('-').join(' ') }}</div>
      </div>
    </router-link>
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
  grid-gap: 20px;
}

.icon-preview {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 70px;
  align-items: center;
  color: $color;
  padding: 20px;
  border-radius: $border-radius;
  transition: 0.2s ease-in-out;
  position: relative;
  overflow: hidden;
  .watermark {
    position: absolute;
    opacity: 0.05;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(10);
  }
  .icon {
    font-size: 2em;
    transition: 0.2s ease-in-out;
  }
  div {
    transition: 0.4s ease-in-out;

    font-weight: 500;
    text-align: center;
    overflow: hidden;
  }
  background: $paragraph;
  &:hover {
    .icon {
      font-size: 4em;
      color: $primary;
    }
    div {
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
