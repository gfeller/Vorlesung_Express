import {userStore} from "../../services/user-store.js";
import {orderStore} from "../../services/order-store.js";
import {SecurityUtil} from "../../utils/security.js";

export const userResolver = {
    Query: {
        Users: async (obj, args, context, info) => await userStore.all(),
    },
    User: {
        orders: async (obj, args, context, info) => {
            return orderStore.all(obj);
        }
    },
    Mutation: {
        register: async (obj, args, context, info) => await userStore.register(args.input.email, args.input.passwort),
        authenticate: async (obj, args, context, info) => {
            const token = await SecurityUtil.createAuthResponse(args.input.email, args.input.passwort);
            if (token) {
                const user = await userStore.findByEmail(args.input.email);
                return {token, isAdmin: user.isAdmin }
            } else {
                context.res.status(403);
                return null
            }
        }
    }
};
