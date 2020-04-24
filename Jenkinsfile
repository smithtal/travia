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
                    pushNewDockerImage: {
                        docker.withRegistry('registry.hub.docker.com', 'docker-hub'){
                            def app = docker.build("travissmith94/travia")
                            app.push("${GIT_COMMIT}")
                            app.push("latest")
                        }

                    }
                )
            }
        }
    }
}