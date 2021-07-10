// a preview of past game contain all details, 
<template>
  <div class="game-preview">
    <div :title="id" class="game-title">
      <b>Game Id:</b> {{ id }}
    </div>
    <ul class="game-content">
      <li> <b>Host Team:</b> {{ hostTeamName }}</li>
      <li> <b>Away Team:</b> {{ awayTeamName }}</li>
      <li> <b>Date:</b> {{ dateFormatted }}</li>
      <li> <b>Time:</b> {{ hourFormatted }}</li>
      <li> <b>Stadium:</b> {{stadium}}</li>
      <li> <b>Referee Id:</b> {{referee}}</li>
      <li> <b>Result:</b> {{result}}</li>
      <li v-if="events"> <b>Events:</b> </li>
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
      referee:{
        type: Number
      },
      result:{
        type: String,
        //required: true
      },
      events:{
        type: Array,
        //required: true
      }
  },
  data() {
    return {
      hostTeamName: this.hostTeam,
      awayTeamName: this.guestTeam,
      alreadyInFavorites: false
    }
  },
  computed:{
    dateFormatted: function(){
      let splitted_hour = this.hour.split("T");
      let splitted_hour_to_date = splitted_hour[0].split("-");
      let year = splitted_hour_to_date[0];
      let month = splitted_hour_to_date[1];
      let day = splitted_hour_to_date[2];
      return day + "/" + month + "/" + year;
    },
    hourFormatted: function(){
      let splitted_hour = this.hour.split("T");
      let splitted_time = splitted_hour[1].split(":");
      return splitted_time[0]+":"+splitted_time[1];
    }
  },
  methods:{
    // Format the date and hour
    // formatDateTime(){
    //   let splitted_hour = this.hour.split("T");
    //   let splitted_hour_to_date = splitted_hour[0].split("-");
    //   let year = splitted_hour_to_date[0];
    //   let month = splitted_hour_to_date[1];
    //   let day = splitted_hour_to_date[2];
    //   let splitted_time = splitted_hour[1].split(":");
    //   this.dateFormatted = day + "/" + month + "/" + year;
    //   this.hourFormatted = splitted_time[0]+":"+splitted_time[1];
    // },
    // Get teams names instead of ids
  //   async getTeamsNames(){
  //     try{
  //       const responseHome = await this.axios.get(
  //         this.$root.store.serverDomain+"/teams/teamFullDetails/"+parseInt(this.hostTeam),{withCredentials: true}
  //       );
  //       this.hostTeamName = responseHome.data[0];
  //       const responseAway = await this.axios.get(
  //         this.$root.store.serverDomain+"/teams/teamFullDetails/"+parseInt(this.guestTeam),{withCredentials: true}
  //       );
  //       this.awayTeamName = responseAway.data[0];
  //     }
  //     catch{
  //       console.log("error in getting home or away team's names in game preview")
  //       console.log(error);
  //     }
  //   },
  // },
  },
  mounted(){
    // this.getTeamsNames();
    //this.formatDateTime();
    console.log("game preview mounted");
  } 
};
</script>

<style>
.game-preview {
  display: inline-block;
  width: 450px;
  height: max-content;
  position: relative;
  margin: 10px 10px;
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

.game-content{
  list-style: none;
}

</style>
