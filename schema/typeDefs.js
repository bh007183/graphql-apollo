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

type Auth{
    token: ID!
    user: User
}

type User{
    _id: ID
    username: String
    email: String
    friendCount: Int
    password: String
    thoughts: [Thought]
    friends: [User]
}
type Query{
  me: User
  thoughts(username: String): [Thought]
  thought(_id: ID!) : Thought
  user(username: String!): User
  users: [User]
  
}

type Mutation{
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
}


`
module.exports = typeDefs