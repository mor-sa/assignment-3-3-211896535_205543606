<template>
    <div>
        <TeamPreview :id='$route.params.id'></TeamPreview>
    </div>
</template>
<script>
import TeamPreview from '../components/TeamPreview.vue'
export default {
  components: { TeamPreview },
    name: 'TeamPage'
}
</script>
<style>
    
</style>