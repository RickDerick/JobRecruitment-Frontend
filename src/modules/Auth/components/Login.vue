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
                                    @click:append-inner="showPassword = !showPassword"
                                  />

                            </v-form>

                        </v-card-text>
                        <v-card-actions class="mt-n5 justify-center">
                <v-col cols="12">
                  <v-btn @click="login" color="primary" class="mt-n5" block>
                    Login
                  </v-btn>

                  <v-btn
                    class="mt-0 text-lowercase text-decoration-underline"
                    text
                    :to="{ name: 'forgotPassword' }"
                  >
                    Forgot password?</v-btn
                  >
                  <p class="text-center overline grey--text">
                    dont have an account?
                  </p>
                  <v-btn
                    :to="{ name: 'Register', params: { code: routeParams } }"
                    color="secondary"
                    block
                  >
                    register
                  </v-btn>

                  <!-- <p class="text-center overline grey--text">or</p>

                  <v-btn
                    @click="linkedinLogin"
                    color="blue"
                    block
                    class="mt-n3 white--text"
                  >
                    signin with LinkedIn
                  </v-btn> -->
                </v-col>
              </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-overlay>
        </v-dialog>
    </v-container>
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
            rules: {
        email: [
          (value) => {
            const pattern =
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(value) || "Invalid e-mail.";
          },
        ],
        required: [(value) => !!value || "Required."],
      },
        }
    },
}
</script>