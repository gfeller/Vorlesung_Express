import {userStore} from "../../services/userStore";
import {SecurityUtil} from "../../utils/security";

export const userResolver = {
    Query: {
        getUsers: async (obj, args, context, info) => await userStore.all(),
    },
    Mutation: {
        register: async (obj, args, context, info) => await userStore.register(args.email, args.passwort),
        authenticate: async (obj, args, context, info) => {
            const token = await SecurityUtil.handleLogin(args.email, args.passwort);
            if(token){
                return token
            }
            else{
                context.res.status(403);
                return null
            }
        }
    }
};
