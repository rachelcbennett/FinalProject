<template>
  <div class="recipe">
      <JobListings/>
  </div>
</template>

<script>
// @ is an alias to /src

import JobListings from '@/components/JobListings.vue'
export default {
  name: 'RecipeDisplay',
  components: {
    JobListings
  }
}
</script>
