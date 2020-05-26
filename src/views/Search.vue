<template>
  <div class="min-full-height">
    <div class="search-container full-height container">
      <div class="logo col s12 m1 center-align">
        <img class="logo" :src="logo" />
      </div>
      <div class="row search-container__searchbar valign-wrapper">
        <div class="searchbar col s8 m11">
          <input
            class="searchbar__input"
            type="text"
            placeholder="Search here..."
            v-model="searchValue"
            @keyup.enter="getSearchResults(searchValue, pageSize, 0)"
          />
        </div>
        <div class="col s4 m1">
          <button
            class="btn"
            @click.prevent="getSearchResults(searchValue, pageSize, 0)"
          >
            Search
          </button>
        </div>
      </div>
      <div class="row" v-if="results.length">
        <div class="search-result-info col s10">
          Results for <strong>"{{ searchValue }}"</strong>: &nbsp;<span v-if="results.length > 1">{{ fromResults }} - </span
          >{{ toResults }} of {{ totalResults }}
        </div>
      </div>
      <div class="search-results">
        <h5 v-if="noResultsReturned" class="center-align">
          {{ noResultsText }}
        </h5>
        <search-result
          v-for="result in results"
          :key="result.index"
          :result="result"
        ></search-result>
      </div>
    </div>
    <Pagination
      v-if="totalResults > pageSize"
      @update-selected-page-number="
        getSearchResults(searchValue, pageSize, $event)"
        
      :selectedpage="selectedPage"
      :totalpages="totalPages"
      :pagesarray="pagesArray"
    ></Pagination>
  </div>
</template>

<script>
import SearchResult from "../components/search-result.vue";
import Pagination from "../components/Pagination.vue";
import axios from "axios";
import * as searchConstants from "../js/search-constants";

export default {
  name: "Search",
  props: {},
  data() {
    return {
      logo: require("../assets/logo.png"),
      searchValue: "",
      results: [],
      totalResults: 0,
      noResultsText:
        "Your search returned no results, please try a different search term.",
      noResultsReturned: false,
      pageSize: 10,
      selectedPage: 0,
      pagesShown: 0,
      pagesArray: []
    };
  },
  components: {
    "search-result": SearchResult,
    Pagination
  },
  methods: {
    getSearchResults(searchVal, pageSize, pageNumber) {
      axios
        .get(
          searchConstants.apiUrl +
            "?q=" +
            searchVal +
            "&size=" +
            pageSize +
            "&from=" +
            pageNumber * pageSize,
          searchConstants.header
        )
        .then(response => {
          this.results = response.data.elements;
          this.totalResults = response.data.total;
          if (response.data.elements.length) {
            this.noResultsReturned = false;
            this.selectedPage = pageNumber;
            let pageListArray = this.pagesArray;
            if (this.totalPages <= 10) {
              pageListArray = [];
              for (let page = 0; page <= this.pagesAvailable - 1; page++) {
                pageListArray.push(page);
              }
              this.pagesArray = pageListArray;
            } else if (this.selectedPage == 0) {
              pageListArray = [];
              for (let page = 0; page <= 9; page++) {
                pageListArray.push(page);
              }
              this.pagesArray = pageListArray;
            } else if (!pageListArray.includes(this.selectedPage)) {
              pageListArray = [];
              if (this.selectedPage >= 0 && this.selectedPage <= 9) {
                for (let page = 0; page <= this.pagesAvailable - 1; page++) {
                  pageListArray.push(page);
                }
              } else {
                for (
                  let page = this.selectedPage - 9;
                  page <= this.selectedPage;
                  page++
                ) {
                  pageListArray.push(page);
                }
              }
              this.pagesArray = pageListArray;
            }
          } else {
            this.noResultsReturned = true;
          }
        });
    }
  },
  computed: {
    pagesAvailable() {
      let pages = Math.ceil(this.totalResults / this.pageSize);
      if (pages >= 10) {
        return (this.pagesShown = 10);
      } else {
        return (this.pagesShown = pages);
      }
    },
    totalPages() {
      let pages = Math.ceil(this.totalResults / this.pageSize);
      return pages;
    },
    fromResults() {
      return this.selectedPage * this.pageSize + 1;
    },
    toResults() {
      if (
        this.selectedPage * this.pageSize + this.pageSize >
        this.totalResults
      ) {
        return this.totalResults;
      } else {
        return this.selectedPage * this.pageSize + this.pageSize;
      }
    }
  }
};
</script>
