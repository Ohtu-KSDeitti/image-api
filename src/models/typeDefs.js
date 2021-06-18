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
  ): UserImages!
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
  ): UserImages!
}
`

module.exports = { typeDefs }
