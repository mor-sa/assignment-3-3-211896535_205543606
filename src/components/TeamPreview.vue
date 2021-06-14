<template>
  <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="https://www.gstatic.com/webp/gallery/1.jpg" @click="moveToTeamPage" alt="Card image cap" >
  <div class="card-body">
    <h5 class="card-title">Team preview</h5>
    <p class="card-text">some information about team</p>
    <ul class="list-group list-group-flush">
    <li class="list-group-item" @click="moveToTeamPage">team name: {{teamName}}</li>
    <li class="list-group-item">team id: {{id}}</li>
  </ul>
  </div>
</div>
</template>

<script>
export default {
  name: "TeamPreview",
  props: {
      id: {
        type: Number,
        required: true
      },
      teamName: {
        type: String,
        required: true
      }
  }, 
  mounted(){
    console.log("team preview mounted")
  },
  methods:{
      moveToTeamPage(){
        this.$router.push("/team/"+this.id)
      }
  }
};
</script>

<style>

</style>
