const { rule, shield, and } = require('graphql-shield')

const isAuthenticated = rule()((_parent, _args, { currentUser }) => {
  return Boolean(currentUser)
})

const isReadingOwnAccount = rule()((_parent, { id }, { currentUser }) => {
  return currentUser.id === id
})

const permissions = shield({
  Query: {
    getUserImages: and(isAuthenticated, isReadingOwnAccount),
  },
  Mutation: {
    updateProfilePic: and(isAuthenticated, isReadingOwnAccount),
    removeProfilePic: and(isAuthenticated, isReadingOwnAccount),
    removeAlbumPic: and(isAuthenticated, isReadingOwnAccount),
    addAlbumPic: and(isAuthenticated, isReadingOwnAccount),
  },
})

module.exports = {
  permissions,
}
