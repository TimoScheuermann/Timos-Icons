<template>
  <div class="timosicons-issues">
    <tc-hero tc-dark-container>
      <img alt="" slot="background" src="assets/hero.jpg" />
      <img alt="" src="assets/icon-request-concept.svg" />
      <h1>The Icon Leaderboard</h1>
      <p>
        Find the most requested icon, the icons I am working on and much more
      </p>
    </tc-hero>
    <div content>
      <tl-grid>
        <div grid-item>
          <h1>Submit your own request</h1>
          <p>
            You either can't find the right icon for your project or there is
            something wrong with an icon or You want something to be changed,
            then submit Your issue using the button below.
          </p>
          <tc-button
            v-if="$store.getters.valid"
            name="Submit Issue"
            icon="ticket"
            tfbackground="success"
            variant="filled"
            @click="submitIssue"
          />
          <tc-button
            v-else
            name="Sign in to submit"
            icon="login"
            tfbackground="success"
            variant="filled"
            @click="signIn"
          />
        </div>
        <div grid-item class="request-img">
          <img src="assets/request.png" alt="" />
        </div>
      </tl-grid>
      <tc-card title="Issues" rounded="true">
        <tc-table :striped="true" @sort="s => (sort = s)">
          <template slot="head">
            <tc-th attribute="type">Type</tc-th>
            <tc-th attribute="title">Title</tc-th>
            <tc-th attribute="date">Date</tc-th>
            <tc-th attribute="likes">Likes</tc-th>
          </template>
          <tc-tr
            v-for="issue in filterdIssues"
            :key="issue._id"
            @click="open(issue)"
          >
            <tc-td
              c
              :tfcolor="
                issue.type.toLowerCase() === 'request' ? 'success' : 'error'
              "
            >
              {{ issue.type.toLowerCase() }}
            </tc-td>
            <tc-td>{{ issue.title }}</tc-td>
            <tc-td>{{ formatDate(issue.created_at) }}</tc-td>
            <tc-td tfcolor="error">
              <i class="ti-heart" />{{ issue.likes }}
            </tc-td>
          </tc-tr>
        </tc-table>
      </tc-card>
    </div>

    <tc-modal
      v-model="newIssueModal.opened"
      :subtitle="newIssueModal.modalInfo"
      title="New Issuse"
    >
      <div class="issue-form">
        <div class="form-head">
          <tc-input
            v-model="newIssueModal.title"
            title="Title"
            placeholder="Title"
          />
          <tc-select
            title="Type"
            placeholder="Select"
            v-model="newIssueModal.type"
            :values="['Request', 'Problem']"
          />
        </div>
        <tc-textarea v-model="newIssueModal.content" />
        <tc-button
          name="Submit"
          :disabled="newIssueModal.submitting"
          tfbackground="success"
          icon="reply"
          variant="filled"
          @click="submitForm"
        />
      </div>
    </tc-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { axios } from '@/utils/axios';
import { formatDate, login } from '@/utils/functions';
import { Issue, IssueModal } from '@/utils/model';

@Component
export default class TimosIconsIssues extends Vue {
  public issues = [];
  public sort: { attribute: string; direction: number } = {
    attribute: 'comments',
    direction: -1
  };

  public newIssueModal: IssueModal = { opened: false };

  async mounted(): Promise<void> {
    if (this.$store.getters.issues.length === 0) {
      const { data } = await axios.get('https://api.timos.design/icons/issues');
      this.$store.commit('setIssues', data);
    }
  }

  get filterdIssues() {
    return this.$store.getters.issues.sort((a: Issue, b: Issue) => {
      let compare = 0;
      if (this.sort.attribute === 'type') {
        compare = a.type.localeCompare(b.type);
      }
      if (this.sort.attribute === 'title') {
        compare = a.title.localeCompare(b.title);
      }
      if (this.sort.attribute === 'date') {
        compare = a.date - b.date;
      }
      if (this.sort.attribute === 'likes') {
        compare = (a.likes || 0) - (b.likes || 0);
      }
      return compare * this.sort.direction;
    });
  }

  public formatDate(date: string): string {
    return formatDate(date);
  }

  public open(issue: Issue): void {
    this.$router.push({
      name: 'issuesdetails',
      params: { issue: issue.title + '.' + issue._id }
    });
  }

  public signIn(): void {
    login();
  }

  public submitIssue(): void {
    this.newIssueModal.opened = true;
  }

  public async submitForm(): Promise<void> {
    let errorMessage: string | undefined = undefined;

    if ((this.newIssueModal.content || '').length === 0) {
      errorMessage = 'Please insert a message';
    }
    if ((this.newIssueModal.type || '').length === 0) {
      errorMessage = 'Please select a type';
    }

    if ((this.newIssueModal.title || '').length === 0) {
      errorMessage = 'Please insert a title';
    }

    if (errorMessage) {
      this.newIssueModal.modalInfo = errorMessage;
      this.$forceUpdate();
      return;
    }

    this.newIssueModal.submitting = true;

    const { data } = await axios.post('issue', {
      author: this.$store.getters.user._id,
      type: (this.newIssueModal.type || '').toUpperCase(),
      title: this.newIssueModal.title,
      content: this.newIssueModal.content
    } as Issue);
    this.newIssueModal = { opened: false };
    this.$store.commit('addIssue', data);
  }
}
</script>

<style lang="scss" scoped>
.tc-hero {
  text-align: center;
  color: #fff;
  h1 {
    margin: 0;
  }
  p {
    margin: 0;
    max-width: 400px;
  }
}
[content] {
  padding-top: 30px;
}

.issue-form {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  margin-bottom: 20px;
  width: 600px;
  max-width: 100%;
  .form-head {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 100px;
  }
}

[grid-item] {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  h1 {
    margin: 0;
  }
}

.request-img {
  @media #{$isMobile} {
    display: none;
  }
  height: 200px;
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    filter: drop-shadow(0px 3px 10px rgba(#000, 0.1));
  }
}
.tc-card {
  margin-top: 40px;
}

.tc-td {
  cursor: pointer;
  white-space: nowrap;
  i {
    margin-right: 10px;
  }
  &[c] {
    text-transform: capitalize;
    font-weight: 500;
  }
}
</style>
