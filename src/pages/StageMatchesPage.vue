<template>
    <div class="container">
    <h1 class="title" center>Stage Page</h1>
    <div class="row">
        <div class="col">
            FUTURE GAMES:
            <GamePreview
            v-for="g in futureGames"
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
        <div class="col">
            past games:
            <GameFullDetails
            v-for="g in pastGames"
            :id="g.match.match_id" 
            :hostTeam="g.match.home_team"
            :guestTeam="g.match.away_team" 
            :date="g.match.match_date"
            :hour="g.match.match_hour"
            :stadium="g.match.stadium"
            :referee="g.match.referee_id"
            :result ="g.match.result"
            :events ="g.match_events"
            :key="g.match.id">
            </GameFullDetails>
        </div>
        </div>
    </div>
</template>
<script>
import GameFullDetails from '../components/GameFullDetails.vue'
import GamePreview from '../components/GamePreview.vue'
export default {
  components: { GamePreview, GameFullDetails },
    name: 'StageMatchesPage'
,
data() {
    return {
        futureGames:[],
        pastGames:[]
    }
},
methods: {
    async updateFutureGames(){
      try {
        const response = await this.axios.get(
        this.$root.store.serverDomain+"/matches/getFutureMatches");
        const futureGames = response.data;
        //const arr = futureGames.map((element) => element)
        console.log("X",futureGames);
        this.futureGames = [];
        //console.log(response)
        this.futureGames.push(...futureGames);
      } catch (error) {
        console.log("error in update future games")
        console.log(error);
      }
    },
    async updatePastGames(){
      try {
        const response = await this.axios.get(
        this.$root.store.serverDomain+"/matches/getPastMatches");
        const pastGames = response.data;
        //const arr = futureGames.map((element) => element)
        //console.log(pastGames[0]);
        this.pastGames = [];
        //console.log(response)
        this.pastGames.push(...pastGames);
      } catch (error) {
        console.log("error in update past games")
        console.log(error);
      }
    }
  }, 
  async mounted(){
    console.log("future games mounted");
    await this.updateFutureGames(); 
    await this.updatePastGames();
  }
}
</script>
<style>  
</style>