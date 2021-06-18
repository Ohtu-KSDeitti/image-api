const {
  getUserImages,
  updateProfilePic,
  removeProfilePic,
  removeAlbumPic,
  addAlbumPic,
} = require('./images')

const getResolvers = () =>
  (
    {
      Query: {
        getUserImages: (_root, args) =>
          getUserImages(args.id),
        currentUser: (_root, _args, context) => {
          return context.currentUser
        },
      },
      Mutation: {
        updateProfilePic: (_root, args) =>
          updateProfilePic(args.id, args.profilePic),
        removeProfilePic: (_root, args) =>
          removeProfilePic(args.id),
        removeAlbumPic: (_root, args) =>
          removeAlbumPic(args.id, args.albumPic),
        addAlbumPic: (_root, args) =>
          addAlbumPic(args.id, args.albumPic),
      },
    }
  )

module.exports = { getResolvers }
