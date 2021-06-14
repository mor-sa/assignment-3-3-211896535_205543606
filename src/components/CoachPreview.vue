<template>
  <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="https://www.gstatic.com/webp/gallery/1.jpg" @click="moveToCoachPage" alt="Card image cap" >
  <div class="card-body">
    <h5 class="card-title">Coach preview</h5>
    <p class="card-text">some information about coach</p>
    <ul class="list-group list-group-flush">
    <li class="list-group-item" @click="moveToCoachPage">coach name: {{fullName}}</li>
    <li class="list-group-item">coach's team: {{teamName}}</li>
  </ul>
  </div>
</div>
</template>

<script>
export default {
  name: "coachPreview",
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
      }
  }, 
  mounted(){
    console.log("coach preview mounted")
  },
  methods:{
      moveTocoachPage(){
        this.$router.push("/coach/"+this.id)
      }
  }
};
</script>

<style>

</style>
