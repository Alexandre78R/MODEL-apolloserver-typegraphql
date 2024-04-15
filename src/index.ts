import "reflect-metadata";
import { ApolloServer } from "@apollo/server";

import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import "dotenv/config";

import { buildSchema } from "type-graphql";
import db from "./libs/db";
import { startStandaloneServer } from "@apollo/server/standalone";

import express from "express";
import http from "http";
import { FlagResolver } from "./resolvers/flag.resolver";
import { Flag } from "./entities/flag.entity";
import FlagService from "./services/flag.service";

export interface MyContext {
  req: express.Request;
  res: express.Response;
}

const app = express();
const httpServer = http.createServer(app);

async function main() {

    const schema = await buildSchema({
        resolvers: [FlagResolver],
        validate: false,
    });

    const server = new ApolloServer<{}>({
        schema,
    });
    
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async ({ req, res }) => {
            return {};
        },
    });

      console.log(`🚀  Server ready at: ${url}`);
  
  await db.initialize();

}

main();