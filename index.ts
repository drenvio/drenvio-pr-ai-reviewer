import * as core from '@actions/core'
import { getOctokit, context } from '@actions/github'

async function run() {
    try {

        console.log('🎈 Se esta ejecutando la función')

        const token = core.getInput('github-token', { required: true });
        const octokit = getOctokit(token);

        const prNumber = core.getInput('pr-number', { required: true });
        const comment = core.getInput('comment', { required: true });

        await octokit.rest.issues.createComment({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: parseInt(prNumber, 10),
            body: comment,
          });
        
          console.log('Comment posted successfully!');
    } catch (error: any) {
        console.log("Este es el error", error)
        core.setFailed(`Error: ${error.message}`);
    }
}

run();