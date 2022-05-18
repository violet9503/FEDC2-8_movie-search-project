<template>
  <header></header>
  <main>
    <div class="main-logo-container">
      <h1 class="main-logo-title">Movie Search</h1>
    </div>
    <div class="input-container">
      <InputComponent />
    </div>
    <div class="search-result-container">
      <ErrorMsgComponent v-if="errorMsg">{{ errorMsg }}</ErrorMsgComponent>
      <MovieListComponent />
      <SpinnerComponent :isSpinnerShow="isLoading" />
    </div>
  </main>
</template>

<script>
import InputComponent from "~/components/InputComponent";
import MovieListComponent from "~/components/MovieListComponent";
import ErrorMsgComponent from "~/components/ErrorMsgComponent";

import { mapGetters } from "vuex";

export default {
  components: {
    InputComponent,
    MovieListComponent,
    ErrorMsgComponent,
  },
  computed: {
    ...mapGetters("search", ["errorMsg", "isLoading"]),
  },
};
</script>
<style lang="scss" scoped>
header {
  width: 100%;
  height: 30px;
  background-color: #512da8;
}
main {
  width: 100%;
}
.main-logo {
  &-container {
    height: 300px;
    background-color: #673ab7;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-title {
    color: white;
    font-size: 80px;
    text-align: center;
    margin: 0;
    font-weight: 500;
    font-family: serif;
  }
}
.input-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -25px;
}
.search-result-container {
  margin: 50px 150px;
}
</style>
