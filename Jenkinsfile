pipeline {
    agent any
    stages {
        stage('Lint') {
            steps{
                sh 'docker run --rm -i hadolint/hadolint < Dockerfile'
            }
        }
        stage('Update Infrastructure'){
            steps{
                withAWS(region: 'us-east-2', credentials: 'aws-credentials'){
                    cfnUpdate(stack: 'travia-network', file: "./cloudformation/network.yml")
                    cfnUpdate(stack: 'travia-cluster', file: "./cloudformation/cluster.yml")
                }
            }
        }
    }
}