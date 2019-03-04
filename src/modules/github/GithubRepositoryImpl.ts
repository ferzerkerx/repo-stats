import {
  GithubClient,
  GithubCommit,
  GithubConfig,
  GithubRepository
} from './Types';
import { Converters } from './Converters';

export class GithubRepositoryImpl implements GithubRepository {
  constructor(private readonly githubClient: GithubClient) {}

  async commits(githubConfig: GithubConfig): Promise<GithubCommit[]> {
    const { repositoryName, orgName } = githubConfig;

    const commitsSha: string[] = await this.githubClient.commits(githubConfig);
    const commitsWithDetailsPromise: Promise<GithubCommit>[] = commitsSha.map(
      commitSha => {
        return this.getCommitDetails(repositoryName, orgName, commitSha);
      }
    );
    return Promise.all(commitsWithDetailsPromise);
  }

  private async getCommitDetails(
    repositoryName: string,
    orgName: string,
    sha: string
  ): Promise<GithubCommit> {
    const commitDetailsResponse = await this.githubClient.getCommitDetails(
      repositoryName,
      orgName,
      sha
    );

    return Converters.toGithubCommit(commitDetailsResponse);
  }
}
