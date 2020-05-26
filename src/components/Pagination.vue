<template>
  <div class="container pagination-container center-align">
    <ul class="pagination">
      <li
        class="waves-effect prev"
        :class="{ disabled: !prevPageButtonActive }"
      >
        <a @click.prevent="updatePageNumber(selectedpage - 1)"
          ><i class="material-icons">chevron_left</i></a
        >
      </li>
      <pagination-numbers
        v-for="(page, index) in pagesarray"
        :key="page + index"
        @update-selected-page-number="updatePageNumber(page)"
        :page="page"
        :pagesarray="pagesarray"
        :selectedpage="selectedpage"
      ></pagination-numbers>

      <li
        class="waves-effect next"
        :class="{ disabled: !nextPageButtonActive }"
      >
        <a @click.prevent="updatePageNumber(selectedpage + 1)"
          ><i class="material-icons">chevron_right</i></a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import PaginationNumbers from "./pagination-numbers.vue";

export default {
  components: {
    "pagination-numbers": PaginationNumbers
  },
  props: [
    "selectedpage",
    "totalpages",
    "pagesarray"
  ],
  data() {
    return {
      pageRangeStart: 0,
      pageRangeEnd: 0
    };
  },
  methods: {
    updatePageNumber(pageNumber) {
      this.$emit("update-selected-page-number", pageNumber);
    }
  },
  computed: {
    prevPageButtonActive() {
      if (this.selectedpage > 0 && this.totalpages > 10) {
        return true;
      } else {
        return false;
      }
    },
    nextPageButtonActive() {
      if (this.selectedpage + 1 < this.totalpages && this.totalpages > 10) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
