import { getUserData } from "../util.js";


export default function initialize() {
    let user = null;
    updateSession();

    return function addSession(ctx, next) {
        ctx.updateSession =  getUserData;
        ctx.user = user;
        next();
        
    };

    function updateSession() {
        user = getUserData();
    }
}


