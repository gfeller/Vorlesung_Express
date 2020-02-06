import apollo from "apollo-server-express";

const {gql} = apollo;

import {orderTypeDef} from "./order/typeDef";
import {userTypeDefs} from "./user/typeDef";
import {userResolver} from "./user/resolver";
import {orderResolver} from "./order/resolver";

export const root = gql`  
  type Query {
    root: String
  }
  
  type Mutation {
    root: String
  }
`;


export const rootResolver = {
    Query: {
        root: (obj, args, context, info) => "root",
    },

    Mutation: {
        root: (obj, args, context, info) => "root"
    }
};


export const typeDefs = [root, orderTypeDef, userTypeDefs];

export const resolvers = [rootResolver, orderResolver, userResolver];
