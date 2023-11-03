<template>

  <div class="h-screen bg-transparent w-full">
    <div class="h-fit bg-stone-200 bg-opacity-60 w-full rounded-lg">
       <!--the item-->
    <div class="bg-transparent w-[240px] mobile:w-screen tablet:w-full h-[500px]
      place-self-center border-solid justify-items-center
      border-b-2 border-green-200 rounded-lg overflow-auto ">
              
      <div class="text-center h-fit mt-10 font-semibold justify-self-center">
        <h2 class="text-xl">Shopping Cart</h2>
      </div>

      <div class=" h-full grid m-2">

        <div v-if="chosenOrders.length === 0"
        class="text-center font-semibold text-xl 
          place-self-top mt-7  ">
          <h1>Your plate is empty</h1>
          
          <div class="ml-10">
            <svg 
            xmlns="http://www.w3.org/2000/svg"
            width="100px" height="100px" 
            viewBox="0 0 24 24">
            <path fill="currentColor" 
            d="m15.825 13l-2-2h1.725l2.75-5H8.825l-2-2H19.95q.575 
            0 .888.488t.012 1.062l-3.55 6.4q-.275.5-.713.775t-.762.275ZM7 
            22q-.825 0-1.413-.588T5 20q0-.825.588-1.413T7 18q.825 
            0 1.413.588T9 20q0 .825-.588 1.413T7 22Zm13.5 1.3L14.15 
            17H7.6q-1.1 0-1.675-.938T5.85 14.1l1.05-2.15L5.1 7.9L.7 
            3.5l1.4-1.4l19.8 19.8l-1.4 1.4ZM12.15 15l-2-2H8.6l-1 
            2h4.55Zm3.4-4h-1.725h1.725ZM17 22q-.825 0-1.413-.588T15 
            20q0-.825.588-1.413T17 18q.825 0 1.413.588T19 20q0 .825-.588 
            1.413T17 22Z"/>
            </svg>
          </div>
          
        </div>

        <div v-else>
          <div class="grid self-center gap-4">
            <div class="grid gap-8 mx-2 place-self-center" v-for="(dish, index) in chosenOrders" :key="index">
            <div class="w-1/2 place-self-center">
              <img :src="dish.image" :alt="dish.name"
              class="imgshop">
            </div>
            
            <div class="w-max space-y-1 place-self-center">
              
              <h3 class="font-bold">{{ dish.name }}</h3>
              
              <div class="text-red-500 font-bold text-lg">
                price: {{ dish.price }}$
              </div>
    
              <div class="flex  gap-1">
                
                <button class="hover:text-green-200" @click="removeFromOrder(dish)">
                  
                  <div v-if="dish.quantity==1">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M7 21q-.825 
                    0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 
                    .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 
                    17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"/>
                    </svg>
                  </div>
                  
                  <div v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" 
                    d="M18 12.998H6a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2z"/>
                    </svg>
                  </div>

                </button>
                
                <span>{{ dish.quantity }}</span>
                <button class="hover:text-green-200" @click="addToOrder(dish)">
                  <svg xmlns="http://www.w3.org/2000/svg" 
                  width="20" height="20" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 19q-.425 0-.713-.288T11 
                  18v-5H6q-.425 0-.713-.288T5 12q0-.425.288-.713T6 
                  11h5V6q0-.425.288-.713T12 5q.425 0 .713.288T13 
                  6v5h5q.425 0 .713.288T19 12q0 .425-.288.713T18 
                  13h-5v5q0 .425-.288.713T12 19Z"/>
                  </svg>
                </button>
            </div>
          </div>
        </div>
      </div>
          
              

          <!--the cost-->
        <div class=" costs">
          <div class="total-items">Total Items: {{ totalItems }}</div>
          <div class="total-price">Total Price: {{ totalPrice }}$</div>

          <button @click="ToggleSignup"
            class="btn">
            Order
          </button>

          <router-link to="/" class="btn">Head back</router-link>
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