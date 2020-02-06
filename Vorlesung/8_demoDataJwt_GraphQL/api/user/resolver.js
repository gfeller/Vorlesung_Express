import {userStore} from "../../services/userStore";
import {orderStore} from "../../services/orderStore";
import {SecurityUtil} from "../../utils/security";

export const userResolver = {
    Query: {
        Users: async (obj, args, context, info) => await userStore.all(),
    },
    User: {
        orders: (obj, args, context, info) => {
            return orderStore.all(obj.email);
        }
    },
    Mutation: {
        register: async (obj, args, context, info) => await userStore.register(args.input.email, args.input.passwort),
        authenticate: async (obj, args, context, info) => {
            const token = await SecurityUtil.handleLogin(args.input.email, args.input.passwort);
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
