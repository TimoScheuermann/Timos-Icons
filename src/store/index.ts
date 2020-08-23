/* eslint-disable */
import { Icon, Issue, User } from '@/utils/model';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    icons: [] as Icon[],
    user: {} as User,
    validated: false,
    issues: []
  },
  getters: {
    icons: (state: any): Icon[] => {
      return state.icons;
    },
    issues: (state: any) => {
      return state.issues.filter((x: Issue) => x.state === 'OPEN');
    },
    issue: (state: any) => (id: string) => {
      const split = id.split('.');
      return state.issues.filter(
        (x: any) => x._id === split[split.length - 1]
      )[0];
    },
    valid: (state: any): boolean => {
      return state.validated;
    },
    user: (state: any): User => {
      return state.user;
    }
  },
  mutations: {
    setIcons(state: any, icons: Icon[]) {
      state.icons = icons;
    },
    setIssues(state: any, issues: any[]) {
      state.issues = issues;
    },
    addIssue(state: any, issue: any) {
      state.issues.push(issue);
    },
    logout(state: any) {
      state.validated = false;
      state.user = undefined;
    },
    validate(state: any, user: User) {
      state.validated = true;
      state.user = user;
    }
  }
});

export default store;
