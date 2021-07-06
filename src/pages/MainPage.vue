// main page should arrang it
<template>
  <div class="container">
    <h1 class="title" center>Main Page</h1>
    <div class="row">
          <div class="col">
              <LeagueInfo
                :leagueName ="leagueDetails.league_name"
                :seasonName ="leagueDetails.current_season_name"
                :stageName ="leagueDetails.current_stage_name">
              </LeagueInfo>
              <GamePreview 
                :id="closetGame.match_id" 
                :hostTeam ="closetGame.home_team"
                :guestTeam ="closetGame.away_team" 
                :date ="closetGame.match_date" 
                :hour ="closetGame.match_hour"
                :stadium ="closetGame.stadium"
                :referee ="closetGame.referee_id">
              </GamePreview>
          </div>
          <div class="col">
              <LoginPage v-if="!$root.store.username"></LoginPage>
              <div v-else>
                <div v-if="favoriteGames.length>0">
                  <h1 class="title" center>My Games:</h1>
                    <GamePreview
                    v-for="g in favoriteGames"
                    :id="g.match_id" 
                    :hostTeam="g.home_team"
                    :guestTeam="g.away_team" 
                    :date="g.match_date"
                    :hour="g.match_hour"
                    :stadium="g.stadium"
                    :referee="g.referee_id"
                    :key="g.id">
                    </GamePreview>
              </div>
                  <h2 v-else class="title" center>No games added yet</h2>
              </div>
          </div>
    </div>
  </div>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
import LoginPage from "../pages/LoginPage";
import GamePreview from '../components/GamePreview.vue';
export default {
  components: {
    LeagueInfo, 
    LoginPage, 
    GamePreview
  },
  data() {
    return {
      closetGame:undefined,
      leagueDetails: undefined,
      favoriteGames:[]
    }
  },
  watch: {
    '$root.store.username': function() {
      this.update3Favorite();
    }
  },
  methods: {
    async upateLeagueDetails(){
      try {
        const response = await this.axios.get(
        this.$root.store.serverDomain+"/league/getDetails");
        const details = response.data;
        this.leagueDetails = details[0];
        this.closetGame = details[1];
      } catch (error) {
        console.log("error in update future games")
        console.log(error);
      }
    },
    async update3Favorite(){
      try {
        const response = await this.axios.get(
        this.$root.store.serverDomain+"/users/upTo3favoriteMatches");
        const games = response.data;
        this.favoriteGames.push(...games);
      } catch (error) {
        console.log("error in update favorite games")
        console.log(error);
      }
    }
  },
  mounted(){
    console.log("league main pagemounted");
    this.upateLeagueDetails(); 
    this.update3Favorite();
  }
};
</script>

<style lang="scss" scoped>

</style>
