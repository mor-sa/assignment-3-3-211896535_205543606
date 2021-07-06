<template>
  <div>
    <h1 class="title">Search Page</h1>
    <div id="search-bar" class="row">
      <b-form-select 
        v-model="category"
        :options="catOptions"
        :style="{width:'max-content'}">
      </b-form-select>
      <b-input-group
        prepend="Search Query:"
        id="search-input">
        <b-form-input
          v-model="searchQuery">
          </b-form-input>
        <b-input-group-append>
          <b-button variant="success" 
            :disabled="disableButton"
            v-on:click="handleSearch">
            Search
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </div>
    <div id="results-container">
      <nav title="Sidebar" bg-variant="dark" text-variant="light" shadow>

      </nav>
      <br/>
      Your search Query: {{ searchQuery }}
      <div id="team-search-bar"
        v-show="searchTeams">
        <b-button id="team-sort-teams-btn" variant="success" 
          v-on:click="sortTeamsName">
          {{sortedTeamsName}}
        </b-button>
      </div>
      <div id="player-search-bar"
        v-show="searchPlayers">
        <b-button id="players-sort-players-btn" variant="success"
          v-on:click="sortPlayersName">
          {{sortedPlayersName}}
        </b-button>
        <b-button id="players-sort-players-btn" variant="success"
          v-on:click="sortPlayersTeams">
          {{sortedPlayersTeam}}
        </b-button>
        <b-form-select id="filterResultsByTeams"
          v-model="currTeamFilter"
          :style="{width:'max-content'}"
          v-on:change="filterPlayers">
            <option v-for="team in teamsForPlayer" :key="team">
              {{team}}
            </option>
        </b-form-select>
        <b-form-select id="filterResultsByPos"
          v-model="currPosFilter"
          :style="{width:'max-content'}"
          v-on:change="filterPlayers">
            <option v-for="pos in posForPlayer" :key="pos">
              {{pos}}
            </option>
        </b-form-select>
        <b-button id="players-reset-filters-players-btn" variant="success"
          v-on:click="resetPlayers"> Reset
        </b-button>
      </div>
      <div id="team-results"
        class="row">
          <TeamPreview
            v-for="res in teamResults"
            :id="res.team_id"
            :teamName="res.team_name"
            :teamLogo="res.team_logo"
            :key="res.team_id">
          </TeamPreview>
      </div>
      <div id="player-results"
        class="row">
          <PlayerPreview
            v-for="res in playerResults"
            :id="res.player_id" 
            :fullName="res.player_full_name" 
            :teamName="res.player_team_name" 
            :imageUrl="res.player_image" 
            :position="res.player_position" 
            :key="res.player_id">
          </PlayerPreview>
      </div>
    </div>
  </div>
</template>

