const {Thought, User} = require('../models')

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
        }

    }
}
module.exports = resolvers