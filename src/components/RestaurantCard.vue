<script setup lang="ts">
import type { Restaurant } from '../types/restaurant'

const props = defineProps<{//what data is expected to receive
  restaurant: Restaurant
}>()
</script>

<template>
  <div>
    <h2>{{ props.restaurant.name }}</h2>//the restaurant name is displayed as a heading
    <p>{{ props.restaurant.cuisines }}</p>
    <p>{{ props.restaurant.rating.starRating }}</p>
    <p>{{ props.restaurant.address }}</p>
  </div>
</template>
