// player preview component works
<template>
  <div class="card" style="width: 18rem;">
  <router-link :to="{ name: 'player', params: { id: id }}">  <img class="card-img-top" :src=imageUrl  alt="Card image cap" > </router-link>
  <div class="card-body">
    <h5 class="card-title">Player preview</h5>
    <p class="card-text">some information about player</p>
    <ul class="list-group list-group-flush">
    <li class="list-group-item" > <router-link :to="{ name: 'player', params: { id: id }}">player name: {{fullName}}</router-link></li>
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
        type: Number,
        required: true
      }
  }, 
  mounted(){
    console.log("player preview mounted")
  },
  methods:{
  }
};
</script>

<style>

</style>
