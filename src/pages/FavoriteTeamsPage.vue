<template>
    <div>
        <div v-if="$root.store.username">
        <FavoriteTeams></FavoriteTeams>
        </div>
        <div v-else>
            <b> not a user </b>
        </div>
    </div>
</template>
<script>
import FavoriteTeams from '../components/FavoriteTeams.vue'
export default {
  components: { FavoriteTeams },
    name: 'favoriteTeamsPage'
}
</script>
<style>
    
</style>