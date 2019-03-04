export interface GithubEntry {
  sha: string;
  createdAt: Date;
  author: string;
  filename: string;
  additions: number;
  deletions: number;
  categories?: string[];
}

export interface GithubCommitFile {
  filename: string;
  additions: number;
  deletions: number;
}

export class GithubCommit {
  sha: string;
  createdAt: Date;
  linesAdded: number;
  linesRemoved: number;
  author: string;
  message: string;
  files: GithubCommitFile[];
}

export interface GithubConfig {
  repositoryName: string;
  orgName?: string;
  since?: string;
  until?: string;
}

export interface GithubRepository {
  commits(githubConfig: GithubConfig): Promise<GithubCommit[]>;
}

export interface GithubService {
  commits(githubConfig: GithubConfig): Promise<GithubEntry[]>;
}

export interface GithubClient {
  commits(githubConfig: GithubConfig): Promise<string[]>;

  getCommitDetails(
    repositoryName: string,
    orgName: string,
    sha: string
  ): Promise<any>;
}
