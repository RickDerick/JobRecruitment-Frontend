import home from "./views/home.vue";
import jobList from "../home/components/jobList.vue";

export default {
    path: "/",
    component: home,
    children: [
        {
            path: "",
            name: "home",
            components:
            {
                view: jobList,
            }
        }
    ]

}
    
       

    
