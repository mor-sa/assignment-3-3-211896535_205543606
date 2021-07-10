// a preview for future games, works
<template>
  <div class="game-preview">
    <b-button id="fav-btn" pill variant="outline-danger" @click="addToFavorites" :disabled="alreadyInFavorites">Add to Favorites</b-button>
    <div :title="id" class="game-title">
      <b>Game Id:</b> {{ id }}
    </div>
    <ul class="game-content">
      <!-- <li> <b>Host Team:</b><router-link :to="{ name: 'team', params: { id: parseInt(hostTeam)}}">{{ hostTeamName }}</router-link></li> -->
      <li> <b>Host Team:</b> {{ hostTeamName }}</li> 
      <li> <b>Away Team:</b> {{ awayTeamName }}</li>
      <li> <b>Date:</b> {{ dateFormatted }}</li>
      <li> <b>Time:</b> {{ hourFormatted }}</li>
      <li> <b>Stadium:</b> {{stadium}}</li>
      <li> <b>Referee Id:</b> {{referee}}</li>

    </ul>
  </div>
</template>

<script>
export default {
  name: "GamePreview",
  props: {
      id: {
        type: Number,
        required: true
      },
      hostTeam: {
        type: String,
        required: true
      },
      guestTeam: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      hour: {
        type: String,
        required: true
      },
      stadium:{
        type: String,
        required: true
      },
      referee:{
        type: Number
      }
  },
  data() {
    return {
      hostTeamName: this.hostTeam,
      awayTeamName: this.guestTeam,
      //dateFormatted: undefined,
      //hourFormatted: undefined,
      alreadyInFavorites: false
    }
  },
  computed:{
    dateFormatted: function(){
      let splitted_hour = this.hour.split("T");
      let splitted_hour_to_date = splitted_hour[0].split("-");
      let year = splitted_hour_to_date[0];
      let month = splitted_hour_to_date[1];
      let day = splitted_hour_to_date[2];
      return day + "/" + month + "/" + year;
    },
    hourFormatted: function(){
      let splitted_hour = this.hour.split("T");
      let splitted_time = splitted_hour[1].split(":");
      return splitted_time[0]+":"+splitted_time[1];
    }
  },
  methods:{
    // Format the date and hour
    formatDateTime(){
      let splitted_hour = this.hour.split("T");
      let splitted_hour_to_date = splitted_hour[0].split("-");
      let year = splitted_hour_to_date[0];
      let month = splitted_hour_to_date[1];
      let day = splitted_hour_to_date[2];
      let splitted_time = splitted_hour[1].split(":");
      this.dateFormatted = day + "/" + month + "/" + year;
      this.hourFormatted = splitted_time[0]+":"+splitted_time[1];
    },
    // Get teams names instead of ids
    async getTeamsNames(){
      try{
        const responseHome = await this.axios.get(
          this.$root.store.serverDomain+"/teams/teamFullDetails/"+parseInt(this.hostTeam),{withCredentials: true}
        );
        this.hostTeamName = responseHome.data[0];
        const responseAway = await this.axios.get(
          this.$root.store.serverDomain+"/teams/teamFullDetails/"+parseInt(this.guestTeam),{withCredentials: true}
        );
        this.awayTeamName = responseAway.data[0];
      }
      catch{
        console.log("error in getting home or away team's names in game preview")
        console.log(error);
      }
    },
    async checkIfDisableFavorites(){
      // not a user
      if(!this.$root.store.username){
        this.alreadyInFavorites = true;
      }
      // user logged in
      else{
        // get users favorites and check if the match's already in
        const response = await this.axios.get(
          this.$root.store.serverDomain+"/users/favoriteMatches",{withCredentials: true}
        );
        this.alreadyInFavorites = false;
        response.data.forEach((favMatch) => {
          if (favMatch.match_id == this.id){            
            this.alreadyInFavorites = true;
          }
        });
      }
    },
    async addToFavorites(){
      try {
        const response = await this.axios.post(
          this.$root.store.serverDomain+"/users/favoriteMatches",
          {
            matchId: this.id
          },{withCredentials: true}
        );
        this.$root.toast("Favorite teams", response.data, "success");
        this.alreadyInFavorites = true;
        console.log("ADDED MATCH "+ this.id +" TO FAVORITES");
      } 
      catch (err) {
        //this.form.submitError = err.response.data.message;
        this.$root.toast("Favorite teams", err.response.data, "warning"); 
      }
    }
  },
  mounted(){
    this.checkIfDisableFavorites();
    // this.getTeamsNames();
    console.log("game preview mounted");
  } 
};
</script>

<style>
  .game-preview {
    background-color:rgba(255, 255, 255, 0.562);
    display: inline-block;
    width: 300px;
    height: max-content;
    position: relative;
    margin: 10px 10px;
    list-style: none;
    text-align: center;
  }

  #fav-btn{
    position: absolute;
    right: 0;
    text-align: right;
  }

  .game-content{
    list-style: none;
  }

  .game-preview .game-title {
    text-align: center;
    text-transform: uppercase;
    color:  rgb(111, 197, 157);
  }

  .game-preview .game-content {
    width: 100%;
    overflow: hidden;
  }



</style>
