import {
  GithubConfig,
  GithubEntry,
  GithubRepository,
  GithubService
} from './Types';
import { Converters } from './Converters';

export class GithubServiceImpl implements GithubService {
  constructor(private readonly githubRepository: GithubRepository) {}

  async commits(githubConfig: GithubConfig): Promise<GithubEntry[]> {
    const commits = (await this.githubRepository.commits(githubConfig)) || [];
    const entries: GithubEntry[] = [];

    for (const githubCommit of commits) {
      for (const githubCommitFile of githubCommit.files) {
        entries.push(Converters.toGithubEntry(githubCommit, githubCommitFile));
      }
    }

    return entries;
  }
}
