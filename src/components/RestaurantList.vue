<script setup lang="ts">
import type { Restaurant } from '../types/restaurant'
import RestaurantCard from './RestaurantCard.vue'

defineProps<{
  restaurants: Restaurant[]
}>()
</script>

<template>
  <div>
    <!-- Show a message if no restaurants were returned for the postcode -->
    <p
      v-if="restaurants.length === 0"
      class="text-center text-[#6B6B65] mt-12"
    >
      No restaurants found for this postcode.
    </p>

    <!-- Render one card per restaurant in a responsive grid -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <RestaurantCard
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :restaurant="restaurant"
      />
    </div>
  </div>
</template>
