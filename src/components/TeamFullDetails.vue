<template>
 <div class="card">
  <img class="card-img-top" :src=teamLogo alt="Card image cap">
  <b-button class="fav-btn" pill variant="outline-danger" @click="addToFavorites" :disabled="alreadyInFavorites">Favorite</b-button>
  <div class="card-body">
    <h5 class="card-title">{{teamName}}</h5>
    <ul class="list-group list-group-flush">
    <li class="list-group-item">Id: {{id}}</li>
    <li class="list-group-item">Coach:</li>

    <!-- <CoachFullDetails :id="coach.id"> <CoachFullDetails> -->

    <li class="list-group-item">Players:</li>
    <div class="row">
      <PlayerPreview class="playerss"
        v-for="p in players"
        :id="p.id" 
        :fullName="p.name" 
        :teamName="p.team_name" 
        :imageUrl="p.image" 
        :position="toString(p.position)" 
        :key="p.id"></PlayerPreview>
    </div>
    <li class="list-group-item">Past games:</li>
    <div>
    <GameFullDetails
      v-for="g in pastMatches"
      :id="g.match_id" 
      :hostTeam="g.home_team" 
      :guestTeam="g.away_team" 
      :date="g.match_date" 
      :hour="g.match_hour"
      :stadium="g.stadium"
      :result="g.result"
      :events="g.events"
      :referee="g.referee_id"
      :key="g.id"></GameFullDetails>
  </div>
    <li class="list-group-item">Future games:</li>

    <div>
    <GamePreview
      v-for="g in futureMatches"
      :id="g.match_id" 
      :hostTeam="g.home_team" 
      :guestTeam="g.away_team" 
      :date="g.match_date" 
      :hour="g.match_hour"
      :stadium="g.stadium"
      :referee="g.referee_id"
      :key="g.id"></GamePreview>
  </div>
  
  </ul>
  </div>
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
      },
  }, 
  data() {
    return {
      teamName: undefined,
      teamLogo: undefined,
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
          this.$root.store.serverDomain+"/teams/teamFullDetails/"+this.id, {withCredentials: true}
        );
        const details = response.data;
        this.teamName = details[0];
        this.teamLogo = details[1];
        this.players=details[2];
        this.coach=details[3];
        this.pastMatches=details[4];
        this.futureMatches=details[5];
      } catch (error) {
        console.log("error in update team full details")
        console.log(error);
      }
    },
     async checkIfDisableFavorites(){
      // not a user
      if(!this.$root.store.username || !this.id){
        this.alreadyInFavorites = true;
      }
      // user logged in
      else{
        // get users favorites and check if the team's already in
        const response = await this.axios.get(
          this.$root.store.serverDomain+"/users/favoriteTeams", {withCredentials: true}
        );
        this.alreadyInFavorites = false;
        response.data.forEach((favTeam) => {
          if (favTeam.id == this.id){
            this.alreadyInFavorites = true;
          }
        });
      }
    },
    async addToFavorites(){
      try {
        const response = await this.axios.post(
          this.$root.store.serverDomain+"/users/favoriteTeams",
          {
            teamId: this.id
          },{withCredentials: true}
        );
        this.$root.toast("Favorite teams", response.data, "success");
        this.alreadyInFavorites = true;
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
    this.checkIfDisableFavorites();
  }
};
</script>

<style scoped>
 
   body{
    background-color: beige;
  }

  .card-body{
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .card{
    width: 95%;
    display: 'flex';
    align-items: center;
    justify-content: center;
  }
  .playerss{
    /* display: inline-block;
    position: relative; */
    display: 'flex';
    align-items: center;
    justify-content: center;
  }
  .fav-btn{
    /* position: absolute; */
    top:0;
    right: 0;
    text-align: right;
  }
</style>
