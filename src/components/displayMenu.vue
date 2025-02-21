<template>
  <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100">
    <!-- Image Container -->
    <div class="relative aspect-[4/3] overflow-hidden">
      <img 
        :src="dish.image" 
        :alt="dish.name"
        class="w-full h-full object-cover"
      />
      <!-- Dietary Tags Overlay -->
      <div class="absolute top-2 left-2 flex gap-1">
        <span 
          v-if="dish.tags?.dietaryPreferences?.includes('vegetarian')"
          class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1"
        >
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 11C20 15.4183 16.4183 19 12 19C7.58172 19 4 15.4183 4 11C4 6.58172 7.58172 3 12 3C16.4183 3 20 6.58172 20 11Z" fill="currentColor"/>
            <path d="M12 19V22M8 22H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          Vegetarian
        </span>
        <span 
          v-if="dish.tags?.dietaryPreferences?.includes('gluten-free')"
          class="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full flex items-center gap-1"
        >
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4 6V12C4 15.31 7.58 19.41 12 21C16.42 19.41 20 15.31 20 12V6L12 2Z" fill="currentColor"/>
            <path d="M9.5 9.5L14.5 14.5M14.5 9.5L9.5 14.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
          </svg>
          Gluten-Free
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4">
      <div class="flex justify-between items-start gap-2 mb-2">
        <h3 class="font-semibold text-gray-900">{{ dish.name }}</h3>
        <span class="text-green-600 font-semibold">€{{ dish.price.toFixed(2) }}</span>
      </div>
      
      <p class="text-sm text-gray-600 line-clamp-2 mb-4">{{ dish.description }}</p>

      <!-- Action Buttons -->
      <div class="flex gap-2">
        <router-link 
          :to="{ name: 'details', params: { id: dish.id }, query: { dish: JSON.stringify(dish) }}"
          class="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <span class="flex items-center justify-center gap-1">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4.5v15m7.5-7.5h-15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Details
          </span>
        </router-link>
        <button 
          @click="$emit('add-to-order', dish)"
          class="flex-1 px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
        >
          <span class="flex items-center justify-center gap-1">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6h19l-3 10H6L3 6zm0 0l-.75-2.5M11 19.5a1.5 1.5 0 01-3 0M17 19.5a1.5 1.5 0 01-3 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Add to Cart
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dish: {
      type: Object,
      required: true,
    },
  },
};
</script>

