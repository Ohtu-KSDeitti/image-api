const { buildFederatedSchema } = require('@apollo/federation')
const { applyMiddleware } = require('graphql-middleware')
const { typeDefs } = require('../models/typeDefs')
const { getResolvers } = require('../models/resolvers')
const { permissions } = require('../permissions')
const jwt = require('jsonwebtoken')

const resolvers = getResolvers()

require('dotenv').config()

const PORT = process.env.PORT
const JWT_SECRET = process.env.SECRET_KEY
const ENV = process.env.NODE_ENV

const config = {
  schema: applyMiddleware(
    buildFederatedSchema([{ typeDefs, resolvers }]),
    permissions),
  context: async ({ req }) => {
    const auth = req.headers.authorization

    if (auth && auth.toLowerCase().startsWith('bearer')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET,
      )

      const currentUser = decodedToken

      return { currentUser }
    }
  },
  plugins: [
    {
      requestDidStart: ( requestContext ) => {
        if ( requestContext.request.http?.headers.has( 'x-apollo-tracing' ) ) {
          return
        }

        if (ENV !== 'production') {
          const query =
        requestContext.request.query?.replace( /\s+/g, ' ' ).trim()
          const variables = JSON.stringify( requestContext.request.variables )
          console.log('image-api <-', new Date().toISOString())
          console.log('image-api <-', `- [Request Started] { query: ${ query }`)
          console.log('image-api <-', 'variables:', variables)
          console.log('image-api <-',
            'operationName:',
            requestContext.request.operationName)
          return
        }
      },
    },
  ],
}

module.exports = {
  PORT,
  config,
}
