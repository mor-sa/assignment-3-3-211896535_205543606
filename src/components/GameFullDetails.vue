// a preview of past game contain all details, 
<template>
  <div class="game-preview">
    <div :title="id" class="game-title">
      <b>Game Id:</b> {{ id }}
    </div>
    <ul class="game-content">
      <li> host: {{ hostTeam }}</li>
      <li> guest: {{ guestTeam }}</li>
      <li> date: {{ date }}</li>
      <li> time: {{ hour }}</li>
      <li> stadium: {{stadium}}</li>
      <li> result: {{result}}</li>
      <li> events: </li>
      <EventPreview
      v-for="e in events"
      :id="e.event_id" 
      :date="e.event_date" 
      :hour="e.event_hour" 
      :minute="e.event_minute" 
      :description="e.event_description"
      :key="e.event_id"></EventPreview>
    </ul>
  </div>
</template>

<script>
import EventPreview from "./EventPreview.vue";
export default {
  name: "GameFullDetails",
  components:{
      EventPreview
  },
  props: {
      id: {
        type: Number,
        required: true
      },
      hostTeam: {
        type: String,
        required: true
      },
      guestTeam: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      hour: {
        type: String,
        required: true
      },
      stadium:{
        type: String,
        required: true
      },
      result:{
        //type: String,
        //required: true
      },
      events:{
          //type: Array,
          //required: true
      }
  }, 
  mounted(){
    console.log("game preview mounted")
  } 
};
</script>

<style>
.game-preview {
  display: inline-block;
  width: 400px;
  height: 300px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(183, 0, 255);
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
}



</style>
