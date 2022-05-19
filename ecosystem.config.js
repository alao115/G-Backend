module.exports = {
  apps: [
    {
      name: 'gontche_backend_prod',
      script: 'npm run start',
      watch: true,
      env: {
        APP_NAME: "API Gontche",
        APP_PORT: 7500,
        APP_ENV: 'development',
        DB_NAME: 'mongodb://gontche_prod:Gontche!atDBProd@localhost:27017/gontche',
        FRONTEND_URL: 'https://gontche.com',
        EMAIL_HOST: 'mail.privateemail.com',
        EMAIL_USER: 'catch-all@rcg.studio',
        EMAIL_PASSWORD: 'Bbb123@rcg',
        EMAIL_SECURE: true,
        EMAIL_PORT: 465
      }
    },
    {
      name: 'gontche_backend_dev',
      script: 'npm run dev',
      watch: true
    }
  ]
}
