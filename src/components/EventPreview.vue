<template>
  <div class="event-preview">
    <div :title="id" class="event-title">
      <b>event Id:</b> {{ id }}
    </div>
    <ul class="event-content">
      <li> id: {{ id }}</li>
      <li> date: {{ date }}</li>
      <li> hour: {{ hour }}</li>
      <li> minute: {{ minute }}</li>
      <li> description: {{description}}</li>
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
  mounted(){
    console.log("event preview mounted")
  } 
};
</script>

<style>
.event-preview {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
}

.event-preview .event-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.event-preview .event-content {
  width: 100%;
  overflow: hidden;
}



</style>
