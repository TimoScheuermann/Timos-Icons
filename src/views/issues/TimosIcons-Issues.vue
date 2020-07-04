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
            name="Submit"
            icon="github"
            tccolor="success"
            variant="filled"
            href="https://github.com/TimoScheuermann/Timos-Icons/issues/new/choose"
          />
        </div>
        <div grid-item class="request-img">
          <img src="assets/request.png" alt="" />
        </div>
      </tl-grid>
      <tc-card rounded="true">
        <tc-headline icon="ticket" title="Issues">
          <tc-checkbox v-model="filter.request" title="Requests" />
          <tc-checkbox v-model="filter.problem" title="Problems" />
          <tc-checkbox
            v-model="filter.date"
            title="Date"
            iconChecked="chevron-down"
            iconUnchecked="chevron-up"
            iconAnimation="flip"
          />
        </tc-headline>
        <tc-table>
          <tr />
          <tr
            v-for="issue in filterdIssues"
            :key="issue.id"
            @click="open(issue.number)"
          >
            <td class="img">
              <img :src="issue.user.avatar_url" alt="user avatar" />
            </td>
            <td class="type" :style="{ color: '#' + issue.labels[0].color }">
              <span>{{ issue.labels[0].name }}</span>
            </td>
            <td>{{ issue.title }}</td>
            <td>{{ formatDate(issue.created_at) }}</td>
            <td class="state">
              <span :class="issue.state">{{ issue.state }}</span>
            </td>
            <td class="comments">
              <i class="ti-chat-bubbles" />{{ issue.comments }}
            </td>
            <td>
              <tc-button
                :href="issue.html_url"
                icon="github"
                variant="filled"
                @click.stop.prevent
              />
            </td>
          </tr>
        </tc-table>
      </tc-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import axios from '@/axios';
import { formatDate } from '@/utils';

@Component
export default class TimosIconsIssues extends Vue {
  public issues = [];
  public filter = {
    problem: true,
    request: true,
    date: false
  };

  async mounted(): Promise<void> {
    if (!this.$store.getters.hasIconRequests) {
      const { data } = await axios.get(
        'https://api.github.com/repos/TimoScheuermann/Timos-Icons/issues'
      );
      this.$store.commit('updateIconIssues', data);
    }
    this.issues = this.$store.getters.iconIssues;
  }

  get filterdIssues() {
    return (
      this.issues
        // eslint-disable-next-line
        .filter((x: any) => {
          if (!this.filter.problem && x.labels[0].name === 'Problem')
            return false;
          if (!this.filter.request && x.labels[0].name === 'Icon Request')
            return false;
          return true;
        })
        .sort(
          // eslint-disable-next-line
          (a: any, b: any) =>
            (this.filter.date ? 1 : -1) *
            (new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime())
        )
    );
  }

  public formatDate(date: string): string {
    return formatDate(date);
  }

  public open(number: string): void {
    this.$router.push({
      name: 'issuesdetails',
      params: { issue: number }
    });
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
[grid-item] {
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    margin: 0;
  }
  p {
    font-weight: 500;
  }
  text-align: center;
}
.tc-headline {
  margin-top: 0;
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
  }
}
.tc-card {
  margin-top: 40px;
}

td {
  cursor: pointer;
  &.type,
  &.state {
    span {
      padding: 2px 5px;
      font-size: 14px;
      border: 1px solid currentColor;
      border-radius: $border-radius;
    }
  }
  &.state span {
    color: #fff;
    &.open {
      background: $success;
    }
  }
  &.img img {
    $scale: 30px;
    height: $scale;
    width: $scale;
    border-radius: $scale;
  }
  &.comments i {
    color: $primary !important;
    margin-right: 10px;
  }
}
</style>
