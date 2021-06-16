// favorite games page, works good!
<template>
    <div>
        <div v-if="$root.store.username">
            <FavoriteGames></FavoriteGames>
        </div>
        <div v-else>
            not a user
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