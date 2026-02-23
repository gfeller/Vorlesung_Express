import {orderStore, securityService} from "../../../shared.js";
import {userStore} from "../../../shared.js";
import {CryptoUtil} from "../../../shared.js";


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

            if (await userStore.authenticate(args.input.email, args.input.passwort)) {
                let token = await securityService.createJWT(args.input.email);
                return {token}
            }
            else {
                context.res.status(403);
                return null
            }
        }
    }
};
