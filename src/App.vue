<template>
  
  <div class="grid h-fit justify-items-center bg-greek bg-auto" >

    <header class="navbar">
      
      <div class="w-full flex pt-2 justify-between bg-gray-200/60">
        <div class="w-fit mx-3  p-2">
          <h1 class="text-xl text-center font-semibold">YummyGreek</h1>
        </div>
        
        <div class=" w-fit p-2 ">
        <nav class="w-fit flex text-black text-2xl space-x-5
        laptop:mr-10">
          
          <RouterLink to="/" @click="allDishes"
           class="hover:font-semibold"> Menu</RouterLink>
          
          <RouterLink to="/orders" class="hover:font-semibold flex">
            
            <div class="flex">
              <h1>Order</h1>
              <!--badge-->
              <div v-show="totalItems > 0" class="relative  inline-flex items-center 
                justify-center px-2 py-0 text-base font-bold leading-none 
                text-white transform  -translate-y-1/2 
                bg-black/60 rounded-full h-[30px]">
                {{totalItems}}
              </div>
            </div>
          </RouterLink>
        </nav>
      </div>

      </div>

      <div class=" text-6xl text-black">
        <h1 class="text-center transition ease-in delay-300 
        hover:bg-opacity-30 hover:bg-stone-400 rounded-3xl
        font-semibold">Where Tradition Meets Culinary Innovation</h1>
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

  <Teleport to="#modal">
    <component :is="activeTab" 
              @close="closeTab"
              @toggle-login="ToggleLogin"
              @toggle-signup="ToggleSignup" />
  </Teleport>

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
  },
}
</script>



