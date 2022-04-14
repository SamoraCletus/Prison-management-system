const inmatesResolvers = require("./inmates");
const adminResolvers = require("./admin");
const exconvictsResolvers = require("./exconvicts");
const usersResolvers = require("./users");
module.exports = {
  Admin: {
    inmateCount: (parent) => parent.length,
  },

  Query: {
    ...inmatesResolvers.Query,
    ...exconvictsResolvers.Query,
    ...usersResolvers.Query,
    ...adminResolvers.Query,
  },
  Mutation: {
    ...inmatesResolvers.Mutation,
    ...exconvictsResolvers.Mutation,
    ...usersResolvers.Mutation,
    ...adminResolvers.Mutation,
  },
  Subscription: {
    ...inmatesResolvers.Subscription,
    ...usersResolvers.Subscription,
    ...exconvictsResolvers.Subscription,
  },
};
