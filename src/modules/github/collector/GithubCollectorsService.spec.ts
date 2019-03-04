import { GithubCollectorConfig } from './Types';
import { GithubConfig, GithubEntry, GithubService } from '../Types';
import { GithubCollectorService } from './GithubCollectorService';

function testEntry(): GithubEntry {
  return {
    sha: 'someSha',
    createdAt: new Date('2018-12-06'),
    additions: 30,
    deletions: 6,
    author: 'someAuthor',
    filename: 'someFileName.txt'
  };
}

describe('GithubCollectorsService', () => {
  const githubService: GithubService = {
    commits: async (githubConfig: GithubConfig): Promise<GithubEntry[]> => {
      return [testEntry()];
    }
  };

  const githubCollectorsService: GithubCollectorService = new GithubCollectorService(
    githubService
  );

  it('should fetch githubMetrics', async () => {
    const githubCollectorConfig: GithubCollectorConfig = new GithubCollectorConfig(
      {
        repositoryName: 'someRepoName',
        orgName: 'someOrgName',
        since: '2018-11-20',
        until: '2020-11-20'
      }
    );

    const data = await githubCollectorsService.fetch(githubCollectorConfig);
    expect(data).toMatchSnapshot();
  });
});
