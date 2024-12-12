import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ProductsAPI } from "./datasources/products-api";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schemas";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => {
    const { cache } = server

    return {
      dataSources: {
        productsAPI: new ProductsAPI({ cache })
      }
    }
  }
});

console.log(`server started at: ${url}`);