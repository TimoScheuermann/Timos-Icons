<template>
  <div class="timosicons-home">
    <tc-hero tc-dark-container height="400">
      <img id="bg" slot="background" src="assets/hero.jpg" alt="" />
      <div class="tc-hero--content">
        <div class="title">Timo's Icons</div>
        <div class="subtitle">
          A library of high-quality ready to use icons that will help you speed
          up your development workflow.
        </div>
        <form @submit.prevent="startSearch()">
          <tc-input
            pattern="[a-zA-Z0-9 -;]+"
            v-model="query"
            :frosted="true"
            :dark="!false"
            icon="lens"
            placeholder="Find Your next icon"
          />
        </form>
      </div>
    </tc-hero>
    <timosicons-icon-scroller />
    <div content>
      <big-heading
        title="Get started now"
        :subtitle="'Use over ' + iconAmount + ' Icons for free'"
      />

      <tl-grid>
        <tc-card
          rounded="true"
          title="How to"
          subtitle="Read the guide to learn how to use Timo's Icons in Your next project"
        >
          <tc-button
            name="How to"
            icon="question-circle"
            variant="filled"
            :to="{ name: 'howto' }"
          />
        </tc-card>
        <tc-card
          rounded="true"
          title="Overview"
          :subtitle="
            'Find the right icon for your project from a list of over ' +
              iconAmount +
              ' icons'
          "
        >
          <tc-button
            name="Icons"
            icon="heart"
            variant="filled"
            :to="{ name: 'icons' }"
          />
        </tc-card>
      </tl-grid>

      <big-heading
        :title="'Introducing v' + versions[0]"
        :subtitle="'Featuring ' + latestIcons.length + ' new Icons'"
      />

      <tl-grid minWidth="200">
        <router-link
          v-for="i in latestIcons"
          :key="i"
          :to="{ name: 'iconsdetails', params: { icon: i } }"
        >
          <tc-card :title="i" rounded="true" hover="true">
            <i :class="'ti-' + i" class="big" />
          </tc-card>
        </router-link>
      </tl-grid>

      <big-heading
        title="Timo's Icons in the wild"
        subtitle="Websites featuring Timo's Icons"
      />

      <tl-grid>
        <a href="https://components.timos.design" target="_blank">
          <tc-card>
            <img src="https://components.timos.design/assets/banner.svg" />
          </tc-card>
        </a>
        <a href="https://wip-investing-collectors.netlify.app" target="_blank">
          <tc-card>
            <img
              src="https://wip-investing-collectors.netlify.app/assets/logo.png"
            />
          </tc-card>
        </a>
        <a href="https://portfolio.timos.design" target="_blank">
          <tc-card>
            <img src="assets/portfolio.svg" />
          </tc-card>
        </a>
        <a href="https://accounts.timos.design" target="_blank">
          <tc-card>
            <img src="https://accounts.timos.design/pwa/maskIcon.svg" />
          </tc-card>
        </a>
        <a href="https://p2p.timos.design" target="_blank">
          <tc-card>
            <tl-flow>
              <img src="https://p2p.timos.design/pwa/maskIcon.svg" />
              <b>Peer-2-Peer.exchange</b>
            </tl-flow>
          </tc-card>
        </a>
      </tl-grid>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { getIconsOfVersion, getIconVersions } from '@/utils/functions';
import BigHeading from '@/components/BigHeading.vue';
import TimosIconsIconScroller from '@/components/icons/TimosIcons-IconScroller.vue';

@Component({
  components: {
    'big-heading': BigHeading,
    'timosicons-icon-scroller': TimosIconsIconScroller
  }
})
export default class TimosIconsHome extends Vue {
  public query = '';

  public startSearch(): void {
    this.$router.push({ name: 'icons', query: { q: this.query } });
  }
  get iconAmount(): number {
    return this.$store.getters.icons.length;
  }
  get versions(): string[] {
    return getIconVersions();
  }
  get latestIcons(): string[] {
    return getIconsOfVersion(this.versions[0]);
  }
}
</script>

<style lang="scss" scoped>
[content] {
  padding-top: 5vw;
}
.tl-grid {
  margin: {
    top: 40px;
    bottom: 150px;
  }
}
i.big {
  font-size: 2em;
}
a .tc-card {
  height: 100%;
  img {
    max-height: 100px;
  }
  .tl-flow {
    white-space: nowrap;
    flex-wrap: nowrap;
  }
}

.tc-hero {
  img {
    // filter: brightness(80%);
  }
  transition: height 1s ease-in-out;
  .tc-hero--content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: #fff;

    .title {
      font-size: 3em;
      font-weight: bold;
    }
    .subtitle,
    .title {
      margin-bottom: 20px;
    }
    .subtitle {
      font-weight: 500;
      font-size: 20px;
      width: 500px;
      max-width: 70vw;
    }

    .tc-input {
      padding: 10px;
      width: 70vw;
      max-width: 500px;
    }
  }
}
</style>
