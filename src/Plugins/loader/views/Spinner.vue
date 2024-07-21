<template>
    <v-overlay
      v-if="globalStore.globalGetter['loading']"
      z-index="10"
      color="#000000"
      opacity=".4"
    >
      <spinner :animation-duration="2500" :size="65" />
    </v-overlay>
  </template>
  
  <script>
  import { HalfCircleSpinner as spinner } from "epic-spinners";
  import { useGlobalStore } from "../../../stores/globalStore";
  export default {
    setup() {
    const globalStore = useGlobalStore();
    return { globalStore };
  },
    name: "Spinner",
    components: {
      spinner,
    },
  };
  </script>
  
  <style scoped></style>
  