<script setup lang="ts">
import type { Restaurant } from '../types/restaurant'
import RestaurantCard from './RestaurantCard.vue'

defineProps<{
  restaurants: Restaurant[]
}>()
</script>

<template>
  <div>
    <!-- render one card per restaurant -->
    <RestaurantCard
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      :restaurant="restaurant"
    />
  </div>
</template>
