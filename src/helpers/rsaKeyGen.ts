import nodeRsa from 'node-rsa'
import fs from 'fs'
import path from 'path'

const key = new nodeRsa({ b: 1024 })

const public_key = key.exportKey('public')
const private_key = key.exportKey('private')

fs.writeFileSync(path.join('../keys', 'gontche_password_recovery_public_key.pem'), public_key)
fs.writeFileSync(path.join('../keys', 'gontche_password_recovery_private_key.pem'), private_key)

