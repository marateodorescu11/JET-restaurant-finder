<script setup lang="ts">
import type { Restaurant } from '../types/restaurant'
import RestaurantCard from './RestaurantCard.vue'

defineProps<{
  restaurants: Restaurant[]
}>()
</script>

<template>
  <div>
    <!-- show a message if no restaurants were returned for the postcode -->
    <p v-if="restaurants.length === 0">No restaurants found for this postcode.</p>

    <!-- render one card per restaurant -->
    <RestaurantCard
      v-else
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      :restaurant="restaurant"
    />
  </div>
</template>
