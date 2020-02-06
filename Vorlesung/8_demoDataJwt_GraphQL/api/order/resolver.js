import {orderStore} from "../../services/orderStore";
import {userStore} from "../../services/userStore";

export const orderResolver = {
    Query: {
        Orders: (obj, args, context, info) => orderStore.all(context.user.name),
    },

    Order: {
        owner: (obj, args, context, info) => {
            return userStore.findByEmail(obj.orderedBy);
        }
    },
    Mutation: {
        addOrder: (obj, args, context, info) => orderStore.add(args.input.pizzaName, context.user.name)
    }
};
