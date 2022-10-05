import express from 'express';
import {ApolloServer} from 'apollo-server-express'; 
import {schema} from './graphql';



const app = express();
const port = 9000;



const server = new ApolloServer({schema});
//need to add the server.start function for Apollo 3
server.start().then(_res => {
server.applyMiddleware({app, path: '/api'});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
});
