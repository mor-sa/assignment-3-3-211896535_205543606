// player page works good!
<template>
    <div>
        <PlayerFullDeatils :id='$route.params.id'></PlayerFullDeatils>
    </div>
</template>
<script>
import PlayerFullDeatils from '../components/PlayerFullDetails.vue'
export default {
  components: { PlayerFullDeatils },
    name: 'PlayerFullDeatilsPage'
}
</script>
<style>
    
</style>