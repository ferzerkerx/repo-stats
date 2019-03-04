import {
  ReposGetCommitResponse,
  ReposGetCommitResponseFilesItem
} from '@octokit/rest';
import { GithubCommit, GithubCommitFile, GithubEntry } from './Types';

export class Converters {
  static toFiles(files: ReposGetCommitResponseFilesItem[]): GithubCommitFile[] {
    return files.map(fileData => {
      return {
        filename: fileData.filename,
        additions: fileData.additions,
        deletions: fileData.deletions
      };
    });
  }

  static toGithubCommit(data: ReposGetCommitResponse): GithubCommit {
    return {
      sha: data.sha,
      createdAt: new Date(data.commit.committer.date),
      linesAdded: data.stats.additions,
      linesRemoved: data.stats.deletions,
      author: data.author ? data.author.login : data.commit.committer.name,
      message: data.commit.message,
      files: Converters.toFiles(data.files)
    };
  }

  static toGithubEntry(
    commit: GithubCommit,
    file: GithubCommitFile
  ): GithubEntry {
    return {
      sha: commit.sha,
      createdAt: commit.createdAt,
      author: commit.author,
      filename: file.filename,
      additions: file.additions,
      deletions: file.deletions,
      categories: [] //TODO
    };
  }
}
