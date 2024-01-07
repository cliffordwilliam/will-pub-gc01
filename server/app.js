require("dotenv").config();
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const PORT = process.env.PORT || 3000;
const mongoConnection = require("./config/mongoConnection");
const Middleware = require("./middleware");

// Schemas
const userSchema = require("./schemas/userSchema");
const postSchema = require("./schemas/postSchema");
const followSchema = require("./schemas/followSchema");

// Resolvers
const userResolvers = require("./resolvers/userResolver");
const postResolvers = require("./resolvers/postResolver");
const followResolvers = require("./resolvers/followResolver");

const typeDefs = [userSchema, postSchema, followSchema];

const resolvers = [userResolvers, postResolvers, followResolvers];

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

(async () => {
  try {
    await mongoConnection.connect();

    const corsOptions = {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    };

    server.applyMiddleware({
      app: cors(corsOptions),
    });

    const { url } = await startStandaloneServer(server, {
      listen: {
        port: PORT,
      },
      // middleware
      context: async ({ req }) => {
        return {
          tokenGuard: async () => Middleware.tokenGuard(req),
        };
      },
    });
    console.log(`Listening: ${url}`);
  } catch (error) {
    console.log(error);
  }
})();
