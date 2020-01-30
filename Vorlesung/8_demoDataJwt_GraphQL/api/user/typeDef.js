import apollo from "apollo-server-express";
import {userStore} from "../../services/userStore";

const {gql} = apollo;


export const userTypeDefs = gql`
  type User {
        _id : String!
        email: String!                 
  }  

  extend type Query {
    getUsers: [User!]!
  }
  
  extend type Mutation {
    authenticate(email: String!, passwort: String!): String!
    register(email: String!, passwort: String!): User!
  }
`;
