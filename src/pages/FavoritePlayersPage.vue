// favorite players page works good!
<template>
    <div class="container">
        <h1 id="title">Favorite Players</h1>
        <div v-if="$root.store.username">
            <FavoritePlayers class="fav-players"></FavoritePlayers>
        </div>
        <div v-else>
            <b>You have to be logged in as a user to view this page.</b>
        </div>
    </div>
</template>
<script>
import FavoritePlayers from '../components/FavoritePlayers.vue'
export default {
  components: { FavoritePlayers },
    name: 'favoritePlayersPage'
}
</script>
<style>
</style>