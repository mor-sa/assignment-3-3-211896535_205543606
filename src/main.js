import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
import routes from "./routes";
import VueRouter from "vue-router";

// ROUTING
Vue.use(VueRouter);
const router = new VueRouter({
  routes
});
// IMPORTS
import Vuelidate from "vuelidate";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin, 
  InputGroupPlugin,
  BootstrapVue,
  BootstrapVueIcons
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin, 
  InputGroupPlugin,
  BootstrapVue,
  BootstrapVueIcons
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

// AXIOS STUFF
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

// GLOBAL MAIN MEMORY
// SAVE THINGS FOR ALL THE PROJECT LIKE USERNAME,DOMAIN
const shared_data = {
  serverDomain:"http://localhost:4000",
  username: undefined,
  leagueDetails: undefined,
  closetGame:undefined,
  // allTeams: undefined,
  lastSearch: {undefined},
  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
  },
  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    this.username = undefined;
  },
  saveLastSearch(last_search){
    localStorage.setItem("lastSearch_query",last_search.query);
    localStorage.setItem("lastSearch_type",last_search.type);
    this.lastSearch = last_search;
    console.log("last search saved, search query: "+last_search.query +" type: "+last_search.type);
  },
  getLastSearch(){
    // console.log("TRYING TO DO");
    // console.log(this.username);
    // console.log(localStorage.getItem('lastSearch'));
    if(this.username && localStorage.getItem('lastSearch_query') && localStorage.getItem('lastSearch_type')){
      this.lastSearch.query = localStorage.getItem('lastSearch_query');
      this.lastSearch.type = localStorage.getItem('lastSearch_type');
      this.lastSearch.results = [];
      console.log(this.lastSearch);
    }
  },
  async updateLeagueDetails(){
    try {
      const response = await this.axios.get(
        this.$root.store.serverDomain+"/league/getDetails",{withCredentials: true}
      );
      console.log(response.data);
      const details = response.data;
      this.$root.store.leagueDetails = details[0];
      this.$root.store.closetGame = details[1];
      this.$root.store.allTeams = details[0].all_teams;
    } catch (error) {
      console.log("error in update league details")
      console.log(error);
    }
  },
  // Check if a user is logged in
  getLoggedInUser(){
    if(localStorage.getItem('username')&& !this.username){
      this.username = localStorage.getItem('username');
    }
    return;
  }
};
console.log(shared_data);

new Vue({
  router,
  data() {
    return {
      store: shared_data
    };
  },
  methods: {
    // FOR DISPLAYING ALERTS!
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000
      });
    }
  },
  mounted(){
    this.getLoggedInUser();
    this.getLastSearch();
  },
  render: (h) => h(App)
}).$mount("#app");
