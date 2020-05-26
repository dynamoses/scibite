<template>
  <div class="row search-result z-depth-4">
    <h5 class="search-result__header">{{ result.primaryLabel }}</h5>
    <div>
      <a class="search-result__link" :href="result.primaryID" target="_blank">{{
        result.primaryID
      }}</a>
    </div>
    <div v-if="result.textualDefinitions.length">
      {{ result.textualDefinitions[0] | snippet }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["result"],
  data() {
    return {};
  }
};
</script>
