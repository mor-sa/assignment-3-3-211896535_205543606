<template>
  <div>
      <div class="card-group">
    <PlayerPreview
      v-for="p in players"
      :id="p.id" 
      :fullName="p.fullName" 
      :teamName="p.teamName" 
      :imageUrl="p.imageUrl" 
      :position="p.position" 
      :key="p.id"></PlayerPreview>>
  </div>
  </div>
</template>

<script>
import PlayerPreview from "./PlayerPreview.vue";
export default {
  name: "FavoritePlayers",
  components: {
    PlayerPreview
  }, 
  data() {
    return {
      players: [
        {
          id:25,
          fullName: "Tom",
          teamName: "Maccabi",
          imageUrl: "",
          position: "4"
        },
        {
          id:22,
          fullName: "Kobi",
          teamName: "Hapoel",
          imageUrl: "",
          position: "4"
        }
      ]
    };
  },
//   methods: {
//     async updatePlayers(){
//       console.log("response");
//       try {
//         const response = await this.axios.get(
//           this.$root.store.serverDomain+"users/favoritePlayers",
//         );
//         const players = response.data.games;
//         this.players = [];
//         this.players.push(...players);
//         console.log(response);
//       } catch (error) {
//         console.log("error in update players")
//         console.log(error);
//       }
//     }
//   }, 
//   mounted(){
//     console.log("favorite players mounted");
//     this.updateGames(); 
//   }
};
</script>

<style></style>
