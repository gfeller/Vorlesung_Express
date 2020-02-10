import apollo from "apollo-server-express";
import {userStore} from "../../services/userStore";

const {gql} = apollo;


export const userTypeDefs = gql`  
  type User {
        _id : String! 
        email: String!
        orders : [Order!]! @auth(isAdmin: true)                
  }  
  
  input NewUserInput {
    email: String!
    passwort: String!
  }
  
  type  AuthenticateOutput {
    token: String
    isAdmin: Boolean
  }
  
  extend type Query {
    Users: [User!]!
  }
  
  extend type Mutation {
    authenticate(input : NewUserInput): AuthenticateOutput
    register(input : NewUserInput): User!    
  }
`;
