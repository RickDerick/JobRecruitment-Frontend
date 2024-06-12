import home from "./views/home.vue";
import Examplepage from "../home/components/Examplepage.vue";

export default {
    path: "/",
    component: home,
    children: [
        {
            path: "",
            name: "home",
            components:
            {
                view: Examplepage,
            }
        }
    ]

}
    
       

    
