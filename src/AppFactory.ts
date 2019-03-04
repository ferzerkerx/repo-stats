import { CollectorConfig, MetricsService } from './metrics';
import { ElasticSearch } from './es';
import { GithubModuleFactory } from './modules/github';

export class AppFactory {
  static collectorConfiguration(config: any): CollectorConfig {
    return new GithubModuleFactory().collectorConfiguration(config);
  }

  static metricsService(shouldReplaceEntry = false): MetricsService {
    const elasticSearchService = ElasticSearch.esService(
      'myIndex',
      shouldReplaceEntry
    );
    return new MetricsService(
      elasticSearchService,
      new GithubModuleFactory().collectorInstance()
    );
  }
}