<script>
import TeamPreview from '../components/TeamPreview.vue';
import PlayerPreview from '../components/PlayerPreview.vue';
export default {
  name: "Search",
  components: { 
    TeamPreview , PlayerPreview
  },
 data() {
    return {
      category: null,
      catOptions: [
        { value: null, text: 'Search Category' },
        { value: 'teams', text: 'Teams' },
        { value: 'players', text: 'Players' },
      ],
      sortedPlayersName:"Sort Players by Name A-Z",
      isClickedSortedPlayersName: true,
      sortedTeamsName:"Sort Team by Name A-Z",
      isClickedSortedTeamsName: true,
      sortedPlayersTeam:"Sort Player by Team Name A-Z",
      isClickedSortedPlayersTeam: true,
      searchQuery:"",
      searchTeams: false,
      searchPlayers: false,
      teamResults:[],
      playerResults: [],
      generalPlayerResults: [],
      posForPlayer: [],
      teamsForPlayer: [],
      currTeamFilter: null,
      currPosFilter: null
    };
  },
  computed: {
    disableButton: function (){
        if(this.category){
          return false;
        }
        return true;
    }
  },
  methods:{
    handleSearch(){
      this.searchTeams = false;
      this.searchPlayers = false;
      this.teamResults = [];
      this.playerResults = [];
      this.teamsForPlayer = [];
      if(!this.category || !this.searchQuery){
        return;
      }
      else if(this.category == 'teams'){
        this.teamsSearch();
      }
      else if(this.category == 'players'){
        this.playersSearch();
      }
    },
    async teamsSearch(){
      try{
        const response = await this.axios.get(
        this.$root.store.serverDomain+"/search/teams/"+this.searchQuery
        );
        const teams = response.data;
        this.teamResults= teams;
        if(this.teamResults.length > 0){
          this.searchTeams = true;
        }
      }
      catch(err){
        this.searchTeams = false;
        console.log("error in search teams")
        console.log(error);
      }
    },
    async playersSearch(){
      try{
        const response = await this.axios.get(
          this.$root.store.serverDomain+"/search/players/"+this.searchQuery
        );
        const players = response.data;
        this.playerResults = players;
        if(this.playerResults.length > 0){
          this.searchPlayers = true;
          let setTeamsForPlayer = new Set();
          this.playerResults.map((player)=>{
            setTeamsForPlayer.add(player.player_team_name);
          });
          this.teamsForPlayer = Array.from(setTeamsForPlayer);
          this.teamsForPlayer.sort();
          let setPosForPlayer = new Set();
          this.playerResults.map((player)=>{
            setPosForPlayer.add(player.player_position);
          })
          this.posForPlayer = Array.from(setPosForPlayer);
          this.posForPlayer.sort();
        }
        this.generalPlayerResults = this.playerResults;
      }
      catch(err){
        console.log("error in search players")
        console.log(error);
      }
    },
    sortTeamsName(){
      if(this.isClickedSortedTeamsName){
        this.isClickedSortedTeamsName = false;
        this.sortedTeamsName="Sort Teams by Name Z-A";
        this.sortTeamsNameAZ();
      }
      else{
        this.isClickedSortedTeamsName = true;
        this.sortedTeamsName="Sort Teams by Name A-Z";
        this.sortTeamsNameZA();
      }
    },
    sortTeamsNameAZ(){
      this.teamResults.sort((teamA, teamB)=>{
        if(teamA.team_name.toLowerCase() > teamB.team_name.toLowerCase()){
          return 1;
        }
        if(teamB.team_name.toLowerCase() > teamA.team_name.toLowerCase()){
          return -1;
        }
        return 0;
      });
    },
    sortTeamsNameZA(){
     this.teamResults.sort((teamA, teamB)=>{
        if(teamA.team_name.toLowerCase() > teamB.team_name.toLowerCase()){
          return -1;
        }
        if(teamB.team_name.toLowerCase() > teamA.team_name.toLowerCase()){
          return 1;
        }
        return 0;
      });
    },
    sortPlayersName(){
      if(this.isClickedSortedPlayersName){
        this.isClickedSortedPlayersName = false;
        this.sortedPlayersName="Sort Players by Name Z-A";
        this.sortPlayersNameAZ();
      }
      else{
        this.isClickedSortedPlayersName = true;
        this.sortedPlayersName="Sort Players by Name A-Z";
        this.sortPlayersNameZA();
      }
    },
    sortPlayersNameAZ(){
      this.playerResults.sort((playerA, playerB)=>{
        if(playerA.player_full_name.toLowerCase() > playerB.player_full_name.toLowerCase()){
          return 1;
        }
        if(playerB.player_full_name.toLowerCase() > playerA.player_full_name.toLowerCase()){
          return -1;
        }
        return 0;
      });
    },
    sortPlayersNameZA(){
      this.playerResults.sort((playerA, playerB)=>{
        if(playerA.player_full_name.toLowerCase() > playerB.player_full_name.toLowerCase()){
          return -1;
        }
        if(playerB.player_full_name.toLowerCase() > playerA.player_full_name.toLowerCase()){
          return 1;
        }
        return 0;
      });
    },
    sortPlayersTeams(){
      if(this.isClickedSortedPlayersTeam){
        this.isClickedSortedPlayersTeam = false;
        this.sortedPlayersTeam="Sort Players by Team Name Z-A";
        this.sortPlayersTeamAZ();
      }
      else{
        this.isClickedSortedPlayersTeam = true;
        this.sortedPlayersTeam="Sort Players by Team Name A-Z";
        this.sortPlayersTeamZA();
      }
    },
    sortPlayersTeamAZ(){
      this.playerResults.sort((playerA, playerB)=>{
        if(playerA.player_team_name.toLowerCase() > playerB.player_team_name.toLowerCase()){
          return 1;
        }
        if(playerB.player_team_name.toLowerCase() > playerA.player_team_name.toLowerCase()){
          return -1;
        }
        return 0;
      });
    },
    sortPlayersTeamZA(){
      this.playerResults.sort((playerA, playerB)=>{
        if(playerA.player_team_name.toLowerCase() > playerB.player_team_name.toLowerCase()){
          return -1;
        }
        if(playerB.player_team_name.toLowerCase() > playerA.player_team_name.toLowerCase()){
          return 1;
        }
        return 0;
      });
    },
    filterPlayers(){
      this.playerResults = this.generalPlayerResults;
      console.log("FILTER RESULTS");
      if(this.currTeamFilter){
        this.playerResults = this.playerResults.filter(player => player.player_team_name == this.currTeamFilter);
      }
      if(this.currPosFilter){
        this.playerResults = this.playerResults.filter(player => player.player_position == this.currPosFilter);
      }
    },
    resetPlayers(){
      this.playerResults = this.generalPlayerResults;
      this.currTeamFilter = null;
      this.currPosFilter = null;
    }
  }
}
</script>

<style scoped>

#search-input {
  margin-left: 20px; 
  width: 500px; 
}
</style>