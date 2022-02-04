import apollo from "apollo-server-express";

const {gql} = apollo;

export const orderTypeDef = gql`
  type Order {
        _id : String
        orderedBy: String
        pizzaName: String
        orderDate: Date
        state: String 
        owner : User
  }  
  
  input AddOrderInput{
    pizzaName : String!
  } 

  extend type Query {
    Orders: [Order!]! @auth
    Order( id : String! ): Order @auth
  }
  
  extend type Mutation {
    addOrder(input: AddOrderInput) : Order! @auth(requires: USER)
    deleteOrder(id: String) : Order! @auth(requires: USER) 
  }
`;
