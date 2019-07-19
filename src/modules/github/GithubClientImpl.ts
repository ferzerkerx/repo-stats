import * as Octokit from '@octokit/rest';
import { GithubClient, GithubConfig } from './Types';
import Bottleneck from 'bottleneck';

const limiter = new Bottleneck({
  reservoir: 30,
  reservoirRefreshAmount: 30,
  reservoirRefreshInterval: 60 * 1000,
  minTime: 333,
  maxConcurrent: 1
});

//TODO deal with pagination
export class GithubClientImpl implements GithubClient {
  private readonly octokit: Octokit;
  private readonly token: string;
  constructor({ token }) {
    this.token = token;

    this.octokit = new Octokit({
      auth: `token ${token}`
    });
  }

  async commits(githubConfig: GithubConfig): Promise<string[]> {
    const reposGetCommitsParams: Octokit.ReposListCommitsParams = {
      owner: githubConfig.orgName,
      repo: githubConfig.repositoryName,
      sha: 'master'
    };

    if (githubConfig.since) {
      reposGetCommitsParams.since = githubConfig.since;
    }

    if (githubConfig.until) {
      reposGetCommitsParams.until = githubConfig.until;
    }

    const { data: commitResponseItems } = await limiter.schedule(() => {
      return this.octokit.repos.listCommits(reposGetCommitsParams);
    });
    return commitResponseItems.map(commit => commit.sha);
  }

  async getCommitDetails(
    repositoryName: string,
    orgName: string,
    ref: string
  ): Promise<any> {
    const commitConfig = {
      owner: orgName,
      repo: repositoryName,
      ref
    };
    const { data } = await this.octokit.repos.getCommit(commitConfig);
    return data;
  }
}
