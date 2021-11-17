import { Service } from 'typedi'
import redisClient from '../loaders/redis'

async function initRedis() {
  try {
    const client = await redisClient()
    return client
  } catch (error) { throw error }
}

export interface redisClient {
  setKey (key: string, value: string): Promise<unknown>;
  getKey (key: string): Promise<unknown>;
}

@Service('RedisClient')
class RedisClient implements redisClient {

  private redis: any = null;

  constructor () {
    initRedis()
      .then((client) => {
        this.redis = client
      }).catch(err => {
        // console.log(err.toString)
      })
  }

  setKey(key: string, value: string) {
    return new Promise(async (resolve, reject) => {
      try {
        // const client = await this.redis() as any
        this.redis.set(key, value, (err: Error, _: any) => {
          if (err) reject(err)
          resolve(value)
        })
      } catch (error: any) {
        reject(error)
      }
    })
  }

  getKey(key: string) {
    return new Promise(async (resolve, reject) => {
      try {
        // const client = await this.redis() as any
        this.redis.get(key, (err: Error, value: string) => {
          if (err) reject(err)
          resolve(value)
        })
      } catch (error) { reject(error) }
    })
  }
}

export default RedisClient
