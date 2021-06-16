// coach preview should design and fix image
<template>
  <div class="card" style="width: 18rem;">
  <router-link :to="{ name: 'coach', params: { id: id }}"> <img class="card-img-top" :src=imageUrl alt="Card image cap" > </router-link>
  <div class="card-body">
    <h5 class="card-title">Coach preview</h5>
    <p class="card-text">some information about coach</p>
    <ul class="list-group list-group-flush">
    <li class="list-group-item" > <router-link :to="{ name: 'coach', params: { id: id }}"> coach name: {{fullName}} </router-link> </li>
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

  }
};
</script>

<style>

</style>
