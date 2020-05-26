import Vue from "vue";
import App from "./App.vue";
import "./scss/index.scss";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

Vue.filter('snippet', (value) => {
  if (value.length > 250) {
    return value.slice(0, 250) + '...' 
  }
});
