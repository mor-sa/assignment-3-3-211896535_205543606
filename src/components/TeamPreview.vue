<template>
  <div class="card" style="width: 18rem;">
  <router-link :to="{ name: 'team', params: { id: id }}"><img class="card-img-top" src="https://www.gstatic.com/webp/gallery/1.jpg" alt="Card image cap"> </router-link>
  <div class="card-body">
    <h5 class="card-title">Team preview</h5>
    <p class="card-text">some information about team</p>
    <ul class="list-group list-group-flush">
    <li class="list-group-item"><router-link :to="{ name: 'team', params: { id: id }}">team name: {{teamName}}</router-link></li>
    <li class="list-group-item"> team id: {{id}}</li>
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
  }
};
</script>

<style>

</style>
