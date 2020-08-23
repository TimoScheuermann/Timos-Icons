<template>
  <div class="timosicons-issues--detail">
    <tc-hero tc-dark-container>
      <img alt="" slot="background" src="assets/hero.jpg" />
      <transition-group tag="div" class="hero-content" name="swap">
        <div class="error" v-if="error" :key="0">Error</div>
        <div class="loaded" v-else-if="issue" :key="1">
          <div class="type">
            {{ issue.type }}
          </div>
          <h1>{{ issue.title }}</h1>
        </div>
        <tl-flow v-else :key="2">
          <tc-spinner :dark="true" variant="dots-wave" />
        </tl-flow>
      </transition-group>
    </tc-hero>
    <transition name="swap">
      <div v-if="issue">
        <tc-header variant="sticky" top="50">
          <tl-flow h horizontal="space-between">
            <div>
              <tc-button
                icon="heart"
                :name="issue.likes || '0'"
                :disabled="true"
                tfbackground="error"
              />
              <tc-button
                :name="'Like' + (liked ? 'd' : '')"
                :variant="liked ? 'filled' : 'opaque'"
                tfbackground="error"
                @click="likeButton"
              />
            </div>
            <div>{{ formatDate(issue.date) }}</div>
          </tl-flow>
        </tc-header>

        <div content>
          <tc-card v-if="author" rounded="true" :shadow="false">
            <tl-flow horizontal="space-between">
              <tc-avatar :src="author.avatar" size="tiny" />
              <h3>{{ author.name }}</h3>
            </tl-flow>
            <tc-divider />
            <div c>{{ issue.content }}</div>
          </tc-card>
          <h1>Comments</h1>
          <template v-if="issue.comments.length === 0">
            <p>
              There are no comments yet. Be among the first to write something
            </p>
            <template v-if="$store.getters.valid">
              <tc-textarea
                :rows="2"
                v-model="firstComment"
                title="Write a comment"
              />
              <tc-button
                name="Submit"
                @click="submitComment()"
                :disabled="submitting || firstComment.length === 0"
              />
            </template>
            <tc-button
              v-else
              @click="signIn"
              icon="login"
              name="Sign in to write a comment"
            />
          </template>
          <tc-revealer v-else title="Write a comment">
            <div class="spacer" />

            <template v-if="$store.getters.valid">
              <tc-textarea :rows="2" v-model="firstComment" />
              <tc-button
                name="Submit"
                @click="submitComment()"
                :disabled="submitting || firstComment.length === 0"
              />
            </template>
            <tc-button
              v-else
              @click="signIn"
              icon="login"
              name="Sign in to write a comment"
            />
          </tc-revealer>
          <timosicons-comment v-for="c in issue.comments" :key="c" :id="c" />
        </div>
      </div>
      <div v-else-if="error" content>
        <tl-flow flow="column">
          <h1>Issue not found</h1>
          <p>
            The issue you are looking for does not exist, had its name changed
            or is currently unavailable
          </p>
          <tc-button icon="chevron-left" name="Issues" routeName="issues" />
        </tl-flow>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { axios } from '@/utils/axios';
import { formatDate, login } from '@/utils/functions';
import TimosIconsComment from '@/components/icons/TimosIcons-Comment.vue';
import { Issue, User, IssueComment } from '@/utils/model';

@Component({
  components: {
    'timosicons-comment': TimosIconsComment
  }
})
export default class TimosIconsRequestsDetail extends Vue {
  public error = false;
  public issue: Issue | null = null;
  public liked = false;
  public author: User | null = null;
  public firstComment = '';
  public submitting = false;

  get id(): string {
    const split = this.$route.params.issue.split('.');
    return split[split.length - 1];
  }

  public signIn(): void {
    login();
  }

  public formatDate(date: Record<string, unknown>): string {
    return formatDate(date);
  }

  async created(): Promise<void> {
    this.loadIssue();
  }

  async loadIssue(): Promise<void> {
    this.issue = (
      await axios.get(`https://api.timos.design/icons/issues/${this.id}`)
    ).data;

    if (this.issue) {
      this.author = (
        await axios.get(`https://api.timos.design/user/${this.issue.author}`)
      ).data;
    } else {
      this.error = true;
    }
  }

  public likeButton(): void {
    this.liked = !this.liked;
  }

  public async submitComment(): Promise<void> {
    if (this.firstComment.length === 0) {
      alert('Missing input');
      return;
    }
    if (this.issue) {
      this.submitting = true;
      const { data } = await axios.post(
        `https://api.timos.design/icons/comment?iid=${this.issue._id}`,
        {
          author: this.$store.getters.user._id,
          content: this.firstComment
        } as IssueComment
      );
      this.firstComment = '';
      this.submitting = false;
      this.issue.comments.push(data._id);
    }
  }
}
</script>
<style lang="scss" scoped>
.tl-flow[h] {
  width: 90vw;
}
div[c] {
  text-align: left;
}
/deep/ textarea {
  min-height: 0px !important;
}
.spacer {
  height: 10px;
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
