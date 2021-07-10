// not works
<template>
  <div class="card" style="width: 18rem;">
  <router-link :to="{ name: 'team', params: { id: id }}"><img class="card-img-top" :src=teamLogo alt="Card image cap"> </router-link>
  <div class="card-body">
    <router-link :to="{ name: 'team', params: { id: id }}"><h5 class="card-title">{{teamName}}</h5></router-link>
    <ul class="list-group list-group-flush">
    <li class="list-group-item"></li>
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
      },
      teamLogo:{
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
.card-img-top{
    max-width: 200px;
    max-height: 250px;
  }
.card{
  padding: 15px;
  margin: 20px;
}
</style>