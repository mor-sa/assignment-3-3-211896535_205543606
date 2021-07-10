// main page should arrang it
<template>
  <div class="container">
    <h1 class="title" center>League Management Website</h1>
    <div class="row">
          <div class="col">
            <h4>Current League</h4>
              <LeagueInfo v-if="leagueDetails!=undefined"
                :leagueName ="leagueDetails.league_name"
                :seasonName ="leagueDetails.current_season_name"
                :stageName ="leagueDetails.current_stage_name">
              </LeagueInfo>
              <h4>Next Game in League</h4>
              <GamePreview v-if="closetGame!=undefined"
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
              <LoginPage id="login-component" v-if="!$root.store.username"></LoginPage>
              <div v-else>
                <div v-if="favoriteGames.length>0">
                  <h4 center>My Games:</h4>
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
    LoginPage,
    LeagueInfo,
    GamePreview
  },
  data() {
    return {
      closetGame: this.$root.store.closetGame,
      leagueDetails: this.$root.store.leagueDetails,
      favoriteGames:[]
      }
  },
  watch: {
    '$root.store.username': function() {
      this.update3Favorite();
    }
  },
  methods: {
    async update3Favorite(){
      try {
        const response = await this.axios.get(
          this.$root.store.serverDomain+"/users/upTo3favoriteMatches",{withCredentials: true}
        );
        const games = response.data;
        this.favoriteGames.push(...games);
      } catch (error) {
        console.log("error in update favorite games")
        console.log(error);
      }
    }
  },
  created(){
  },
  mounted(){
    console.log("league main pagemounted");
    this.update3Favorite();
    
  }
};
</script>

<style lang="scss" scoped>

</style>
