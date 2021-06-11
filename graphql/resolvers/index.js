const userResolvers = require('./users');
const messageResovlers = require('./messages');

const { User, Message } = require('../../models');

module.exports = {
  Message: {
    createdAt: (parent) => parent.createdAt.toISOString(),
  },
  Reaction: {
    createdAt: (parent) => parent.createdAt.toISOString(),
    message: async (parent) => await Message.findByPk(parent.messageId),
    user: async (parent) => await User.findByPk(parent.userId, { 
      attributes: ['username', 'imageUrl', 'createdAt']}),
  },
  User: {
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
  Subscription: {
    ...messageResovlers.Subscription
  }
};