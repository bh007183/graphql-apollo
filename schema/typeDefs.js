const {gql} = require("apollo-server-express")

const typeDefs = gql`
type Thought{
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
}
type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
}
type User{
    username: String
    email: String
    friendCount: Int
    password: String
    thoughts: [Thought]
    friends: [User]
}
type Query{
  thoughts(username: String): [Thought]
  thought(_id: ID!) : Thought
  user(username: String!): User
  users: [User]
  
}
`
module.exports = typeDefs