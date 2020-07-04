<template>
  <div class="timosicons-icons-detail">
    <tc-hero>
      <img src="assets/hero.jpg" alt="" slot="background" />
      <div v-if="!!icon" class="hero-title">
        <h1>{{ icon.name }}</h1>
        <i :class="iconclass" />
      </div>
    </tc-hero>
    <timosicons-icon-scroller />
    <div content>
      <div class="details" v-if="!!icon">
        <tl-grid>
          <tl-grid>
            <tc-card :shadow="false" rounded="true" sizes title="Sizes">
              <tl-grid minWidth="80">
                <div class="item" v-for="(x, i) in Array(6)" :key="'s' + i">
                  <i :class="iconclass" />
                </div>
              </tl-grid>
            </tc-card>
            <tc-card :shadow="false" rounded="true" colors title="Colors">
              <tl-grid minWidth="80">
                <div class="item" v-for="(x, i) in Array(6)" :key="'c' + i">
                  <i :class="iconclass" />
                </div>
              </tl-grid>
            </tc-card>
          </tl-grid>
          <tl-grid>
            <tc-card :shadow="false" rounded="true" details>
              <i :class="iconclass" class="watermark"></i>
              <h2 slot="header">{{ icon.name }}</h2>
              <div class="version" slot="header" @click="goTo('versions')">
                Added in v{{ icon.version || '1.0' }}
              </div>
              <tl-grid minWidth="120">
                <tc-button
                  :icon="icon.name"
                  color="error"
                  :name="coppied ? 'Copied!' : 'Copy HTML'"
                  variant="opaque"
                  @click="copy('html')"
                />
                <tc-button
                  :icon="icon.name"
                  color="success"
                  :name="coppied ? 'Copied!' : 'Copy SVG'"
                  variant="opaque"
                  @click="copy('svg')"
                />
              </tl-grid>

              <tc-button
                huge
                variant="filled"
                icon="reply"
                name="Start using Timo's Icons"
                :to="{ name: 'howto' }"
              />
            </tc-card>
          </tl-grid>
        </tl-grid>
        <tl-grid footer>
          <router-link :to="{ name: 'howot' }">
            <tc-card :shadow="false" rounded="true" title="Need help?">
              You found the right icon, but have no idea how to use it on your
              website? Take a look at the getting started page.
              <i class="ti-share" />
            </tc-card>
          </router-link>
          <a
            href="https://github.com/TimoScheuermann/Timos-Icons/issues/new?labels=Problem&template=problem.md"
          >
            <tc-card
              :shadow="false"
              rounded="true"
              title="Room for improvements?"
            >
              There is something wrong with this icon or you want something to
              be changed, then submit Your idea by opening a new issue.
              <i class="ti-share" />
            </tc-card>
          </a>
          <a
            href="https://github.com/TimoScheuermann/Timos-Icons/issues/new?labels=Icon+Request&template=icon-request.md"
          >
            <tc-card :shadow="false" rounded="true" title="New icon idea?">
              You just can't find the right icon for your project? Simply open a
              new github issue and tell me about your idea.
              <i class="ti-share" />
            </tc-card>
          </a>
        </tl-grid>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import TimosIconsIconScroller from '@/components/icons/TimosIcons-IconScroller.vue';
import { Icon } from '@/models/Icon.model';
import axios from '@/axios';
import { copyToClipboard } from '@/utils';

@Component({
  components: {
    'timosicons-icon-scroller': TimosIconsIconScroller
  }
})
export default class TimosIconsIconsDetail extends Vue {
  public html = '';
  public svg = '';
  public coppied = false;
  public timeout = 0;

  get icon(): Icon {
    return this.$store.getters.icons.filter(
      (x: Icon) => x.name === this.$route.params.icon.toLowerCase()
    )[0];
  }

  get iconclass(): string {
    try {
      return 'ti-' + this.icon.name;
    } catch (error) {
      console.log('bei iconclass');
      return 'ti-apple';
    }
  }

  goTo(routeName = 'home'): void {
    this.$router.push({ name: routeName });
  }

  private gettext(text: string): string {
    if (text === 'svg') return this.svg;
    if (text === 'html') return this.html;
    return '';
  }

  public async copy(type: string): Promise<void> {
    let text = this.gettext(type);
    if (text.length === 0) {
      await this.setupCopies();
      text = this.gettext(type);
    }
    copyToClipboard(text);
    clearTimeout(this.timeout);
    this.coppied = true;
    this.timeout = setTimeout(() => {
      this.coppied = false;
    }, 1000);
  }

  @Watch('$route', { deep: true, immediate: true })
  async setupCopies(): Promise<void> {
    if (this.icon) {
      this.svg = (await axios.get(`/resources/svg/${this.icon.name}.svg`)).data;
      this.html = `<i class="ti-${this.icon.name}" />`;
    }
  }

  mounted() {
    this.setupCopies();
  }
}
</script>

<style lang="scss" scoped>
.hero-title {
  width: 90vw;
  position: relative;
  color: #fff;
  h1 {
    text-transform: capitalize;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    overflow: hidden;
    white-space: pre-wrap;
    overflow-wrap: break-word;
  }
  i {
    z-index: -1;
    color: $color;
    opacity: 0.4;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(10);
  }
}
[details] {
  .watermark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(20);
    opacity: 0.1;
    z-index: -1;
  }
  h2 {
    margin-bottom: 5px;
  }
  .version {
    font-weight: 500;
    opacity: 0.8;
  }
  .tl-grid {
    margin-bottom: 10px;
    grid-gap: 0 30px;
  }

  .tc-button {
    display: block;
    padding: 10px;
    &[huge] {
      padding: 15px;
    }
  }
}
.-version {
  color: $error;
  border: 1px solid $error;
  border-radius: $border-radius;
  padding: 5px 10px;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: $error;
    color: #fff;
  }
}
.tc-card {
  background: lighten($paragraph, 3%);
}

[content] {
  padding-top: 30px;
}
[footer] {
  margin-top: 30px;
  margin-bottom: 10px;
  i {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    color: $primary;
  }
}
[sizes] {
  .item {
    position: relative;
    @for $i from 6 through 11 {
      &:nth-child(#{$i - 5}) {
        font-size: #{$i / 2}em;
        &::after {
          position: absolute;
          bottom: -20px;
          font-size: 16px;
          font-weight: 500;
          opacity: 0.5;
          content: '@#{$i / 2}em';
        }
      }
    }
  }
}
[colors] {
  .item {
    $size: 80;
    height: #{$size}px;
    i {
      width: calc(100% - 16px);
      height: #{$size - 16}px;
      line-height: #{$size - 16}px;
      border: 3px solid currentColor;
      font-size: 2em;
    }

    $colors: (
      1 $error #fff,
      2 $primary #fff,
      3 $success #fff,
      4 $alarm #fff,
      5 $color #fff,
      6 darken($paragraph, 5%) $color
    );
    @each $i, $b, $c in $colors {
      &:nth-child(#{$i}) {
        background: $b;
        color: $c;
      }
    }
  }
}
[sizes],
[colors] {
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
