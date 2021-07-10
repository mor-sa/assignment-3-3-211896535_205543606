<template>
  <div id="app">
    <b-navbar class="navbar navbar-dark bg-dark" toggleable="lg" type="dark" variant="info">
      <b-navbar-brand :to="{ name: 'main' }">Home </b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
        <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
          <b-nav-item :to="{ name: 'stageMatches' }">Stage Games</b-nav-item>
          <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-if="$root.store.username">
          <b-nav-item-dropdown>
          <template #button-content>Personal </template>
          <b-dropdown-item :to="{ name: 'favoriteMatches' }">My Games</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'favoritePlayers' }">My Players</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'favoriteTeams' }">My Teams</b-dropdown-item>
        </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav v-if="$root.store.username==='admin'">
          <b-nav-item :to="{ name: 'leagueMangement' }">League Mangement</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="$root.store.username">
                  <b-nav-item-dropdown right>
                  <template #button-content>{{$root.store.username}}</template>
                  <b-dropdown-item href="#" @click="Logout">Log Out</b-dropdown-item>
        </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
        <b-navbar-brand> Hello guest </b-navbar-brand>
          <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
          <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  //MAIN APP COMPONENT
  name: "App",
  data() {
    return {
      username: undefined
    }
  },
  mounted(){
    this.username=this.$root.store.username;
    this.updateLeagueDetails();
    // this.checkIfUser();
  },
  // watch: {
  //   '$root.store.username': function(username) {
  //     this.username = username;
  //     console.log('watch', username);
  //   }
  // },
  created(){
    this.updateLeagueDetails();
    this.checkIfUser();
  },
  methods: {
    checkIfUser(){
      if(localStorage.getItem('username') && !this.$root.store.username){
        this.$root.store.username = localStorage.getItem('username');
    }
    },
    //LOGOUT
    async Logout() {
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");  
      try{
        const response = await this.axios.post(
            this.$root.store.serverDomain+"/logout",{withCredentials: true}
          );
      //console.log("here");
      }
      catch(err){
        if (err.response){
            console.log(err.response);
            this.$root.toast("Logout", err.response, "Danger");
          }
          else console.log("response not found")
      }
    },
    async updateLeagueDetails(){
      try {
        const response = await this.axios.get(
          this.$root.store.serverDomain+"/league/getDetails",{withCredentials: true}
        );
        const details = response.data;
        this.$root.store.leagueDetails = details[0];
        this.$root.store.closetGame = details[1];
        this.$root.store.allTeams = details[0].all_teams;
      } catch (error) {
        console.log("error in update league details")
        console.log(error);
      }
    },
  }
};

</script>

<style lang="scss">

@import "@/scss/form-style.scss";
// @font-face{
//     font-family: 'Quicksand', sans-serif;
//     src: url("https://fonts.googleapis.com/css?family=Quicksand:300,500");
//     font-weight: 300;
// }
body {
  background-image: url('https://www.pe.com/wp-content/uploads/2021/05/xxxx_spo_ocr-l-soccer-generic-stock-001-17.jpg');
  background-size: cover;
}
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
