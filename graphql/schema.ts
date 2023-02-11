import {gql} from 'apollo-server-express';


const typeDefs = gql`
    input addPostInput {
        content: String!
    }

    type Query {
        users: [User!]
        user(id: ID!): User!
        userPosts(userId: ID!): [Post!]!
        posts: [Post!]!
    }

    type Mutation {
        addPost(post: addPostInput!): Post!
    }

    type User {
        email: String!
        password: String!
        avatar: String
        fullName: String!
    }

    type Post {
        content: String!
        _id: ID!
        author: User
        userId: ID!
    }
`

export default typeDefs;

