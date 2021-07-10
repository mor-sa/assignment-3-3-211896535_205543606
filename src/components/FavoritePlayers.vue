// favorite player page 
<template>
  <div>
      <div class="card-group">
    <PlayerPreview
      v-for="p in players"
      :id="p.id" 
      :fullName="p.name" 
      :teamName="p.team_name" 
      :imageUrl="p.image" 
      :position="p.position" 
      :key="p.id"></PlayerPreview>
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
      players: []
    };
  },
  methods: {
    async updatePlayers(){
      try {
        //should check cookies!
          const response = await this.axios.get(
            this.$root.store.serverDomain+"/users/favoritePlayers", {withCredentials: true});
          const players = response.data;
          this.players = [];
          this.players.push(...players);
      } catch (error) {
          this.players = [];
          console.log("error in update players")
          console.log(error);
      }
    }
  }, 
  async mounted(){
    console.log("favorite players mounted");
    await this.updatePlayers(); 
  }
};
</script>

<style>
  .fav-player{
    height:200px;
    width:250px;
  }
</style>
