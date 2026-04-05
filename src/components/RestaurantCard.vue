<script setup lang="ts">
import { computed } from 'vue'
import type { Restaurant } from '../types/restaurant'

// Defines what data this component expects to receive from its parent
const props = defineProps<{
  restaurant: Restaurant
}>()

// Splits cuisines into an array of name strings for rendering as individual tags
const cuisines = computed(function () {
  return props.restaurant.cuisines.map(c => c.name)
})

// Composes the full address from its parts e.g. "1 Shenfield Street, London, N1 6SE"
const fullAddress = computed(function () {
  const { firstLine, city, postalCode } = props.restaurant.address
  return [firstLine, city, postalCode].filter(Boolean).join(', ')
})

// Assumption: starRating is the authoritative rating number from the API.
// userRating is frequently null in live responses so we do not use it.
const rating = computed(function () {
  return props.restaurant.rating.starRating ?? 'N/A'
})
</script>

<template>
  <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col gap-3">

    <!-- Restaurant name displayed as a heading -->
    <h2 class="text-base font-bold text-[#1A1A18]">{{ props.restaurant.name }}</h2>

    <!-- Cuisine tags — each cuisine rendered as its own pill -->
    <div class="flex flex-wrap gap-2">
      <span
        v-for="cuisine in cuisines"
        :key="cuisine"
        class="px-3 py-1 rounded-full bg-orange-100 text-[#FF6900] text-xs font-medium"
      >
        {{ cuisine }}
      </span>
      <span v-if="cuisines.length === 0" class="text-xs text-gray-400">Not available</span>
    </div>

    <!-- Rating -->
    <div class="flex items-center gap-1 text-sm text-[#1A1A18]">
      <span class="text-yellow-400">★</span>
      <span>{{ rating }}</span>
    </div>

    <!-- Address -->
    <p class="text-xs text-[#6B6B65] mt-auto">{{ fullAddress }}</p>

  </div>
</template>
