import { GithubEntry } from '../Types';
import { GithubCollectorConfig, GithubMetricItem } from './Types';
import * as crypto from 'crypto';

export class GithubMetricConverter {
  static toMetricItem(
    githubEntries: GithubEntry[],
    githubConfig: GithubCollectorConfig
  ): GithubMetricItem[] {
    return githubEntries.map(entry => {
      const hash = crypto
        .createHmac('sha256', 'seed')
        .update(`${entry.sha}-${entry.filename}`)
        .digest('hex');

      return {
        id: hash,
        dataType: 'SCM',
        repositoryName: githubConfig.repositoryName,
        ...entry
      };
    });
  }
}
