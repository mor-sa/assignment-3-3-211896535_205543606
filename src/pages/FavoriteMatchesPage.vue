// favorite games page, works good!
<template>
    <div class="container">
        <h1 id="title">Favorite Games</h1>
        <div v-if="$root.store.username">
            <FavoriteGames></FavoriteGames>
        </div>
        <div v-else>
            <b>You have to be logged in as a user to view this page.</b>
        </div>
    </div>
</template>
<script>
import FavoriteGames from '../components/FavoriteGames.vue'
export default {
  components: { FavoriteGames },
    name: 'favoriteMatchesPage'
}
</script>
<style>
    
</style>