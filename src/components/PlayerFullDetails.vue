<template>
  <div class="card" style="width: 18rem;">
  <img src=imageUrl class="card-img-top" alt="Card image cap" >
  <div class="card-body">
    <h5 class="card-title">player Full details</h5>
    <p class="card-text">some information about player</p>
    <ul class="list-group list-group-flush">
    <li class="list-group-item">player name: {{fullName}}</li>
    <li class="list-group-item">players's team: {{teamName}}</li>
    <li class="list-group-item">player position: {{position}}</li>
    <li class="list-group-item">common name: {{commonName}}</li>
    <li class="list-group-item">nationality: {{nationality}}</li>
    <li class="list-group-item">birth date: {{birthDate}}</li>
    <li class="list-group-item">birth country:{{birthCountry}}</li>
    <li class="list-group-item">player height: {{height}}</li>
    <li class="list-group-item">player weight:{{weight}}</li>
  </ul>
  </div>
    <b-button pill variant="outline-danger" @click="addToFavorites" :disabled="!alreadyInFavorites">add to favorites</b-button>

</div>
</template>

<script>
export default {
  name: "PlayerFullDeatils",
  data() {
      return {
        fullName:"",
        teamName:"",
        imageUrl:"",
        position:"",
        commonName:"",
        nationality:"",
        birthDate:"",
        birthCountry:"",
        height:"",
        weight:"",
        alreadyInFavorites:false
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
    async checkIfInFavorites(){
      this.alreadyInFavorites=true;
    },
    async addToFavorites(){
      try {
        const response = await this.axios.post(
          this.$root.store.serverDomain+"/users/favoritePlayers",
          {
            playerId: this.id
          }
        );
        console.log(response);
        this.$root.toast("Favorite players", response.data, "success");
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
    this.checkIfInFavorites();
    //document.getElementById("player-img").src=this.player_image;
  }
};
</script>

<style>
</style>
