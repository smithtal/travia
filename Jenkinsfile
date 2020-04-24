pipeline {
    agent any
    stages {
        stage('Lint') {
            steps{
                sh 'docker run --rm -i hadolint/hadolint < Dockerfile'
            }
        }
        stage('Build'){
            steps{
                parallel(
                    updateCloudFormationStack: {
                        withAWS(region: 'us-east-2', credentials: 'aws-credentials'){
                            cfnUpdate(stack: 'travia-network', file: "./cloudformation/network.yml")
                            cfnUpdate(stack: 'travia-cluster', file: "./cloudformation/cluster.yml")
                        }
                    },
                    buildDockerImage: {
                        gitCommit = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()
                        sh 'docker build . -t travissmith94/travia:$gitCommit'
                    }
                )
            }
        }
    }
}