<template>
  <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="https://www.gstatic.com/webp/gallery/1.jpg"  alt="Card image cap" >
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
        weight:""
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
    }
  }, 
  mounted(){
    console.log("full details player mounted");
    this.updatePlayer(); 
  }
};
</script>

<style>

</style>
