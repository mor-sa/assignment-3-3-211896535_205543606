<template>
  <div id="app">
    <b-navbar class="navbar navbar-dark bg-dark" toggleable="lg" type="dark" variant="info">
      <b-navbar-brand :to="{ name: 'main' }">Home </b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
        <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
          <b-nav-item :to="{ name: 'stageGames' }">Stage games</b-nav-item>
          <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-if="$root.store.username">
          <b-nav-item-dropdown right>
          <template #button-content>
            Favorites
          </template>
          <b-dropdown-item href="#">Favorite matches</b-dropdown-item>
          <b-dropdown-item href="#">Favorite players</b-dropdown-item>
          <b-dropdown-item href="#">Favorite teams</b-dropdown-item>
        </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav v-if="$root.store.username==='admin'">
          <b-nav-item :to="{ name: 'leagueMangement' }">League mangement</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
          <b-navbar-brand> Hello guest </b-navbar-brand>
          <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
          <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
        <b-nav-item-dropdown right>
          <template #button-content>
            {{username}}
          </template>
          <b-dropdown-item href="#">Favorites</b-dropdown-item>
          <b-dropdown-item href="#" @click="Logout">Log Out</b-dropdown-item>
        </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      username:this.$root.store.username
    }
  },
  methods: {
    async Logout() {
      try{
      const response = await this.axios.post(
          this.$root.store.serverDomain+"/logout",
          {
            
          }
        );
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
    catch(err){
      if (err.response){
          console.log(err.response);
          this.$root.toast("Logout", err.response, "Danger");
        }
        else console.log("response not found")
    }
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

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
