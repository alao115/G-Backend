pipeline {
    agent any
    environment {
        CI = 'true'
    }
    stages {
        stage('Install') {
            steps {
                sh 'yarn install'
            }
        }
        stage('Compile typescript') {
            steps {
                sh 'npm run tsc'
            }
        }
        stage('Deliver and deploy') {
            steps {
                sh 'cp -vuR ${WORKSPACE}/dist ${WORKSPACE}/src ${WORKSPACE}/.eslintrc.json ${WORKSPACE}/.gitignore ${WORKSPACE}/docker-compose.yml ${WORKSPACE}/Dockerfile ${WORKSPACE}/ecosystem.config.js ${WORKSPACE}/Jenkinsfile ${WORKSPACE}/prettier.config.js ${WORKSPACE}/tsconfig.json ${WORKSPACE}/tslint.json /home/app/backend'
                sh 'cp -vuR /home/app/backend/src/keys /home/app/backend/dist'
            }
        }
    }
}
