<template>
    <div class="invbackdrop" @click.self="closeSignup">

        <div class="flex flex-col tablet:flex-row
        place-self-center tablet:mx-5 tablet:mt-5
        tablet:w-fit laptop:w-fit h-screen w-screen
        tablet:h-fit bg-white rounded-md overflow-y-scroll 
        tablet:overflow-y-hidden overscroll-none border-2 
        border-stone-300" >

            <div class="mb-2 w-max place-self-center bg-transparent">

                <div class="flex place-self-center justify-end p-3 h-10 invisible tablet:visible">
                    <button class="flex w-fit rounded-3xl p-2" 
                        @click="closeSignup">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        fill="white" 
                        viewBox="0 0 24 24" 
                        stroke-width="2" stroke="black" 
                        class="w-6 h-6 hover:stroke-red-600 
                        place-self-center">
                        <path stroke-linecap="round" 
                        troke-linejoin="round" 
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>

                <TheForm @toggle-login="ToggleLogin"/>

            </div>
            
        </div>
    </div>
</template>

<script>
import TheForm from './TheForm.vue'

export default {
    components: {TheForm},
    data() {
        return {
          
        }
    },
    methods: {
        closeSignup() {
            this.$emit('close')
        },
        ToggleLogin() {
            this.$emit('toggle-login')
        }
    }, 
    
}


</script>

