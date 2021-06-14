<template>
    <div>
        <CoachFullDetails :id='$route.params.id'></CoachFullDetails>
    </div>
</template>
<script>
import CoachFullDetails from '../components/CoachFullDetails.vue'
export default {
  components: { CoachFullDetails },
    name: 'CoachFullDetailsPage'
}
</script>
<style>
    
</style>