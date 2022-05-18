<template>
  <div class="movie-detail-container">
    <SpinnerComponent :isSpinnerShow="isLoading" />
    <div class="movie-detail__img-wrapper">
      <img :src="renderImg" />
    </div>
    <div class="movie-detail__info-wrapper">
      <h4 class="movie-detail__info-title">{{ movie.Title }}</h4>
      <div class="movie-detail__detail-info" v-for="[name, info] of renderMovie">
        <div class="movie-detail__info-name">{{ name }}</div>
        <div class="movie-detail__info-value">{{ info }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getMovie } from "~/utils/api";

const MOVIE_RENDER_PROPERTY_LIST = [
  "Actors",
  "Awards",
  "Country",
  "Director",
  "Genre",
  "Language",
  "Plot",
  "Released",
  "Runtime",
  "Type",
  "Writer",
  "Year",
  "totalSeasons",
];

export default {
  data() {
    return {
      movie: {},
      isLoading: false,
    };
  },
  props: ["movieId"],
  computed: {
    renderMovie() {
      return Object.entries(this.movie).filter(([name, _]) =>
        MOVIE_RENDER_PROPERTY_LIST.includes(name)
      );
    },
    renderImg() {
      if (this.movie.Poster) return this.movie.Poster.replace("SX300", "SX350");
    },
  },
  created: async function () {
    this.isLoading = true;
    this.movie = await getMovie(this.movieId);
    this.isLoading = false;
  },
};
</script>
<style lang="scss" scoped>
.movie-detail-container {
  display: flex;
}
.movie-detail {
  &__img-wrapper {
    margin: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__info-wrapper {
    padding: 15px 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__info-title {
    font-size: 30px;
    margin: 0;
    margin-bottom: 15px;
  }
  &__info-name {
    width: 100px;
    min-width: 100px;
    font-weight: bold;
    font-size: 15px;
  }
  &__detail-info {
    display: flex;
    align-items: center;
  }
}
</style>
