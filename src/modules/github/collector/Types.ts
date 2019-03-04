import { CollectorConfig, MetricItem } from '../../../metrics';

export interface GithubMetricItem extends MetricItem {
  sha: string;
  author: string;
  repositoryName: string;
  //TODO
}

export class GithubCollectorConfig implements CollectorConfig {
  repositoryName: string;
  orgName: string;
  since?: string;
  until?: string;

  constructor({ repositoryName, orgName, since = null, until = null }) {
    this.repositoryName = repositoryName;
    this.orgName = orgName;
    this.since = since;
    this.until = until;
  }
}
