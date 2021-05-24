const userResolvers = require('./users');
const messageResovlers = require('./messages');

module.exports = {
  Message: {
    createdAt: (parent) => parent.createdAt.toISOString(),
  },
  Query: {
    ...userResolvers.Query,
    ...messageResovlers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...messageResovlers.Mutation,
  },
}