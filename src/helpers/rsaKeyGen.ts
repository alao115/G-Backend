import nodeRsa from 'node-rsa'
import fs from 'fs'
import path from 'path'

const key = new nodeRsa({ b: 1024 })

const public_key = key.exportKey('public')
const private_key = key.exportKey('private')

fs.writeFileSync(path.join('keys', 'public.pem'), public_key)
fs.writeFileSync(path.join('keys', 'private.pem'), private_key)

