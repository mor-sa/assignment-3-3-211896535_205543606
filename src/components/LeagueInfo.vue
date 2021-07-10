// league inforamtion componnet
<template>
    <div class="cardi">
      <b-card
      img-alt="Image"
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-title>{{leagueName}}</b-card-title>
      <b-card-text>
        Season: {{ seasonName }}
        <br/>
        Stage: {{ stageName }}
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "leagueInfo",
  props: {
      leagueName: {
        type: String,
        required: true
      },
      seasonName: {
        type: String,
        required: true
      },
      stageName: {
        type: String,
        required: true
      },
 }
}
</script>

<style>
.league-preview {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  /* margin: 10px 10px; */
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:rgb(0, 157, 255);
}

.league-preview .league-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(255, 0, 0);
}

.league-preview .league-content {
  width: 100%;
  overflow: hidden;
}

</style>