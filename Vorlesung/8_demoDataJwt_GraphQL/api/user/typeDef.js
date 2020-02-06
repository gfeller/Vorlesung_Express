import apollo from "apollo-server-express";
import {userStore} from "../../services/userStore";

const {gql} = apollo;


export const userTypeDefs = gql`
  type User {
        _id : String! 
        email: String!
        orders : [Order!]!                 
  }  
  
  input NewUserInput {
    email: String!
    passwort: String!
  }

  extend type Query {
    Users: [User!]!
  }
  
  extend type Mutation {
    authenticate(input : NewUserInput): String!
    register(input : NewUserInput): User!    
  }
`;
