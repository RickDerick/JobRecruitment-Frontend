import AuthLayout from "../Auth/views/authLayout.vue";
import ErrorPage from "../Auth/components/errorPage.vue";
import Login from "../Auth/components/Login.vue";
import ForgotPassword  from "../Auth/components/forgotPassword.vue";
import Register  from "../Auth/components/Register.vue";

export default {

        path: "/auth",
        component: AuthLayout,
        
        children: [
            {
                path:"",
                name: "Login",
                component: Login,
    
            },
            {
                path:"error",
                name: "ErrorPage",
                component: ErrorPage,
    
            },
            {
                path:"forgot-password",
                name: "forgotPassword",
                component: ForgotPassword,
    
            },
            {
                path:"register",
                name: "Register",
                component: Register,
    
            },
            
        ]
    }

