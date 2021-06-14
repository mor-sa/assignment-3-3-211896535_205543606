<template>
  <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="https://www.gstatic.com/webp/gallery/1.jpg"  alt="Card image cap" >
  <div class="card-body">
    <h5 class="card-title">Coach Full details</h5>
    <p class="card-text">some information about coach</p>
    <ul class="list-group list-group-flush">
    <li class="list-group-item">coach name: {{fullName}}</li>
    <li class="list-group-item">coach's team: {{teamName}}</li>
    <li class="list-group-item">common name: {{commonName}}</li>
    <li class="list-group-item">nationality: {{nationality}}</li>
    <li class="list-group-item">birth date: {{birthDate}}</li>
    <li class="list-group-item">birth country:{{birthCountry}}</li>
  </ul>
  </div>
</div>
</template>

<script>
export default {
  name: "coachFullDetails",
  data() {
      return {
        fullName:"",
        teamName:"",
        imageUrl:"",
        commonName:"",
        nationality:"",
        birthDate:"",
        birthCountry:""
    }
},
  props: {
      id: {
        type: Number,
        required: true
      }
     
  }, 
//   methods: {
//     async updateCoach(){
//       console.log("response");
//       try {
//         const response = await this.axios.get(
//           this.$root.store.serverDomain+"coaches/"+this.id,
//         );
//         //should add everything
//         const details = response.data.details;
//         this.id=details.id;
//         console.log(response);
//       } catch (error) {
//         console.log("error in update coach full details")
//         console.log(error);
//       }
//     }
//   }, 
//   mounted(){
//     console.log("full details coach mounted");
//     this.updateCoach(); 
//   }
};
</script>

<style>

</style>
