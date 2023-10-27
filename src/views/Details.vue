<template>
  <div class="grid w-fit h-fit z-10 bg-stone-200 bg-opacity-60" >

    <div class="w-full flex flex-col tablet:flex-row gap-4">
      <div class="w-1/2 h-full self-center  ">

        <div class="grid mt-5 gap-5 self-center	">
          <div class="flex place-self-center font-semibold
          text-xl">{{ this.receivedData.name }}</div>
          <img :src="this.receivedData.image" 
          class="h-full w-full rounded-3xl transition ease-in-out delay-150 
          hover:-translate-y-1 hover:scale-90 duration-700">
        </div>
      </div>
    
      <div class="self-center gap-2 w-1/2">

        <div class="justify-self-center mt-16">

          <div class="grid gap-4">
            <p>{{ this.receivedData.description }}</p>
            
            <div class="grid tablet:grid-cols-2 laptop:grid-cols-3 ml-2">
              <h1 class="font-semibold ">ingredients:</h1>
              <ul v-for="i in this.receivedData.ingredients" 
              :i="i" :key="i"
              class="list-outside list-disc">
                <li>{{ i }}</li>
              </ul>
            </div>
            
          </div>

          <div class="mt-10 font-bold text-red-500">
            <p>Price: {{ this.receivedData.price }}</p>
          </div>
        
          <div class="flex gap-2 mt-5 mb-2">

            <router-link to="/" class="btn">Head back</router-link>
            
            
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
