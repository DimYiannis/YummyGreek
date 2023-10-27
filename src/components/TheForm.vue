<template>
    <div class="tablet:mt-2 h-fit">
        <form class="form" @submit.prevent="handleSubmit">

            <h1 class="text-center font-semibold text-lg">Sign Up for Delicious Delights!</h1>
            
                <label class="label">Full Name:</label>
                <input type="name" required v-model="name" placeholder="Full Name">

                <label class="label">Email:</label>
                <input type="email" required v-model="email" placeholder="Email">
    
                <label>Password:</label>
                <input type="password" required v-model="password" placeholder="Password">
                <div v-if="passwordError" class="error"> {{passwordError}}</div>
    
                <div class="submit">
                    <button class="btn mt-[20px] ">Join Now</button>
                    <div class="place-self-start text-[10px] 
                    flex gap-1">
                        <p>Already have an account?</p>
                        <a class="cursor-pointer underline underline-offset-1" @click="ToggleLogin">log in</a>
                    </div>
                </div>
    
        </form>  
    </div>
    
</template>

<script>
    export default {
        data() {
            return {
                name: '',
                email: '',
                password: '',
                terms: false,
                passwordError: '',
                
            }
        },
        methods: {
            handleSubmit() {
                //validate password
                this.passwordError = this.password.length >= 12 ? 
                '' : 'Password must be at least 12 characters long'
                if(!this.passwordError) {
                   console.log('email: ',this.email) 
                   console.log('password: ', this.password)  
                   console.log('terms accepted: ', this.terms) 
                }
        
            },
            ToggleLogin() {
                this.$emit('toggle-login')
            }
        }
            
    }
</script>
