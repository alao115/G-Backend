import { createClient } from 'redis'
import consola from 'consola'
import config from '../config'


// const client = createClient(Number(config.redisPort), config.redisHost);
// const client = createClient(config.redisUri, { db: config.redisDB, password: config.redisPass });

export default () => {
  const client = createClient(config.redisUri, { db: config.redisDB });
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