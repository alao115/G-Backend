import { Express, Response, Request } from 'express'
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageDisabled } from 'apollo-server-core';
import { resolvers, typeDefs } from '../graphQL'
import { userService, accountService, appartmentService, appartmentDetailService, appartmentTypeService, publicationService, reservationService, visitService, JWTService } from '../services';



export default async ({ app }: { app: Express }) => {

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res, userService, accountService, appartmentService, appartmentDetailService, appartmentTypeService, publicationService, reservationService, visitService }),
    plugins: [/* ApolloServerPluginDrainHttpServer({ httpServer }) */ ApolloServerPluginLandingPageDisabled()],
  });
  await server.start();
  app.use('/graphql', JWTService.verifyAccessToken)
  server.applyMiddleware({ app });

  return Promise.resolve()
}
