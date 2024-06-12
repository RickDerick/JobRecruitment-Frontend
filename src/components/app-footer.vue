<template>
    <v-footer app >
    <p class="text-center mx-auto">
      <span style="color: #000000">
        {{APPNAME}} © {{ new Date().getFullYear() }}
      </span>
      
      <a
        class="text-decoration-none primary--text ml-4"
        href="###"
        target="_blank"
        style="color:#000"
      >
         Rick & Stella LTD
      </a>
    </p>
  </v-footer>
    
</template>
<script>
import { appName } from '../environments';
export default{
    name: "appFooter",
    data: () => {
        return{
            appName: appName,
        };
    },
}
</script>
