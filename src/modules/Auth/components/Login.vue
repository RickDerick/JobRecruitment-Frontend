<template>
    <v-container class="fill-height d-flex flex-column align-content-center">
        <v-dialog v-model="dialog" persistent>
            <v-overlay opacity="0" class="black--text" absolute>
                <v-row style="width: 90vw">
                    <v-col cols="12" md="4" offset-md="4">
                        <v-card
                        title="Login to account"
                        >
                        <v-card-text class="mt-5">
                            <v-form v-model="valid" ref="loginForm">
                                 <!--User name-->
                  <v-text-field
                    @keyup.enter.prevent="login"
                    ref="email"
                    label="Email address"
                    :rules="rules.email"
                    v-model="formData.email"
                    variant="outlined"
                    placeholder="Enter email address"
                  />

                  <!-- Password -->
                  <v-text-field
                    @keyup.enter.prevent="login"
                    ref="password"
                    :rules="rules.password"
                    label="Password"
                    v-model="formData.password"
                    variant= "outlined"
                    placeholder="Enter Password"
                    :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                  />

                            </v-form>

                        </v-card-text>

                            
                        </v-card>

                    </v-col>

                </v-row>
            </v-overlay>
        </v-dialog>
        
    </v-container>
    <div>

    </div>
</template>
<script>
export default{
    name:"login",
    components:{},

    data: ()=>{
        return{
            dialog:false,
            valid:false,
            showPassword: false,

            formData:{
                email: "",
                password:"",
                token:"",

            },
        }
    },
}
</script>