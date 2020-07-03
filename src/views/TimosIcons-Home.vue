<template>
  <div class="timosicons-home">
    <tc-hero height="400">
      <img id="bg" slot="background" src="assets/hero.png" />
      <!-- src="https://images.unsplash.com/photo-1544198365-f5d60b6d8190?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" -->
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
      <!-- <img class="tc-hero-title--image" src="assets/hero_inner.png" /> -->
    </tc-hero>
    <div content>
      <tl-grid>
        <tc-card :dark="true">
          <img tcl slot="media" src="assets/logo.svg" />
          <h3>Adobe XD Plugin</h3>
          <p>
            Coming soon!
          </p>

          <tc-button
            name="Download"
            icon="download"
            color="error"
            :disabled="true"
          />
        </tc-card>
        <tc-card>
          <tl-grid slot="media" class="latestIcons" minWidth="20">
            <i
              v-for="i in getIconsOfVersion(versions[0])"
              :key="i"
              :class="'ti-' + i"
            />
          </tl-grid>
          <h3>Introducing Version {{ versions[0] }}</h3>
          <p>
            <b>Featuring</b>
            {{
              getIconsOfVersion(versions[0])
                .join(', ')
                .split('-')
                .join(' ')
            }}
          </p>

          <tc-button
            name="Versions"
            variant="filled"
            icon="chevron-right"
            iconPosition="right"
            color="paragraph"
            :to="{ name: 'versions' }"
          />
        </tc-card>
        <tc-card>
          <div slot="media" class="bigNumber">{{ iconAmount }}</div>
          <h3>Just wow!</h3>
          <p>The amount of icons has grown to over {{ iconAmount }} icons!</p>

          <tc-button
            name="Icons"
            variant="filled"
            icon="chevron-right"
            iconPosition="right"
            color="paragraph"
            :to="{ name: 'icons' }"
          />
        </tc-card>
      </tl-grid>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { getIconVersions, getIconsOfVersion } from '@/utils';
@Component
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
  getIconsOfVersion(v: string): string[] {
    return getIconsOfVersion(v);
  }
}
</script>

<style lang="scss" scoped>
[content] {
  padding-top: 5vw;
}
[tcl] {
  max-height: 100px;
}
.tc-card {
  h3 {
    margin-top: 0;
  }
  p {
    margin-top: 0;
  }

  .bigNumber {
    font-weight: 900;
    font-size: 10em;
    color: $primary;
  }
  .latestIcons {
    margin: 0 40px;
    max-height: 200px;
    i {
      font-size: 40px;
    }
  }
}
.tc-hero {
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