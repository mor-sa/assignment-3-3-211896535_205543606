<template>
  <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="https://www.gstatic.com/webp/gallery/1.jpg" @click="moveToPlayerPage" alt="Card image cap" >
  <div class="card-body">
    <h5 class="card-title">Player preview</h5>
    <p class="card-text">some information about player</p>
    <ul class="list-group list-group-flush">
    <li class="list-group-item" @click="moveToPlayerPage">player name: {{fullName}}</li>
    <li class="list-group-item">player's team: {{teamName}}</li>
    <li class="list-group-item">player position: {{position}}</li>
  </ul>
  </div>
</div>
</template>

<script>
export default {
  name: "PlayerPreview",
  props: {
      id: {
        type: Number,
        required: true
      },
      fullName: {
        type: String,
        required: true
      },
      teamName: {
        type: String,
        required: true
      },
      imageUrl: {
        type: String,
        required: true
      },
      position:{
        type: String,
        required: true
      }
  }, 
  mounted(){
    console.log("player preview mounted")
  },
  methods:{
      moveToPlayerPage(){
        this.$router.push("/player/"+this.id)
      }
  }
};
</script>

<style>

</style>
