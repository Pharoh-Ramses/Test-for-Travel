// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { connectDatabase } from "./database";
import { typeDefs, resolvers } from "./graphql";

const mount = async (app: Application) => {
  const db = await connectDatabase();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
  });
  //need to add the server.start function for Apollo 3
  server.start().then((_res) => {
    server.applyMiddleware({ app, path: "/api" });

    app.listen(process.env.PORT, () =>
      console.log(`Example app listening on port ${process.env.PORT}`)
    );
  });
};

mount(express());
