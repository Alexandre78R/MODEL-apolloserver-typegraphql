import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import "dotenv/config";
import { buildSchema } from "type-graphql";
import db from "./libs/db";
import { startStandaloneServer } from "@apollo/server/standalone";
import { FlagResolver } from "./resolvers/flag.resolver";

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