const { ApolloServer } = require('apollo-server')
const { PORT, config } = require('./config/apollo_config')

const server = new ApolloServer(config)

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`image-api <- ready at url: ${url}`)
}).catch((err) => {
  console.log('image-api <- cannot connect to service(s)')
  console.log('image-api <-', err.message)
})
