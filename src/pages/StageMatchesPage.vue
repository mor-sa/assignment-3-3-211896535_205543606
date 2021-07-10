//stage match page, works good just design
<template>
    <div class="container">
      <h1 class="title" center>Stage Page</h1>
      <div class="row">
        <div id="matches-container">
          <h4>All Games in the league</h4>
          <div id="future-games" class="col">
            <span>FUTURE GAMES:</span>
            <br>
            <div>
              <GamePreview class="game"
                v-for="g in futureGames"
                :id="g.match_id" 
                :hostTeam="g.home_team"
                :guestTeam="g.away_team" 
                :date="g.match_date"
                :hour="g.match_hour"
                :stadium="g.stadium"
                :referee="g.referee_id"
                :key="g.id">
                <h1>HELLO </h1>
              </GamePreview>
            </div>
          </div>
          <div id="past-games" class="col">
              <span> PAST GAMES:</span>
              <br>
              <GameFullDetails class="game"
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
    console.log("future games mounted");
    this.updateFutureGames(); 
    this.updatePastGames();
  }
}
</script>
<style>
  #future-games,#past-games{
    width: 50%;
    float: left;
  }
  .game-prev{
    height: max-content;
    width: max-content;
  }

</style>