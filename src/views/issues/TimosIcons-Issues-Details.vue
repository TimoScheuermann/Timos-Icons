<template>
  <div class="timosicons-issues--detail">
    <tc-hero tc-dark-container>
      <img alt="" slot="background" src="assets/hero.jpg" />
      <transition-group tag="div" class="hero-content" name="swap">
        <div class="error" v-if="error" :key="0">Error</div>
        <div class="loaded" v-else-if="loaded" :key="1">
          <div class="type" :style="{ color: '#' + issue.labels[0].color }">
            {{ issue.labels[0].name }}
          </div>
          <h1>#{{ number }} {{ issue.title }}</h1>
          <div class="hero--sub">
            <div class="indicator" :class="issue.state">
              {{ issue.state }}
            </div>
            <tc-button
              :href="issue.html_url"
              variant="filled"
              name="View on GitHub"
              iconPosition="right"
              icon="github"
            />
          </div>
        </div>
        <div class="loading" v-else :key="2">
          <tc-spinner />
          <div class="info">Loading</div>
        </div>
      </transition-group>
    </tc-hero>

    <div content v-if="loaded">
      <timosicons-comment
        :comment="issue"
        :issue="issue"
        timePrefix="reported this issue"
        :title="issue.title"
      />

      <div v-if="comments.length > 0" class="comments-section">
        <h1>
          {{ comments.length }} Comment{{ comments.length > 1 ? 's' : '' }}
        </h1>
        <div class="comments">
          <timosicons-comment
            v-for="comment in comments"
            :key="comment.created"
            :comment="comment"
            :issue="issue"
          />
        </div>
      </div>
    </div>
    <tc-scroll-up />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import axios from '@/axios';
import { formatDate } from '@/utils';
import TimosIconsComment from '@/components/icons/TimosIcons-Comment.vue';

@Component({
  components: {
    'timosicons-comment': TimosIconsComment
  }
})
export default class TimosIconsRequestsDetail extends Vue {
  public error = false;
  public comments: [] | null = null;
  // eslint-disable-next-line
  public issue: any | null = null;

  get loaded(): boolean {
    return !!this.comments && !!this.issue;
  }

  get number(): string {
    return this.$route.params.issue;
  }

  public formatDate(date: Record<string, unknown>): string {
    return formatDate(date);
  }

  async created(): Promise<void> {
    this.loadComments();
    this.loadIssue();
  }

  async loadComments(): Promise<void> {
    const { data } = await axios.get(
      `https://api.github.com/repos/TimoScheuermann/Timos-Icons/issues/${this.number}/comments`
    );
    if (data) {
      this.comments = data;
    } else {
      this.error = true;
    }
  }

  async loadIssue(): Promise<void> {
    const { data } = await axios.get(
      `https://api.github.com/repos/TimoScheuermann/Timos-Icons/issues/${this.number}`
    );
    if (data) {
      this.issue = data;
    } else {
      this.error = true;
    }
  }
}
</script>
<style lang="scss" scoped>
.tc-scroll-up {
  @media #{$isMobile} {
    bottom: 60px;
  }
}
.comments-section {
  margin-top: 40px;
  text-align: center;
  .comments {
    display: flex;
    flex-direction: column;
    align-items: center;
    .tc-card {
      width: 90vw;
      max-width: 800px;
    }
  }
}

.swap-enter-active,
.swap-leave-active {
  transition: all 1s;
}
.swap-enter {
  opacity: 0;
  transform: translateY(30px);
}
.swap-leave-to {
  opacity: 0;
  transform: scale(0);
}
.swap-leave-active {
  position: absolute;
}

.hero--sub {
  display: flex;
  justify-content: center;
  align-items: center;
  .tc-button,
  .indicator {
    margin: 3px 10px;
    padding: 5px 10px;
  }
  .indicator {
    color: #fff;
    border-radius: $border-radius;
    text-transform: capitalize;
    &.open {
      background: $success;
    }
    &.closed {
      background: $error;
    }
  }
}

.hero-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;

  .error {
    color: $error;
    padding: 5px 25px;
    font-size: 20px;
    background: rgba(#000, 0.2);
    border: 1px solid currentColor;
    border-radius: $border-radius;
  }
  .loading {
    text-align: center;
    .info {
      opacity: 0.8;
      margin-top: 5px;
      font-size: 18px;
      font-weight: bold;
    }
  }
  .loaded {
    display: flex;
    flex-direction: column;
    align-items: center;
    .type {
      padding: 5px 25px;
      background: rgba(#000, 0.2);
      border: 1px solid currentColor;
      width: fit-content;
      border-radius: $border-radius;
    }
    h1 {
      width: 80vw;
      margin-top: 5px;
      white-space: nowrap;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
