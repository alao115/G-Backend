pipeline {
    agent any
    environment {
        CI = 'true'
    }
    stages {
        stage('Install') {
            steps {
                sh 'npm install'
                sh 'npm install --dev tsc'
            }
        }
        stage('Compile typescript') {
            steps {
                sh 'npm run tsc'
            }
        }
        stage('Deliver') {
            steps {
                // sh 'cp -vR ${WORKSPACE}/src ${WORKSPACE}/.eslintrc.json ${WORKSPACE}/.gitignore ${WORKSPACE}/docker-compose.yml ${WORKSPACE}/Dockerfile ${WORKSPACE}/ecosystem.config.js ${WORKSPACE}/Jenkinsfile ${WORKSPACE}/prettier.config.js ${WORKSPACE}/tsconfig.json ${WORKSPACE}/tslint.json /home/app/backend'
                sh 'cp -vR ${WORKSPACE} /home/app/backend'
                // sh 'cp -vR ${WORKSPACE}/dist'
            }
        }
    }
}
