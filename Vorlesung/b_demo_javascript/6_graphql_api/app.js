import express from 'express';
import jwt from 'jsonwebtoken';

import {ApolloServer} from '@apollo/server'
import {resolvers, typeDefs} from "./api/root.js";
import {jwt_secret} from "./config.js";
import {authDirectiveTransformer, authDirectiveTypeDefs} from "./api/schemaDirectives.js";
import { makeExecutableSchema } from '@graphql-tools/schema'
import { expressMiddleware } from '@as-integrations/express5';
import {CONFIG} from "../shared.js";

// load init data
import './utils/data-seed.js'



let schema = makeExecutableSchema({
    typeDefs: [
        authDirectiveTypeDefs,
        ...typeDefs
    ],
    resolvers: resolvers
})
schema = authDirectiveTransformer(schema)


const app = express();
const server = new ApolloServer(
    {
        schema,

    });

await server.start();


app.use(express.static(CONFIG.public));

app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile("/html/index.html", {root: CONFIG.public});
});


app.use('/graphql', expressMiddleware(server, {
    context: async (context) => {
        const header = context.req.header("authorization");
        if(header){
            try {
                context.user = await jwt.verify(header.replace("Bearer ", ""), jwt_secret);
            }
            catch (e) {
                context.user = null
            }
        }
        return {req : context.req, res: context.res, user : context.user}
    }
}));

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('No token / Invalid token provided');
    } else {
        next(err);
    }
});

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, (error) => {
    if(error){
        console.error(error);
    }else{
        console.log(`Server running at http://${hostname}:${port}/`);
    }
});