<template>
  <div class="card">
    <img :src=imageUrl class="card-img-top" alt="Card image cap">
    <b-button class="fav-btn" pill variant="outline-danger" @click="addToFavorites" :disabled="alreadyInFavorites">Add To Favorites</b-button>
    <div class="card-body">
      <h5 class="card-title">{{fullName}}</h5>
      <ul class="list-group list-group-flush">
      <li class="list-group-item">Team: {{teamName}}</li>
      <li class="list-group-item">Position Number: {{position}}</li>
      <li class="list-group-item">Common Name: {{commonName}}</li>
      <li class="list-group-item">Nationality: {{nationality}}</li>
      <li class="list-group-item">Birth Date: {{birthDate}}</li>
      <li class="list-group-item">Birth Country: {{birthCountry}}</li>
      <li class="list-group-item">Height: {{height}}</li>
      <li v-if="weight" class="list-group-item">Weight: {{weight}}</li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: "PlayerFullDeatils",
  data() {
      return {
        fullName: undefined,
        teamName: undefined,
        imageUrl: undefined,
        position: undefined,
        commonName: undefined,
        nationality: undefined,
        birthDate: undefined,
        birthCountry: undefined,
        height: undefined,
        weight: undefined,
        alreadyInFavorites: false,
    } 
},
props:{
  id: {
        type: String,
        required: true
      }
},
  methods: {
    async updatePlayer(){
      console.log("response");
      try {
        const response = await this.axios.get(
          this.$root.store.serverDomain+"/players/"+this.id,
        );
        const details = response.data;
        this.fullName=details.player_full_name;
        this.teamName=details.player_team;
        this.imageUrl=details.player_image;
        this.position=details.player_position;
        this.commonName=details.player_common_name;
        this.nationality=details.player_nationality;
        this.birthDate=details.player_birthdate;
        this.birthCountry=details.player_birthcountry;
        this.height=details.player_height;
        this.weight=details.player_weight;
      } catch (error) {
        console.log("error in update player full details")
        console.log(error);
      }
    },
    // async checkIfInFavorites(){
    //   this.alreadyInFavorites=true;
    // },
    async checkIfDisableFavorites(){
      // not a user
      if(!this.$root.store.username || !this.id){
        this.alreadyInFavorites = true;
      }
      // user logged in
      else{
        this.alreadyInFavorites = false;
        // get users favorites and check if the player's already in
        const response = await this.axios.get(
          this.$root.store.serverDomain+"/users/favoritePlayers",{withCredentials: true}
        );
        response.data.forEach((favPlayer) => {
          if (favPlayer.id == this.id){
            this.alreadyInFavorites = true;
          }
        });
      }
    },
    async addToFavorites(){
      try {
        const response = await this.axios.post(
          this.$root.store.serverDomain+"/users/favoritePlayers",
          {
            playerId: this.id
          },{withCredentials: true}
        );
        this.$root.toast("Favorite players", response.data, "success");
        this.alreadyInFavorites = true;
      } 
      catch (err) {
        //this.form.submitError = err.response.data.message;
        this.$root.toast("Favorite players", err.response.data, "warning"); 
      }
    }
  }, 
  mounted(){
    console.log("full details player mounted");
    this.updatePlayer(); 
    this.checkIfDisableFavorites();
    //document.getElementById("player-img").src=this.player_image;
  }
};
</script>

<style scoped>
  body{
    background-color: beige;
  }

  .card{
    width: 95%;
    display: 'flex';
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .card-img-top{
    max-width: 200px;
    max-height: 250px;
  }
  #fav-btn{
    position: absolute;
    right: 0;
    text-align: right;
  }

  .card-title{
    text-align: center;
  }
</style>
