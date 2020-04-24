pipeline {
    agent any
    environment {
        GIT_COMMIT = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()
    }
    stages {
        stage('Lint') {
            steps{
                sh 'docker run --rm -i hadolint/hadolint < Dockerfile'
            }
        }
        stage('Upgrade infrastructure'){
            steps{
                parallel(
                    updateCloudFormationStack: {
                        withAWS(region: 'us-east-2', credentials: 'aws-credentials'){
                            cfnUpdate(stack: 'travia-network', file: "./cloudformation/network.yml")
                            cfnUpdate(stack: 'travia-cluster', file: "./cloudformation/cluster.yml")
                        }
                    },
                    buildDockerImage: {
                        sh "docker build . -t travissmith94/travia:${GIT_COMMIT}"
                        sh "docker push travissmith94/travia:${GIT_COMMIT}"
                    }
                )
            }
        }
        stage('Deploy'){
            steps{
                sh "sed -i 's/<tag>/${GIT_COMMIT}/' ./kubernetes/deployment.yml"
                sh "kubectl apply -f ./kubernetes/deployment.yml"
                sh "kubectl apply -f ./kubernetes/service.yml"
                sh "kubectl apply -f ./kubernetes/ingress.yml"
            }
        }
    }
}