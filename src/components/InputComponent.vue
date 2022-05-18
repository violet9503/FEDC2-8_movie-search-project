<template>
  <label for="search-input"></label>
  <input
    type="text"
    id="search-input"
    placeholder="검색어를 입력하세요"
    v-model="inputValue"
    @focus="isFocused = true"
    @blur="isFocused = false"
    @keyup.enter="onSearch"
  />
  <button
    type="button"
    class="search-input-button"
    :class="{ isFocused }"
    aria-label="Search"
    @click="onSearch"
  >
    <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
  </button>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      isFocused: false,
      inputValue: "",
    };
  },
  methods: {
    ...mapActions("search", ["fetchSearch"]),
    onSearch() {
      if (!this.inputValue) {
        alert("검색어를 입력해주세요!");
        return;
      }

      this.fetchSearch(this.inputValue);
    },
  },
};
</script>
<style lang="scss" scoped>
$focusedColor: #7c4dff;
#search-input {
  width: 40%;
  border: 1px solid gray;
  border-radius: 10px 0 0 10px;
  font-size: 20px;
  padding: 10px;
  padding-left: 20px;
  &:focus {
    outline: none;
    border: 1px solid $focusedColor;
  }
}
.search-input-button {
  border: 0;
  align-self: stretch;
  width: 60px;
  font-size: 20px;
  background-color: gray;
  color: white;
  border-radius: 0 10px 10px 0;
  cursor: pointer;
  &.isFocused,
  &:hover {
    background-color: $focusedColor;
  }
}
</style>
