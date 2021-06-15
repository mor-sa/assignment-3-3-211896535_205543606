<template>
    <div class="container">
    <h1 class="title" center>Main Page</h1>
    <div class="row">
        <div class="col">
            FUTURE GAMES:
            <GamePreview
            v-for="g in games"
            :id="g.id" 
            :hostTeam="g.hostTeam"
            :guestTeam="g.guestTeam" 
            :date="g.date"
            :hour="g.hour"
            :stadium="g.stadium"
            :key="g.id">
            </GamePreview>
        </div>
        <div class="col">
            past games:
        </div>
        <div class="col">
            <router-link :to="{ name: 'addMatch'}"><b-button pill variant="primary" >Add match</b-button></router-link>
            <router-link :to="{ name: 'addResult'}"><b-button pill variant="primary">Add Result</b-button></router-link>
            <router-link :to="{ name: 'addEventCalendar'}"><b-button pill variant="primary">Add Events</b-button></router-link>
        </div>
        </div>
    </div>
</template>
<script>
import GamePreview from '../components/GamePreview.vue'
export default {
  components: { GamePreview },
    name: 'leagueMangementPage'
,
data() {
    return {
        games:[
        {
          id:25,
          hostTeam: "Maccabi Tel-Aviv",
          guestTeam: "Hapoel Beer-Sheva",
          date: "27/5/21",
          hour: "20:00",  
          stadium: "Sammi Offer"

        },
        {
          id:39,
          hostTeam: "Hapoel Tel-Aviv",
          guestTeam: "Maccabi Haifa",
          date: "29/5/21",
          hour: "20:00",
          stadium: "Sammi Offer"
        }
        ]
    }
}
}
</script>
<style>
    
</style>