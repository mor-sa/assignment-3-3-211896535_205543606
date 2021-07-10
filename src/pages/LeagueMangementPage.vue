<template>
<div>
<div v-if="$root.store.username!=admin" class="container">
    <h1 class="title" center>Main Page</h1>
        <div class="row">
            PAST games:
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
    <div class="row">
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
        <div class="row">
            <router-link :to="{ name: 'addMatch'}"><b-button pill variant="primary" >Add match</b-button></router-link>
            <router-link :to="{ name: 'addResult'}"><b-button pill variant="primary">Add Result</b-button></router-link>
            <router-link :to="{ name: 'addEventCalendar'}"><b-button pill variant="primary">Add Events</b-button></router-link>
        </div>
    </div>
    <div v-else> NOT AN ADMIN 
</div>
</div>
</template>
<script>
import GamePreview from '../components/GamePreview.vue'
import GameFullDetails from '../components/GameFullDetails.vue'
export default {
  components: { GamePreview, GameFullDetails },
    name: 'leagueMangementPage'
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
          this.$root.store.serverDomain+"/matches/getFutureMatches",{withCredentials: true}
        );
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
          this.$root.store.serverDomain+"/matches/getPastMatches",{withCredentials: true}
        );
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
mounted(){
    console.log("league mangement mounted");
    this.updateFutureGames(); 
    this.updatePastGames();
  }
}
</script>
<style>
    
</style>