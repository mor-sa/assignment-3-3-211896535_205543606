// player preview component works
<template>
  <div class="card" style="width: 18rem;">
    <router-link :to="{ name: 'player', params: { id: id }}"><img class="card-img-top" :src=imageUrl  alt="Card image cap" > </router-link>
    <div class="card-body">
      <router-link :to="{ name: 'player', params: { id: id }}"><h5 class="card-title">{{fullName}}</h5></router-link>
      <ul class="list-group list-group-flush">
      <li class="list-group-item">Team: {{teamName}}</li>
      <li class="list-group-item">Position number: {{position}}</li>
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
  }
};
</script>

<style>
  /* .card{
    max-width: 24em;
    min-width: 24em;
  } */
  .card-img-top{
    max-width: 200px;
    max-height: 250px;
  }

  .card{
    display: inline-block;
    min-width: 300px;
    max-width: 300px;
    min-height: 220px;
    margin: 10px 10px;
}
</style>
