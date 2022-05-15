import { Express } from 'express'
import expressLoader from './express'
import dbLoader from './db'
import consola from 'consola'
import graphQLLoader from './graphql'

export default async ({ app }: { app: Express }) => {

  try {
    await dbLoader()
    consola.success("Loading database loader successfully")
    await graphQLLoader({ app })
    consola.success("Loading graphQL loader successfully")
    await expressLoader({ app })
    return consola.success("Loading express loader successfully")
  } catch (err) {
    consola.error(err)
    process.exit(1)
  }
}