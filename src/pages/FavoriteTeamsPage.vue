// favorite Teams page, works good!
<template>
    <div class="container">
        <h1 id="title">Favorite Teams</h1>
        <div v-if="$root.store.username">
        <FavoriteTeams></FavoriteTeams>
        </div>
        <div v-else>
            <b>You have to be logged in as a user to view this page.</b>
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