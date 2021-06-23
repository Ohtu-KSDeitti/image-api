const { gql } = require('apollo-server')

const typeDefs = gql`
type UserImages {
  id: ID!
  profilePic: String!
  albumPics: [String]!
}

type Query {
  getUserImages(id: ID!): UserImages!
}

type Mutation {
  updateProfilePic(
    id: ID!
    profilePic: String!
  ): String
  removeProfilePic(
    id: ID!
  ): UserImages!
  removeAlbumPic(
    id: ID!
    albumPicName: String!
  ): UserImages
  addAlbumPic(
    id: ID!
    albumPic: String!
  ): String
}
`

module.exports = { typeDefs }
