import { getMovies } from "~/utils/api";

export default {
  namespaced: true,
  state: () => ({
    totalCount: 0,
    movieResult: [],
    inputValue: "",
    currentPage: 0,
    errorMsg: "",
    isLoading: false,
  }),
  getters: {
    totalCount: state => {
      return state.totalCount;
    },
    movieResult: state => {
      return state.movieResult;
    },
    errorMsg: state => {
      return state.errorMsg;
    },
    isLoading: state => {
      return state.isLoading;
    },
  },
  mutations: {
    resetState(state) {
      state.totalCount = 0;
      state.movieResult = [];
      state.inputValue = "";
      state.currentPage = 0;
      state.errorMsg = "";
    },
    setSearchResults(state, { totalResults, Search }) {
      state.totalCount = totalResults;
      state.movieResult = state.movieResult.concat(Search);
      state.currentPage += 1;
    },
    setInputValue(state, inputValue) {
      state.inputValue = inputValue;
    },
    setSearchErrorMsg(state, errorMsg) {
      state.errorMsg = errorMsg;
    },
    setLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async fetchSearch({ commit }, inputValue) {
      commit("setLoading", true);

      const res = await getMovies(inputValue);
      commit("resetState");

      if (res.Response === "True") {
        commit("setInputValue", inputValue);
        commit("setSearchResults", res);
      } else {
        commit("setSearchErrorMsg", res.Error);
      }

      commit("setLoading", false);

      console.log(res);
    },
    async fetchMoreSearch({ state, commit }) {
      if (state.totalCount < state.currentPage * 10) {
        return;
      }

      commit("setLoading", true);

      const res = await getMovies(state.inputValue, state.currentPage + 1);

      if (res.Response === "True") {
        commit("setSearchResults", res);
      } else {
        commit("setSearchErrorMsg", res.Error);
      }

      commit("setLoading", false);

      console.log(res);
    },
  },
};
