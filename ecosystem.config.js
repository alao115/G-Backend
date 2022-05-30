module.exports = {
  apps: [
    {
      name: 'gontche_backend_prod',
      script: 'npm run start',
      watch: true,
      env: {
      }
    },
    {
      name: 'gontche_backend_dev',
      script: 'npm run dev',
      watch: true
    }
  ]
}
