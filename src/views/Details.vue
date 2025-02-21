<template>
  <div class="max-w-7xl mx-auto px-4 py-8 bg-white rounded-lg shadow-lg">
    <div class="w-full flex flex-col tablet:flex-row gap-8">
      <!-- Left Column - Image Section -->
      <div class="tablet:w-1/2">
        <div class="sticky top-8">
          <img 
            :src="receivedData.image" 
            :alt="receivedData.name"
            class="w-full h-[500px] object-cover rounded-2xl shadow-md"
          >
        </div>
      </div>
    
      <!-- Right Column - Details Section -->
      <div class="tablet:w-1/2 flex flex-col gap-6">
        <!-- Header -->
        <div>
          <h1 class="text-3xl font-bold text-gray-900">{{ receivedData.name }}</h1>
          <p class="mt-4 text-gray-600 leading-relaxed">{{ receivedData.description }}</p>
        </div>

        <!-- Ingredients Section -->
        <div class="bg-stone-50 p-6 rounded-xl">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Ingredients</h2>
          <ul class="grid grid-cols-2 gap-2">
            <li 
              v-for="ingredient in receivedData.ingredients" 
              :key="ingredient"
              class="flex items-center gap-2 text-gray-700"
            >
              <span class="w-2 h-2 bg-green-500 rounded-full"></span>
              {{ ingredient }}
            </li>
          </ul>
        </div>

        <!-- Price and Actions -->
        <div class="mt-auto">
          <div class="flex items-center justify-between mb-6">
            <div>
              <p class="text-sm text-gray-500">Price</p>
              <p class="text-3xl font-bold text-gray-900">{{ receivedData.price }}</p>
            </div>
            <button 
              @click="addToCart"
              class="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg
                     hover:bg-green-700 transition-colors duration-200"
            >
              Add to Cart
            </button>
          </div>

          <div class="flex gap-4">
            <router-link 
              to="/" 
              class="flex items-center justify-center px-6 py-3 border border-gray-300 
                     rounded-lg text-gray-700 font-medium hover:bg-gray-50 
                     transition-colors duration-200 w-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
              </svg>
              Back to Menu
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      receivedData: {},
    };
  },
  props: {
    chosenDetails: {
      type: Object,
      required: true
    },
    chosenOrders: {
      type: Object,
      required: true
    },
    dish: {
      type: Object,
      required: true
    },   
  },
  created() {
    this.receivedData = this.chosenDetails;
    console.log('Received data:', this.receivedData);
    console.log('Received image path:', this.receivedData.image);
  },
  computed: {
    totalItems() {
      console.log('show totalitems',this.chosenOrders);
      return this.chosenOrders.reduce((acc, dish) => acc + dish.quantity, 0);
    },
    totalPrice() {
      return this.chosenOrders.reduce((acc, dish) => acc + (dish.price * dish.quantity), 0);
    },
    makeOrder(dish) {
      this.$emit('make-order', this.receivedData)
    }
  },
};
</script>
