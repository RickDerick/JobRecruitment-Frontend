<template>
    <v-card flat>
      <v-card-title primary-title class="justify-center">
        <div class="text-center">
          <v-img
            height="500px"
            width="600px"
            class="mt-n8"
            alt=""
            src="../../../assets/Service Unavailable.png"
          />
          <span class="ml-2">Kindly click the button below to go back</span>
          <div class="text-center">
            <v-btn class="ma-2" color="secondary" :to="{ name: 'Home' }">
              <v-icon left> mdi-arrow-left </v-icon> Go Back
            </v-btn>
          </div>
        </div>
      </v-card-title>
    </v-card>
  </template>
  
  <script>
  export default {
    name: "ErrorPage",
  
    data: () => ({
      Doc: undefined,
      dialog: true,
    }),
  
    beforeRouteEnter(to, from, next) {
      next(() => {});
    },
  
    computed: {},
  
    methods: {},
  };
  </script>
  
  <style scoped></style>
  