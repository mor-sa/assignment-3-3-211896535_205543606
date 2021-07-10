<template>
  <div class="container" id="search-page-container">
    <h1 class="title">Search</h1>
    <div id="search-bar">
      <b-input-group class="row"
        id="search-input">
        <b-form-select
          v-model="category"
          :options="catOptions"
          :style="{width:'max-content'}">
        </b-form-select>
        <b-form-input
            id="search-input-field" v-model="searchQuery" autocomplete="off" placeholder="Search Query">
        </b-form-input>
        <b-input-group-append>
          <b-button id="search-btn" variant="success" 
            :disabled="disableButton"
            v-on:click="handleSearch">
            Search
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </div>
    <br>
    <div id="results-container">
      <div v-if="noResults && searchQuery.length>1" id="no-results">
        <h4>Could not find results.</h4>
      </div>
      <div id="team-search-bar"
        v-show="searchTeams">
        <b-button class="search-btn" id="team-sort-teams-btn" variant="success" 
          v-on:click="sortTeamsName">
          {{sortedTeamsName}}
        </b-button>
      </div>
      <div id="player-search-bar"
        v-show="searchPlayers">
        <b-button class="search-btn" id="players-sort-players-btn" variant="success"
          v-on:click="sortPlayersName">
          {{sortedPlayersName}}
        </b-button>
        <b-button class="search-btn" id="players-sort-players-btn" variant="success"
          v-on:click="sortPlayersTeams">
          {{sortedPlayersTeam}}
        </b-button>
        <b-form-select id="filterResultsByTeams" class="search-btn"
          v-model="currTeamFilter"
          :style="{width:'max-content'}"
          :prepend="null"
          v-on:change="filterPlayers">
            <option value="null">Filter by Team</option>
            <option v-for="team in teamsForPlayer" :key="team">
              {{team}}
            </option>
        </b-form-select>
        <b-form-select id="filterResultsByPos" class="search-btn"
          v-model="currPosFilter"
          :style="{width:'max-content'}"
          v-on:change="filterPlayers">
            <option value="null">Filter by Position</option>
            <option v-for="pos in posForPlayer" :key="pos">
              {{pos}}
            </option>
        </b-form-select>
        <b-button class="search-btn" id="players-reset-filters-players-btn" variant="success"
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
import Autocomplete from '@trevoreyre/autocomplete-vue';

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
      noResults: false,
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
      currPosFilter: null,
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
    // Getting last search from memory and local storage
    getLastSearch(){
      if(this.$root.store.username){
        console.log(this.$root.store.lastSearch);
        if (this.$root.store.lastSearch===undefined){
          this.$root.store.getLastSearch();
        }
        if(this.$root.store.lastSearch){
          let last_search = this.$root.store.lastSearch;
          this.searchQuery = last_search.query;
          if(last_search.type == "teams"){
            this.searchTeams = true;
            this.teamResults = last_search.results;
            this.category = last_search.type;
          }
          else if(last_search.type == "players"){
            this.searchPlayers = true;
            this.generalPlayerResults = last_search.results;
            this.playerResults = last_search.results;
            this.category = last_search.type;
          }
        }
      }
    },
    // save last search in memory and local storage
    saveLastSearch(){
      if(this.$root.store.username){
        let search_type;
        let search_results;
        if(this.searchTeams == true){
          search_type = "teams";
          search_results = this.teamResults;
        }
        else if(this.searchPlayers == true){
          search_type = "players";
          search_results = this.generalPlayerResults;
        }
        let last_search = {
          query: this.searchQuery,
          type: search_type,
          results: search_results
        }
        this.$root.store.saveLastSearch(last_search);
      }
    },
    // This function commits the search
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
    // This function handles team search
    async teamsSearch(){
      try{
        this.noResults = false;
        const response = await this.axios.get(
        this.$root.store.serverDomain+"/search/teams/"+this.searchQuery,{withCredentials: true}
        );
        const teams = response.data;
        this.teamResults= teams;
        if(this.teamResults.length > 0){
          this.searchTeams = true;
        }
        else{
          this.noResults = true;
        }
        this.saveLastSearch();
      }
      catch(err){
        this.searchTeams = false;
        console.log("error in search teams")
        console.log(error);
      }
    },
    // this function handles players search
    async playersSearch(){
      try{
        this.noResults = false;
        const response = await this.axios.get(
          this.$root.store.serverDomain+"/search/players/"+this.searchQuery,{withCredentials: true}
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
        else{
          this.noResults = true;
        }
        this.generalPlayerResults = this.playerResults;
        this.saveLastSearch();
      }
      catch(err){
        console.log("error in search players")
        console.log(error);
      }
    },
    // This function decides how to sort the team results
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
    // This function sorts the team results by name A-Z
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
    // This function sorts the team results by name Z-A
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
    // This function decides how to sort the players results by their names
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
    // This function sorts the player results by name A-Z
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
    // This function sorts the player results by name Z-A
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
    // This function decides how to sort the players results by their teams
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
    // This function sorts the player results by team name A-Z
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
    // This function sorts the player results by team name Z-A
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
    // This function filters the players
    filterPlayers(){
      this.playerResults = this.generalPlayerResults;
      if(this.currTeamFilter){
        this.playerResults = this.playerResults.filter(player => player.player_team_name == this.currTeamFilter);
      }
      if(this.currPosFilter){
        this.playerResults = this.playerResults.filter(player => player.player_position == this.currPosFilter);
      }
    },
    // this function resets the filters
    resetPlayers(){
      this.playerResults = this.generalPlayerResults;
      this.currTeamFilter = null;
      this.currPosFilter = null;
    },
    
  },
  mounted(){
    this.allTeamsNames = this.$root.store.allTeams;
    this.getLastSearch();
  },
  watch:{
    searchQuery(){
      this.handleSearch();
    },
  }
}
</script>

<style scoped>
  #search-page-container{
    width: 100%;
  }

  #search-input {
    margin-left: 20px; 
    width: max-content;
  }

  #search-input-field{
    width:15em;
  }

  #search-bar{
    display: 'flex-col';
    align-items: center;
    justify-content: center;
    align-content: center;
    margin: 10px;
  }

  #results-container{
    display: 'flex';
    align-items: center;
    justify-content: center;
    margin: 10px;
  }

  .search-btn{
    margin: 1em 0.5em;
  }

  #players-reset-filters-players-btn{
    background-color:#4aaa65;
  }

  .search-btn{
    display:inline-block;
    padding:0.35em 1.2em;
    border:0.1em solid #FFFFFF;
    margin:0 0.3em 0.3em 0;
    border-radius:0.12em;
    box-sizing: border-box;
    text-decoration:none;
    font-family:'Roboto',sans-serif;
    font-weight:350;
    color:#d9ebdf;
    text-align:center;
    transition: all 0.2s;
    background-color:#64806c;
  }
  .search-btn:hover{
    color:#000000;
    background-color:#FFFFFF;
  }
  @media all and (max-width:30em){
  .search-btn{
    display:block;
    margin:0.4em auto;
  }
}
</style>