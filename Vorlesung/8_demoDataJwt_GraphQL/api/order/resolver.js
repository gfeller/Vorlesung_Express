import {orderStore} from "../../services/orderStore";

export const orderResolver = {
    Query: {
        getOrders: (obj, args, context, info) => orderStore.all(context.user),
    },
    Mutation: {
        addOrder: (obj, args, context, info) => orderStore.add(args.pizzaName, context.user.username)
    }
};
