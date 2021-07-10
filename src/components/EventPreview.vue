// event preview should design only!
<template>
  <div class="event-preview">
    <div :title="id" class="event-title">
      <b>Event Id:</b> {{ id }}
    </div>
    <ul class="event-content">
      <li> <b>Date:</b> {{ dateFormatted }}</li>
      <li> <b>Hour:</b> {{ hourFormatted }}</li>
      <li> <b>Minute:</b> {{ minute }}</li>
      <li> <b>Description:</b> {{description}}</li>
      <br>
    </ul>
  </div>
</template>

<script>
export default {
  name: "EventPreview",
  props: {
      id: {
        type: Number,
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
      minute: {
        //type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
  },
    data() {
    return {
      dateFormatted: undefined,
      hourFormatted: undefined,
    }
  },
  methods:{
    // Format the date and hour
    formatDateTime(){
      let splitted_hour = this.hour.split("T");
      let splitted_hour_to_date = splitted_hour[0].split("-");
      let year = splitted_hour_to_date[0];
      let month = splitted_hour_to_date[1];
      let day = splitted_hour_to_date[2];
      let splitted_time = splitted_hour[1].split(":");
      this.dateFormatted = day + "/" + month + "/" + year;
      this.hourFormatted = splitted_time[0]+":"+splitted_time[1];
    },
  },
  mounted(){
    this.formatDateTime();
    console.log("event preview mounted")
  } 
};
</script>

<style>
.event-preview {
  display: inline-block;
  width: 300px;
  height: max-content;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:rgb(3, 247, 255);
}

.event-preview .event-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(60, 255, 0);
}

.event-preview .event-content {
  width: 100%;
  overflow: hidden;
}

.event-content{
  list-style: none;
}


</style>
