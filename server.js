const express = require('express')
const app = express()
const {ApolloServer} = require("apollo-server-express")
const {typeDefs, resolvers} = require("./schema")
const db = require("./config/connection")

PORT = process.env.PORT || 8080

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.applyMiddleware({app})
app.use(express.urlencoded({extended: true}))
app.use(express.json())

db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`)
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
})