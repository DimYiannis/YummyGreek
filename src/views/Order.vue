<template>
  <div class="h-screen bg-transparent w-full">
    <div class="h-fit bg-stone-200/60 w-full rounded-lg p-6">
      <!-- Shopping Cart Container -->
      <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <!-- Cart Header -->
        <div class="bg-green-50 p-6 border-b border-gray-200">
          <div class="flex items-center justify-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" 
                 class="w-8 h-8 text-green-600" 
                 viewBox="0 0 24 24">
              <path fill="currentColor" 
                    d="M7 22q-.825 0-1.413-.588T5 20q0-.825.588-1.413T7 18q.825 0 1.413.588T9 20q0 .825-.588 1.413T7 22Zm10 0q-.825 0-1.413-.588T15 20q0-.825.588-1.413T17 18q.825 0 1.413.588T19 20q0 .825-.588 1.413T17 22ZM6.15 6l2.4 5h7l2.75-5H6.15Z"/>
            </svg>
            <h2 class="text-2xl font-bold text-gray-800">Shopping Cart</h2>
          </div>
        </div>

        <!-- Cart Items -->
        <div class="divide-y divide-gray-200">
          <div v-if="chosenOrders.length === 0" 
               class="flex flex-col items-center justify-center py-16 px-4">
            <svg xmlns="http://www.w3.org/2000/svg" 
                 class="w-20 h-20 text-gray-400 mb-4" 
                 viewBox="0 0 24 24">
              <path fill="currentColor" 
                    d="M14 6h-4l-2-2H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-4l-2-2zM3 8h18v10H3V8z"/>
            </svg>
            <h3 class="text-xl font-semibold text-gray-500">Your plate is empty</h3>
            <p class="text-gray-400 mt-2">Add some delicious Greek dishes to get started!</p>
          </div>

          <div v-else class="divide-y divide-gray-200">
            <div v-for="(dish, index) in chosenOrders" 
                 :key="index"
                 class="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
              <!-- Item Image -->
              <div class="w-24 h-24 flex-shrink-0">
                <img :src="dish.image" :alt="dish.name"
                     class="w-full h-full object-cover rounded-lg shadow-sm">
              </div>
              
              <!-- Item Details -->
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-semibold text-gray-800">{{ dish.name }}</h3>
                <p class="text-green-600 font-bold">${{ dish.price }}</p>
              </div>

              <!-- Quantity Controls -->
              <div class="flex items-center gap-3 bg-gray-50 rounded-lg p-2">
                <button class="w-8 h-8 flex items-center justify-center rounded-full
                             hover:bg-red-50 text-red-500 transition-colors"
                        @click="removeFromOrder(dish)">
                  <svg xmlns="http://www.w3.org/2000/svg" 
                       class="w-5 h-5" 
                       viewBox="0 0 24 24">
                    <path fill="currentColor" 
                          d="M19 13H5v-2h14v2z"/>
                  </svg>
                </button>
                
                <span class="w-8 text-center font-medium">{{ dish.quantity }}</span>
                
                <button class="w-8 h-8 flex items-center justify-center rounded-full
                             hover:bg-green-50 text-green-500 transition-colors"
                        @click="addToOrder(dish)">
                  <svg xmlns="http://www.w3.org/2000/svg" 
                       class="w-5 h-5" 
                       viewBox="0 0 24 24">
                    <path fill="currentColor" 
                          d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Cart Footer -->
        <div class="bg-gray-50 p-6 mt-auto border-t border-gray-200">
          <div class="flex flex-col tablet:flex-row items-center justify-between gap-4">
            <div class="flex flex-col tablet:flex-row gap-4 items-center">
              <div class="text-gray-600">
                Total Items: <span class="font-semibold">{{ totalItems }}</span>
              </div>
              <div class="text-xl font-bold text-gray-900">
                Total: ${{ totalPrice }}
              </div>
            </div>
            
            <div class="flex gap-4">
              <button @click="ToggleSignup"
                      class="bg-green-500 text-white px-6 py-2 rounded-lg
                             hover:bg-green-600 transition-colors font-semibold
                             flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" 
                     class="w-5 h-5" 
                     viewBox="0 0 24 24">
                  <path fill="currentColor" 
                        d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                Order Now
              </button>
              
              <router-link to="/" 
                          class="border-2 border-gray-300 text-gray-600 px-6 py-2 
                                 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                Continue Shopping
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
export default {
  data() {
    return { 

    };
  },
  props: {
    chosenOrders: {
    type: Array,
    required: true
    }
  },
  computed: {
    totalItems() {
      console.log('show totalitems',this.chosenOrders);
      return this.chosenOrders.reduce((acc, dish) => acc + dish.quantity, 0);
      
    },
    totalPrice() {
      return this.chosenOrders.reduce((acc, dish) => acc + (dish.price * dish.quantity), 0);
    }
  },
  methods: {
    addToOrder(dish) {
      this.$emit('add-to-cart', dish);
    
      const index = this.chosenOrders.findIndex(chosenOrder => chosenOrder.id === dish.id);
        if (index !== -1) {
        // Item already exists in order
        this.chosenOrders[index].quantity+=1;
        } else {
        // Item is new to the order
        this.chosenOrders.push({
        ...dish,
        });
      }
    },
    removeFromOrder(dish) {
      this.$emit('remove-from-cart', dish);
      const index = this.chosenOrders.findIndex(chosenOrder => chosenOrder.id === dish.id  );
        if (index !== -1) {
          const chosenOrder = this.chosenOrders[index];
            if (chosenOrder.quantity > 1) {
             // Decrease quantity by 1
             chosenOrder.quantity--;
            } else {
             // Remove item from cart
             this.chosenOrders.splice(index, 1);
             // Decrease quantity by 1
             chosenOrder.quantity--;
            }
        }
    },
    ToggleSignup() {
      this.$emit('toggle-signup')
      
    },
  },
};

</script>