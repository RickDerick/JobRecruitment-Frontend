<template>
    <v-img
      alt="Logo"
      class="shrink mr-2"
      contain
      :src="
        company.base64Logo ? `data:image/png;base64,${company.base64Logo}` : ''
      "
      transition="scale-transition"
      width="50"
      @click="$router.push('/')"
    />
  </template>
  
  <script>
  export default {
    name: "Logo",
    props: {
      height: {
        type: [Number, String],
        default: () => "26%",
      },
      width: {
        type: [Number, String],
        default: "26%",
      },
    },
  
    computed: {
    //   company() {
    //     return this.$store.getters["Landing/landingGetters"]("company");
    //   },
    },
  };
  </script>
  
  <style scoped></style>
  