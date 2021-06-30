const {Thought, User} = require('../models')
const { AuthenticationError } = require('apollo-server-express');
const {signToken} = require("../utils/auth")
const resolvers = {
    Query: {
        thoughts: async (parent, {username}) => {
            const params = username ? {username} : {}
            return Thought.find(params).sort({createdAt: -1})
        },
        thought: async (parent, {_id}) => {
            return Thought.findById(_id)
        },
        user: async(parent, {username}) => {
            return User.findOne({username}).select("-__v -password").populate('friends').populate('thoughts')
        },
        users: async () => {
            return User.find().select("-__v -password").populate('friends').populate('thoughts')
        },
        me: async(parent, args, context) => {
            if(context.user){
                const userData = await User.findOne({}).select('-__v -password').populate('thoughts').populate('friends')
            return userData
            }
            throw new AuthenticationError("Not Logged in")
            
          }

    },
    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.create(args)
            const token = signToken(user)

            return {token, user}

        },
        login: async(parent, {email, password}) => {
            
         const user = await User.findOne({email})
        //  const token = signToken(user)
         if(!user){
             throw new AuthenticationError('Incorrect credentials')
         }
         const correctPas = await user.isCorrectPassword(password)

         if(!correctPas){
             throw new AuthenticationError('Incorrect credentials')
         }

         const token = signToken(user)
         return {token, user}

        },

        
    }
}
module.exports = resolvers