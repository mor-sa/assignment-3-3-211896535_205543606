<template>
    <div>
        <div v-if="$root.store.username">
            <FavoritePlayers></FavoritePlayers>
        </div>
        <div v-else>
            not a user
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