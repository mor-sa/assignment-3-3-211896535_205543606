//Favorite game page
<template>
  <div>
    <GamePreview
      v-for="g in games"
      :id="g.match_id" 
      :hostTeam="g.home_team" 
      :guestTeam="g.away_team" 
      :date="g.match_date" 
      :hour="g.match_hour"
      :stadium="g.stadium"
      :referee="g.referee_id"
      :key="g.id"></GamePreview>
  </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";
export default {
  name: "FavoriteGames",
  components: {
    GamePreview
  }, 
  data() {
    return {
      games: []
    };
  },
  methods: {
    async updateGames(){
      //if (!$root.store.username) return undefined;
      console.log("response");
      try {
        const response = await this.axios.get(
          this.$root.store.serverDomain+"/users/favoriteMatches", {withCredentials: true}
        );
        const games = response.data;
        console.log(games);
        this.games = [];
        this.games.push(...games);
        console.log(games);
      } catch (error) {
        console.log("error in update games")
        console.log(error);
      }
    }
  }, 
  mounted(){
    console.log("favorite games mounted");
    this.updateGames(); 
  }
};
</script>

<style></style>
