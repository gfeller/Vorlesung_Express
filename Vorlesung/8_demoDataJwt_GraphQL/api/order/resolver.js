import {orderStore} from "../../services/orderStore";
import {userStore} from "../../services/userStore";

export const orderResolver = {
    Query: {
        Orders: (obj, args, context, info) => orderStore.all(context.user),
        Order: (obj, args, context, info) => orderStore.get(args.id, context.user.email),
    },

    Order: {
        owner: (obj, args, context, info) => {
            return userStore.findByEmail(obj.orderedBy);
        }
    },
    Mutation: {
        addOrder: (obj, args, context, info) => orderStore.add(args.input.pizzaName, context.user.email),
        deleteOrder: (obj, args, context, info) => orderStore.delete(args.id, context.user.email)
    }
};
