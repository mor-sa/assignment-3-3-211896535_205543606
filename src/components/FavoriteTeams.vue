  // favorite teams page should fix also in server side or something
<template>
  <div>
      <div class="card-group">
    <TeamPreview
      v-for="t in teams"
      :id="t.id" 
      :teamName="t.name"
      :teamLogo="t.logo"
      :key="t.id"></TeamPreview>
  </div>
  </div>
</template>

<script>
import TeamPreview from "./TeamPreview.vue";
export default {
  name: "FavoriteTeams",
  components: {
    TeamPreview
  }, 
  data() {
    return {
      teams: []
    };
  },
  methods: {
    async updateTeams(){
      console.log("response");
      try {
        const response = await this.axios.get(
          this.$root.store.serverDomain+"/users/favoriteTeams", {withCredentials: true}
        );
        const teams = response.data;
        this.teams = [];
        this.teams.push(...teams);
        console.log(teams);
        console.log(response);
      } catch (error) {
        console.log("error in update teams")
        console.log(error);
      }
    }
  }, 
  mounted(){
    console.log("favorite teams mounted");
    this.updateTeams(); 
  }
};
</script>

<style></style>
