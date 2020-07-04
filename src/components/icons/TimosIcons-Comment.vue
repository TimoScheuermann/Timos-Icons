<template>
  <tc-card rounded="true" :dark="isFromTimo(comment)">
    <div class="head">
      <img class="avatar" :src="comment.user.avatar_url" alt="profile pic" />
      <div class="info">
        <div class="author">{{ comment.user.login }}</div>
        <div class="time">
          {{ timePrefix }} {{ formatDate(comment.created_at) }}
        </div>
      </div>
      <div
        class="association owner"
        v-if="isFromTimo(comment) && !hasOpenedIssue(comment)"
      >
        Owner
      </div>
      <div class="association author" v-if="hasOpenedIssue(comment)">
        Author
      </div>
    </div>
    <div class="content" ref="body"></div>
    <div class="content slot" v-if="$slots.default">
      <slot />
    </div>
  </tc-card>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { formatDate } from '@/utils';
import * as MarkdownIt from 'markdown-it';

@Component
export default class TimosIconsComment extends Vue {
  // eslint-disable-next-line
  @Prop() comment!: any;
  // eslint-disable-next-line
  @Prop() issue!: any;
  @Prop() timePrefix!: string;
  @Prop({ default: '' }) title!: string;

  @Watch('comment')
  commentChanged(): void {
    const md = new MarkdownIt();
    (this.$refs.body as HTMLElement).innerHTML = md.render(this.comment.body);
  }

  mounted(): void {
    this.commentChanged();
  }
  // eslint-disable-next-line
  public isFromTimo(comment: any): boolean {
    return comment.author_association === 'OWNER';
  }
  // eslint-disable-next-line
  public hasOpenedIssue(comment: any): boolean {
    return comment.user.login === this.issue.user.login;
  }

  public formatDate(date: string): string {
    return formatDate(date);
  }
}
</script>
<style lang="scss" scoped>
.tc-card {
  margin-top: 30px;
  .head {
    width: 100%;
    display: flex;
    align-items: center;
    img.avatar {
      $size: 50px;
      margin-right: 20px;
      width: $size;
      height: $size;
      border-radius: $size;
    }
    .info {
      text-align: left;
      .author {
        font-size: 18px;
        font-weight: bold;
        opacity: 0.7;
      }
      .time {
        opacity: 0.4;
        font-size: 13px;
        margin-top: 3px;
      }
    }
    position: relative;
    .association {
      position: absolute;
      top: -10px;
      right: -10px;
      &.author {
        color: $success;
      }
      &.owner {
        color: $error;
      }
    }
  }
  .content {
    text-align: left;
    padding-top: 10px;
    margin-bottom: -20px;
    &.slot {
      padding: 20px;
    }
  }
}
</style>
