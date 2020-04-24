pipeline {
    agent any
    stages {
        stage('Lint') {
            steps{
                sh 'docker run --rm -i hadolint/hadolint < Dockerfile'
            }
        }
    }
}