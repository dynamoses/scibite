<template>
  <li :class="page == selectedpage ? 'active' : 'waves-effect'">
    <a @click="updatePageNumber(page)">{{ page + 1 }}</a>
  </li>
</template>

<script>
export default {
  props: ["page", "pagesarray", "selectedpage"],
  data() {
    return {};
  },
  methods: {
    updatePageNumber(pageNumber) {
      this.$emit("update-selected-page-number", pageNumber);
    }
  },
  computed: {
    showPage() {
      if (this.pagesarray.includes(this.page.index)) {
        return true;
      }
    }
  }
};
</script>
