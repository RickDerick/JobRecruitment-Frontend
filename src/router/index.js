import { createWebHistory, createRouter } from 'vue-router';
import nextFactory from '../modules/Auth/middleware/MiddlewareFactory';
import Fallback from '../components/Fallback.vue';

const routes = [

    {
        path: "/:pathMatch(.*)*",
        name: "Fallback",
        component:Fallback,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  })
  router.beforeEach((to, from, next) => {
    // Reset page to top
    window.scrollTo(0, 0);
  
    if (to.meta.middleware) {
      const middleware = Array.isArray(to.meta.middleware)
        ? to.meta.middleware
        : [to.meta.middleware];
  
      const context = {
        from,
        next,
        router,
      };
      const nextMiddleware = nextFactory(context, middleware, 1);
      return middleware[0]({ ...context, next: nextMiddleware });
    }
    return next();
  });
  export default router;
