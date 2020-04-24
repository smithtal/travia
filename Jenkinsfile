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
                sh 'cd ./cloudformation'
                sh 'aws cloudformation update-stack --stack-name travia-network --template-body file://network.yml --capabilities "CAPABILITY_IAM" "CAPABILITY_NAMED_IAM" --region=us-east-2'
                sh 'aws cloudformation update-stack --stack-name travia-cluster --template-body file://cluster.yml --capabilities "CAPABILITY_IAM" "CAPABILITY_NAMED_IAM" --region=us-east-2'
            }
        }
    }
}