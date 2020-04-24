pipeline {
    agent any
    stages {
        stage('Lint') {
            sh 'docker run --rm -i hadolint/hadolint < Dockerfile'
        }
    }
}