import apollo from "apollo-server-express";
const {gql} = apollo;

export const orderTypeDef = gql`
  type Order {
        _id : String
        orderedBy: String
        pizzaName: String
        orderDate: String
        state: String 
  }  

  extend type Query {
    getOrders: [Order!]!
  }
  
  extend type Mutation {
    addOrder(pizzaName : String!) : Order!
  }
`;
