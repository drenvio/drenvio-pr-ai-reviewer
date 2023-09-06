var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as core from '@actions/core';
import { getOctokit, context } from '@actions/github';
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('🎈 Se esta ejecutando la función');
            const token = core.getInput('github-token', { required: true });
            const octokit = getOctokit(token);
            const prNumber = core.getInput('pr-number', { required: true });
            const comment = core.getInput('comment', { required: true });
            yield octokit.rest.issues.createComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: parseInt(prNumber, 10),
                body: comment,
            });
            console.log('Comment posted successfully!');
        }
        catch (error) {
            console.log("Este es el error", error);
            core.setFailed(`Error: ${error.message}`);
        }
    });
}
run();
