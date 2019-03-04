import { ElasticSearchService } from '../es';
import { CollectorConfig, CollectorService, MetricItem } from './Types';

export class MetricsService {
  constructor(
    private readonly elasticSearch: ElasticSearchService,
    private readonly collectorService: CollectorService<
      CollectorConfig,
      MetricItem
    >
  ) {}

  async start(collectorConfig: CollectorConfig): Promise<void> {
    if (!collectorConfig) {
      return;
    }

    try {
      const metricItems = await this.collectorService.fetch(collectorConfig);
      await this.processMetrics(metricItems);

      console.log(
        `Finished collecting metrics for: ${JSON.stringify(collectorConfig)}`
      );
    } catch (error) {
      const errorMessage = `There was a problem collecting metrics for: ${JSON.stringify(
        collectorConfig
      )}, error:${JSON.stringify(error)}, message:${error.message}`;
      console.warn(`${errorMessage}`);
      throw errorMessage;
    }
  }
  private async processMetrics<T extends MetricItem>(
    metricItems: T[]
  ): Promise<void> {
    const pushPromises = metricItems.map(metricItem =>
      this.elasticSearch.push(metricItem)
    );
    await Promise.all(pushPromises);
  }
}
