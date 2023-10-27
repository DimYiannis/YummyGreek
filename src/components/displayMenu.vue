<template>
    <div class="">
        
        <img :src="dish.image" 
        class=" hover:-translate-y-2 rounded-3xl"/>
        
        <h1 class="text-xl">{{ dish.name }}</h1>
        
        <div class="flex gap-4">
            <router-link to="/details/:dataToReceive" class="btn"
            @click="goToDetails(dish)">
                <svg class="w-3.5 h-3.5 ml-1 mt-[4.5px] mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
                See Details</router-link>
            
                <button class="btn" @click="addToOrder(dish)">
                    <svg class="w-3.5 h-3.5 ml-1 mt-[4.5px] mr-1 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                        <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                    </svg>
                    <div class="">Add to your order</div>
                </button>
        </div>
        
    </div>
</template>

<script>
    export default {
        data() {
            return { 
            }
        },
        props: {
            dish: {
            type: Object,
            required: true
            },   
                    
        },
        methods: {
            goToDetails(dish) {
                
                this.$emit('go-to-details', dish)
                
            },
            addToOrder(dish) {
                
                this.$emit('add-to-order', dish)
                console.log(dish)
            },
           
        },
        
       
    }
</script>

