/* eslint-disable */
import { Icon } from '@/models/Icon.model';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    icons: [] as Icon[]
  },
  getters: {
    icons: (state: any): Icon[] => {
      return state.icons;
    },
    iconIssues: (state: any) => {
      return state.iconIssues;
    },
    hasIconIssues: (state: any, getters: any) => {
      return getters.iconIssues.length > 0;
    },
    iconIssue: (state: any) => (number: number) => {
      return state.iconIssues.filter((x: any) => x.number === number)[0];
    }
  },
  mutations: {
    updateIcons(state: any, icons: Icon[]) {
      state.icons = icons;
    },
    updateIconIssues(state: any, issues: any[]) {
      state.iconIssues = issues;
    }
  }
});

export default store;
