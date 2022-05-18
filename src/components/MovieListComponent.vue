<template>
  <div class="movie-list-count" v-if="totalCount">검색 결과 : {{ totalCount }}개</div>
  <div class="movie-list-container" ref="movieList">
    <div
      v-for="movie in movieResult"
      class="movie-post__container"
      :key="movie.imdbID"
      @click="onClickMovie(movie.imdbID)"
    >
      <div class="movie-post__img-wrapper">
        <img :src="movie.Poster" />
      </div>
      <div class="movie-post__info-wrapper">
        <h2 class="movie-post__info-title">{{ movie.Title }}</h2>
        <div>{{ movie.Year }} / {{ movie.Type }}</div>
      </div>
    </div>
  </div>
  <ModalComponent v-if="isModalShow" @offModal="isModalShow = false">
    <MovieDetailComponent :movieId="this.selectedMovieId" />
  </ModalComponent>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import MovieDetailComponent from "./MovieDetailComponent.vue";

export default {
  data() {
    return {
      observer: null,
      isModalShow: false,
      selectedMovieId: "",
    };
  },
  computed: {
    ...mapGetters("search", ["totalCount", "movieResult"]),
  },
  watch: {
    movieResult(newValue) {
      if (newValue.length === 0) {
        return;
      }

      this.$nextTick(function () {
        if (this.$refs.movieList.hasChildNodes()) {
          this.observer.observe(this.$refs.movieList.lastElementChild);
        }
      });
    },
  },
  methods: {
    ...mapActions("search", ["fetchMoreSearch"]),
    onClickMovie(movieId) {
      this.selectedMovieId = movieId;
      this.isModalShow = true;
    },
  },
  mounted() {
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.observer.disconnect();
            this.fetchMoreSearch();
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );
  },
  components: { MovieDetailComponent },
};
</script>
<style lang="scss" scoped>
$focusedColor: #7c4dff;

.movie-list-count {
  font-size: 20px;
  margin: 30px;
  font-weight: bold;
}
.movie-list-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  grid-gap: 50px;
}
.movie-post {
  &__container {
    border: 5px solid grey;
    border-radius: 15px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &:hover {
      border: 5px solid $focusedColor;
    }
  }
  &__img-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    flex-grow: 1;

    & > img {
      border-radius: 10px;
    }
  }
  &__info-wrapper {
    width: 300px;
    border-top: 1px solid gray;
  }
  &__info-title {
    margin: 0;
    font-size: 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
