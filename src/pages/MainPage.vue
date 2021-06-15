<template>
  <div class="container">
    <h1 class="title" center>Main Page</h1>
    <div class="row">
          <div class="col">
              <LeagueInfo
                :leagueName = leagueDetails.leagueName
                :seasonName = leagueDetails.seasonName
                :stageName = leagueDetails.stageName>
              </LeagueInfo>
              <GamePreview 
                :id=closetGame.id 
                :hostTeam=closetGame.hostTeam
                :guestTeam=closetGame.guestTeam 
                :date=closetGame.date 
                :hour=closetGame.hour
                :stadium=closetGame.stadium>
              </GamePreview>
          </div>
          <div class="col">
              <LoginPage v-if="!$root.store.username"></LoginPage>
              <FavoriteGames v-else></FavoriteGames>
          </div>
    </div>
  </div>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
import FavoriteGames from "../components/FavoriteGames";
import LoginPage from "../pages/LoginPage";
import GamePreview from '../components/GamePreview.vue';
export default {
  components: {
    LeagueInfo, 
    LoginPage, 
    FavoriteGames,
    GamePreview
  },
  data() {
    return {
      closetGame:{
        id:0,
        hostTeam:"efwerew",
        guestTeam:"effefe",
        date:"afsaf",
        hour:"fsafs",
        stadium:"safasf"
      },
      leagueDetails:{
        leagueName:"superLiga",
        seasonName:"ourSeason",
        stageName:"ourStage"
      },
      favoriteGames:[
      ]
    }
  },
  // mounted:{

  // },
  // methods:{

  // }
};
</script>

<style lang="scss" scoped>

</style>
