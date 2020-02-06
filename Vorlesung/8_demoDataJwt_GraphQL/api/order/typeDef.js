import apollo from "apollo-server-express";

const {gql} = apollo;

export const orderTypeDef = gql`
  type Order {
        _id : String
        orderedBy: String
        pizzaName: String
        orderDate: String
        state: String 
        owner : User
  }  
  
  input AddOrderInput{
    pizzaName : String!
  } 

  extend type Query {
    Orders: [Order!]!    
  }
  
  extend type Mutation {
    addOrder(input: AddOrderInput) : Order!
  }
`;
