<template>
  <div class="timosicons-comment" v-if="author && comment">
    <tl-flow head>
      <tl-flow>
        <tc-avatar size="tiny" :src="author.avatar" />
        <tl-flow flow="column" vertical="start">
          <h4>{{ author.name }}</h4>
          <div>{{ formatDate(comment.date) }}</div>
        </tl-flow>
      </tl-flow>
      <div>
        <tc-link tfcolor="error" v-if="isAuthor" @click="del">delete</tc-link>
        <!-- <tc-link @click="replyContext = true">reply</tc-link> -->
      </div>
    </tl-flow>
    <p>{{ comment.content }}</p>
    <template v-if="replyContext">
      <tc-divider />
      <tc-textarea rows="2" />
      <tl-flow horizontal="space-between">
        <tc-button name="cancel" />
        <tc-button name="reply" />
      </tl-flow>
    </template>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { formatDate } from '@/utils/functions';
import { axios } from '@/utils/axios';
import { IssueComment, User } from '@/utils/model';

@Component
export default class TimosIconsComment extends Vue {
  @Prop() id!: string;

  public comment: IssueComment | null = null;
  public author: User | null = null;
  public replyContext = false;

  get isAuthor(): boolean {
    if (this.comment) {
      return this.comment.author === this.$store.getters.user._id;
    }
    return false;
  }

  async mounted(): Promise<void> {
    this.comment = (
      await axios.get(`https://api.timos.design/icons/comment/${this.id}`)
    ).data;

    if (this.comment) {
      this.author = (
        await axios.get(`https://api.timos.design/user/${this.comment.author}`)
      ).data;
    }
  }

  public formatDate(date: string): string {
    return formatDate(date);
  }

  public async del(): Promise<void> {
    // delete comment
  }
}
</script>
<style lang="scss" scoped>
.timosicons-comment {
  margin-top: 20px;
  .tl-flow[head] {
    h4 {
      margin: 0;
    }
    justify-content: space-between !important;
    .tc-avatar {
      margin-right: 20px;
    }
  }
  .tc-link[d] {
    margin-right: 10px;
  }
  p {
    margin-bottom: 0;
  }
  /deep/ textarea {
    min-height: 0px !important;
  }
}
</style>
