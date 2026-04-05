<script setup lang="ts">
import { computed } from 'vue'
import type { Restaurant } from '../types/restaurant'

// Defines what data this component expects to receive from its parent
const props = defineProps<{
  restaurant: Restaurant
}>()

// Joins cuisine names into a readable comma-separated string e.g. "Indian, Pizza"
const cuisineNames = computed(() =>
  props.restaurant.cuisines.map((c) => c.name).join(', ') || 'Not available',
)

// Compose the full address
const fullAddress = computed(() => {
  const { firstLine, city, postalCode } = props.restaurant.address
  return [firstLine, city, postalCode].filter(Boolean).join(', ')
})

// Assumption: starRating is the best rating number from the API. (userRating is frequently null in live responses so we do not use it
const rating = computed(() => props.restaurant.rating.starRating ?? 'N/A')
</script>

<template>
  <div>
    <!-- restaurant name displayed as a heading -->
    <h2>{{ props.restaurant.name }}</h2>
    <p>{{ cuisineNames }}</p>
    <p>{{ rating }}</p>
    <p>{{ fullAddress }}</p>
  </div>
</template>
