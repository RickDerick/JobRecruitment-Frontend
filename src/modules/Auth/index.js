import routes from './authRoutes';

export { default as AuthService } from "./authService";


export default{
    install : (app, options) => {
        if(options.router){
            options.router.addRoute(routes);
        }
    }
} 