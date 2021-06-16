// team page, works good!
<template>
    <div>
        <TeamFullDetails :id='$route.params.id'></TeamFullDetails>
    </div>
</template>
<script>
import TeamFullDetails from '../components/TeamFullDetails.vue'
export default {
  components: { TeamFullDetails },
    name: 'TeamPage'
}
</script>
<style>
    
</style>