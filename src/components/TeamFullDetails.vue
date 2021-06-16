// not works!
<template>
 <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="https://www.gstatic.com/webp/gallery/1.jpg"  alt="Card image cap" >
  <div class="card-body">
    <h5 class="card-title">Team Full details</h5>
    <p class="card-text">some information about team</p>
    <ul class="list-group list-group-flush">
    <li class="list-group-item">team id: {{id}}</li>
    <li class="list-group-item">team's coach:</li>

    <!-- <CoachFullDetails :id="coach.id"> <CoachFullDetails> -->

    <li class="list-group-item">teams's players:</li>
    <div class="card-group">
    <PlayerPreview
      v-for="p in players"
      :id="p.id" 
      :fullName="p.name" 
      :teamName="p.team_name" 
      :imageUrl="p.image" 
      :position="p.position" 
      :key="p.id"></PlayerPreview>
  </div>

    <li class="list-group-item">past games:</li>
        <div>
    <GameFullDetails
      v-for="g in pastMatches"
      :id="g.id" 
      :hostTeam="g.home_team" 
      :guestTeam="g.away_team" 
      :date="g.match_date" 
      :hour="g.match_hour"
      :stadium="g.stadium"
      :result="g.result"
      :events="g.events" 
      :key="g.id"></GameFullDetails>
  </div>
    <li class="list-group-item">future games:</li>

    <div>
    <GamePreview
      v-for="g in futureMatches"
      :id="g.id" 
      :hostTeam="g.home_team" 
      :guestTeam="g.away_team" 
      :date="g.match_date" 
      :hour="g.match_hour"
      :stadium="g.stadium" 
      :key="g.id"></GamePreview>
  </div>
  
  </ul>
  </div>
    <b-button pill variant="outline-danger" @click="addToFavorites" :disabled="!alreadyInFavorites">add to favorites</b-button>
</div>
</template>

<script>
import CoachFullDetails from "./CoachFullDetails.vue"
import PlayerPreview from "./PlayerPreview.vue"
import GamePreview from "./GamePreview.vue"
import GameFullDetails from "./GameFullDetails.vue"

export default {
  name: "TeamFullDetails",
  components:{
    // CoachFullDetails,
    PlayerPreview,
    GamePreview,
    GameFullDetails
  },
  props: {
      id: {
        type: Number,
        required: true
      }
  }, 
  data() {
    return {
      players: [],
      coach: undefined,
      pastMatches: [],
      futureMatches:[],
      alreadyInFavorites: false
    }
  },
 methods: {
    async updateTeam(){
      console.log("response");
      try {
        const response = await this.axios.get(
          this.$root.store.serverDomain+"/teams/teamFullDetails/"+this.id,
        );
        const details = response.data;
        this.players=details[0];
        this.coach=details[1];
        this.pastMatches=details[2];
        this.futureMatches=details[3];
      } catch (error) {
        console.log("error in update team full details")
        console.log(error);
      }
    },
    async checkIfInFavorites(){
      this.alreadyInFavorites=true;
    },
    async addToFavorites(){
      try {
        const response = await this.axios.post(
          this.$root.store.serverDomain+"/users/favoriteTeams",
          {
            teamId: this.id
          }
        );
        console.log(response);
        this.$root.toast("Favorite teams", response.data, "success");
      } 
      catch (err) {
        //this.form.submitError = err.response.data.message;
        this.$root.toast("Favorite teams", err.response.data, "warning"); 
      }
    }
  }, 
  mounted(){
    console.log("full details team mounted");
    this.updateTeam(); 
    this.checkIfInFavorites();
  }
};
</script>

<style>

</style>
