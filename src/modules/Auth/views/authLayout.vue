<template>
<v-app>
    <v-main>
     <router-view/>
    </v-main>
    <appFooter/>
</v-app>
</template>

<script>
import appFooter from '../../../components/app-footer.vue';
//import Spinner from "../../../Plugins/loader/views/Spinner.vue";
export default{
    name: 'authLayout',
    components:{ appFooter}
}
</script>

<style scoped>

</style>