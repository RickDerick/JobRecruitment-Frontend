<template>
    <v-card
     class="mx-auto"
     min-width="300"
     hover
     >        
    <div class="ma-2">
        <router-link
            :to="{ name: 'login' }"
            class="text-decoration-none"
            >
            <v-icon class="mr-1">mdi-arrow-left-circle</v-icon>
            Go back
        </router-link>
    </div>
     
     <v-card-item class="text-center">
       <Logo/>
                        
       <v-card-title>
        SET PASSWORD
       </v-card-title>
       <v-card-subtitle>
        Set a new password
       </v-card-subtitle>
     </v-card-item>
 
     <v-card-text>
         <v-form ref="passwordForm" v-model="isValid">
            <v-text-field
                v-model="formData.email"
                :rules="rules.email"
                density="compact"
                label="Email"
                placeholder="Email address"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
            ></v-text-field>
            <v-text-field
            v-model="formData.password"
            @keyup.enter.prevent="reset"
            :rules="rules.pwdRules"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            :type="showPassword ? 'text' : 'password'"
            density="compact"
            label="password"
            placeholder="Enter your password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="showPassword = !showPassword"
            ></v-text-field>
         </v-form>
     </v-card-text>
     <v-card-actions class="mb-8" >
        <v-btn
           variant="elevated"
           color="grey-darken-4"
           rounded="xl"
           class="text-capitalize"
           block
           @keyup.enter="reset"
           @click="reset"
         >
         Set Password
         </v-btn>
     </v-card-actions>
    </v-card>
</template>
<script>
import { useAuthStore } from '@/store/auth'
export default{
    name:"PasswordReset",
    components:{Logo},
    setup(){
      const authStore = useAuthStore();
      return {authStore}
    },

    data: function () {
    return {
      isValid: false,
      showPassword: false,
      formData: {
        password: "",
        email: "",
      },
    };
  },
  computed: {
    rules() {
      return {
        password: [(v) => !!v || "Password is required"],
        
        email: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+/.test(v) || "E-mail must be valid",
        ],
        confirmPassword: [
          (v) => !!v || "Password is required",
          (v) => v === this.formData.password || "Password does not match",
        ],
      };
    },
    passwordSetSuccess(){
      return this.authStore.authStoreGetters('passwordSetSuccess');
    }
  },
  mounted(){
    //dispatch to get password set
    this.authStore.authStoreGetters('passwordSetSuccess')
  },
  methods: {
    reset: function () {
      this.$refs.passwordForm.validate();
      if (this.isValid) {
        this.authStore.resetPassword({
          ...this.formData,
        });
      }
    },
  },
  watch: {
        passwordSetSuccess: {
            handler: function (newVal, oldVal) {
                
                if(newVal === true){
                  this.toast.success("You have successfully set your password, login to continue");
                  this.$router.push({name:"dashboard"});
                  //reset()
                  this.authStore.setPasswordSetSuccess(false);

                }
            },
        },
    },
}
</script>