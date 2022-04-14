const { ApolloServer, PubSub } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./graphQl/typeDefs");
const cors = require("cors");
const { MONGODB } = require("./config");
const express = require("express");

const pubsub = new PubSub();

const resolvers = require("./graphQl/resolvers");
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});
const app = express();
server.applyMiddleware({ app });
app.use(express.static("public"));
app.use(cors());
let database = mongoose
  .connect(MONGODB, { useNewUrlParser: true }, { useUnifiedTopology: true })
  .then(() => {
    console.log("DataBase Connected");
    return app.listen({ port: 5000 }, () => {
      console.log(`Server Running at port http://localhost:5000`);
    });
  });
database.catch(function () {
  console.log("Cannot Connect to Database");
});

// const { ApolloServer, PubSub } = require("apollo-server");
// const mongoose = require("mongoose");
// const typeDefs = require("./graphQl/typeDefs");
// const { MONGODB } = require("./config");
// const cors = require("cors");

// const pubsub = new PubSub();

// const resolvers = require("./graphQl/resolvers");
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req }) => ({ req, pubsub }),
// });
// mongoose
//   .connect(MONGODB, { useNewUrlParser: true })
//   .then(() => {
//     console.log("DataBase Connected");
//     return server.listen({ port: 5000 });
//   })
//   .then((res) => {
//     console.log(`Server running at ${res.url}`);
//   });
