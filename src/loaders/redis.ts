import { createClient } from 'redis'
import consola from 'consola'
import config from '../config'


export default () => {
  const client = config.redisPass ? createClient(config.redisUri, { db: config.redisDB, password: config.redisPass }) : createClient(config.redisUri, { db: config.redisDB });
    return new Promise((resolve, reject) => {

        client.on("connect", () => {
            consola.success("Redis client is connected to the redis server")
        })

        client.on("ready", () => {
            consola.success("Redis client is ready to be used")
            resolve(client)
        })

        client.on("error", function(err: Error) {
            // console.log('Here we are: ', err)
            reject(err)
        });

        process.on("SIGINT", () => {
            client.quit()
        })
    })
}