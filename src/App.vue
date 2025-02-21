<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-100 to-green-50 
              bg-fixed bg-greek bg-cover bg-blend-overlay">
    <div class="grid h-fit justify-items-center bg-greek bg-auto" >

      <header class="navbar">
        <div class="w-full flex pt-2 justify-between">
          <div class="w-fit mx-3 p-2 flex items-center gap-2">
            <!-- Restaurant Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" 
                 class="w-8 h-8 text-green-600" 
                 viewBox="0 0 24 24">
              <path fill="currentColor" 
                    d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38c1.91-1.91 2.28-4.65.81-6.12c-1.46-1.46-4.2-1.1-6.12.81c-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88l1.41-1.41L13.41 13l1.47-1.47z"/>
            </svg>
            <h1 class="text-xl text-center font-semibold">YummyGreek</h1>
          </div>
          
          <div class="w-fit p-2">
            <nav class="w-fit flex text-black text-base tablet:text-xl space-x-5
            laptop:mr-10">
              
              <RouterLink to="/" @click="allDishes"
               class="hover:font-semibold flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" 
                     class="w-6 h-6" 
                     viewBox="0 0 24 24">
                  <path fill="currentColor" 
                        d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/>
                </svg>
                Menu
              </RouterLink>
              
              <RouterLink to="/orders" class="hover:font-semibold flex items-center gap-2">
                <div class="flex items-center">
                  <!-- Shopping Cart Icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" 
                       class="w-6 h-6" 
                       viewBox="0 0 24 24">
                    <path fill="currentColor" 
                          d="M7 22q-.825 0-1.413-.588T5 20q0-.825.588-1.413T7 18q.825 0 1.413.588T9 20q0 .825-.588 1.413T7 22Zm10 0q-.825 0-1.413-.588T15 20q0-.825.588-1.413T17 18q.825 0 1.413.588T19 20q0 .825-.588 1.413T17 22ZM6.15 6l2.4 5h7l2.75-5H6.15ZM7 17q-1.125 0-1.7-.988t-.05-1.962L6.6 11.6L3 4H1.975q-.425 0-.7-.288T1 3q0-.425.288-.713T2 2h1.625q.275 0 .525.15t.375.425L5.2 4h14.75q.675 0 .925.5t-.025 1.05l-3.55 6.4q-.275.5-.725.775T15.55 13H8.1L7 15h11.025q.425 0 .7.288T19 16q0 .425-.288.713T18 17H7Z"/>
                  </svg>
                  <h1>Order</h1>
                  <!--badge-->
                  <div v-show="totalItems > 0" 
                       class="relative inline-flex items-center 
                             justify-center px-2 py-0 text-base font-bold 
                             leading-none text-white transform -translate-y-1/2 
                             bg-green-600 rounded-full h-[20px] min-w-[20px]
                             -ml-1">
                    {{totalItems}}
                  </div>
                </div>
              </RouterLink>
            </nav>
          </div>
        </div>

      </header>

      <div class="grid gap-4 m-2 w-fit justify-items-center 
        rounded-xl ">
        <RouterView 
        :showDishes="showDishes"
        @go-to-details="goToDetails"
        :chosenDetails="chosenDetails"
        @add-to-order="addToOrder"
        :chosenOrders="chosenOrders"
        @toggle-signup="ToggleSignup">

        </RouterView>
      </div>
      
    </div>

    <!-- Combined Modal -->
    <Teleport to="#modal">
      <div v-if="activeTab === 'Menu'" 
           class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-7xl h-[90vh] 
                    flex flex-col overflow-hidden">
          <!-- Modal Header -->
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-800">Menu</h2>
            <button @click="closeTab" 
                    class="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" 
                   class="h-6 w-6" 
                   fill="none" 
                   viewBox="0 0 24 24" 
                   stroke="currentColor">
                <path stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Modal Content -->
          <div class="flex-1 overflow-y-auto p-6">
            <!-- Menu Grid -->
            <div class="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-6">
              <!-- Filter Menu Item -->
              <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4
                          hover:shadow-md transition-all duration-200">
                <div class="flex flex-col gap-4">
                  <!-- Filter Button -->
                  <div class="flex items-center justify-between">
                    <button @click="toggleFilters" 
                            class="flex items-center gap-2 text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" 
                           class="w-6 h-6 text-green-600" 
                           viewBox="0 0 24 24">
                        <path fill="currentColor" 
                              d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
                      </svg>
                      <span class="font-medium">Filter Menu</span>
                    </button>
                    <span class="text-gray-600 text-sm">
                      {{ filteredDishes.length }} items
                    </span>
                  </div>

                  <!-- Active Filters -->
                  <div v-if="activeFilterTags && activeFilterTags.length > 0" 
                       class="flex flex-wrap gap-2">
                    <div v-for="(tag, index) in activeFilterTags" 
                         :key="index"
                         class="bg-green-50 text-green-700 text-sm px-3 py-1.5 
                                rounded-full flex items-center gap-2 border border-green-200">
                      {{ tag.label }}
                      <button @click="clearFilter(tag.type)" 
                              class="hover:text-red-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                             class="w-4 h-4" 
                             viewBox="0 0 24 24">
                          <path fill="currentColor" 
                                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <!-- No Filters Message -->
                  <div v-else class="text-gray-500 text-sm text-center py-2">
                    No filters applied
                  </div>
                </div>
              </div>

              <!-- Menu Items -->
              <displayMenu v-for="dish in filteredDishes"
                          :dish="dish"
                          :key="dish.id"
                          @add-to-order="addToOrder"
                          @go-to-details="goToDetails" />
            </div>
          </div>

          <!-- Filters Sidebar (shown when filters are active) -->
          <div v-if="showFilters" 
               class="fixed inset-y-0 right-0 w-80 bg-white shadow-xl 
                      transform transition-transform duration-300 ease-in-out"
               :class="showFilters ? 'translate-x-0' : 'translate-x-full'">
            <div class="h-full flex flex-col">
              <div class="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 class="font-medium text-gray-900">Filters</h3>
                <button @click="toggleFilters" 
                        class="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" 
                       class="h-5 w-5" 
                       viewBox="0 0 20 20" 
                       fill="currentColor">
                    <path fill-rule="evenodd" 
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                          clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
              <div class="flex-1 overflow-y-auto">
                <HomeView :showDishes="showDishes" 
                         @go-to-details="goToDetails"
                         @add-to-order="addToOrder" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Other modals (SignUp, Login) -->
      <component v-else-if="activeTab !== 'Menu'"
                :is="activeTab" 
                @close="closeTab"
                @toggle-login="ToggleLogin"
                @toggle-signup="ToggleSignup" />
    </Teleport>

  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import SignUp from './components/SignUp.vue'
import Login from './components/Login.vue'
export default {
  components: {
    SignUp, Login
  },
  data() {
    return{
      showDishes: false,
      showSignup:false,
      showLogin:false,
      activeTab: '',
      chosenDetails: [],
      chosenOrders: [],
      showFilters: false,
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
    allDishes() {
      this.showDishes = true
    },
    goToDetails(dish) {
      console.log(dish)
      this.chosenDetails = dish
      console.log(this.chosenDetails)
    },
    addToOrder(dish) {
      console.log(dish)
      
      console.log(this.chosenOrders)
      
      const index = this.chosenOrders.findIndex(chosenOrder => chosenOrder.id === dish.id);
        if (index !== -1) {
        // Item already exists in order
        this.chosenOrders[index].quantity+=1
        } else {
        // Item is new to the order
        this.chosenOrders.push({
        ...dish,
        quantity:1
        });
      }
      console.log(this.chosenOrders)
    },
    ToggleSignup() {
      this.activeTab='SignUp'
    },
    ToggleLogin() {
      this.activeTab='Login'
    },
    closeTab() {
      this.activeTab=''
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
    }
  },
}
</script>



