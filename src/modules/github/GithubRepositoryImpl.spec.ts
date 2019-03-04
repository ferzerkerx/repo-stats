import { GithubClient, GithubConfig, GithubRepository } from './Types';
import * as commitsFakeData from './test/commits-response.json';
import * as commitDetailsFakeData from './test/commit-details-response.json';
import { GithubRepositoryImpl } from './GithubRepositoryImpl';

describe('GithubRepository', () => {
  const githubClient: GithubClient = {
    async commits(githubConfig: GithubConfig): Promise<any> {
      return commitsFakeData;
    },
    async getCommitDetails(
      repositoryName: string,
      orgName: string,
      sha: string
    ): Promise<any> {
      return commitDetailsFakeData;
    }
  };

  const githubService: GithubRepository = new GithubRepositoryImpl(
    githubClient
  );

  it('should get commits', async () => {
    const githubConfig: GithubConfig = {
      repositoryName: 'someRepositoryName',
      orgName: 'someOrgName',
      since: '2018-12-03'
    };
    const data = await githubService.commits(githubConfig);
    expect(data).toMatchSnapshot();
  });
});
