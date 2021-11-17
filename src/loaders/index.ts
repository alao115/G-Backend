import { Express } from 'express'
import expressLoader from './express'
import dbLoader from './db'
import consola from 'consola'
import graphQLLoader from './graphql'

export default ({ app }: { app: Express }) => {

  dbLoader()
    .then(() => consola.success("Loading database loader successfully"))
    .catch(err => {
      consola.error(err)
      process.exit(1)
    })

  graphQLLoader({ app })
    .then(() => {
      consola.success("Loading graphQL loader successfully")
      expressLoader({ app })
    }).then(() => consola.success("Loading express loader successfully"))






}