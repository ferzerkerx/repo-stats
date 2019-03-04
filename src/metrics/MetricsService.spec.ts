import { MetricsService } from './MetricsService';
import { ElasticSearchService } from '../es';
import { CollectorConfig, CollectorService, MetricItem } from './Types';

describe('MetricsService', () => {
  const elasticSearchService: ElasticSearchService = {
    push: (payload: MetricItem): Promise<any> => {
      return;
    }
  };

  const fakeCollector: CollectorService<CollectorConfig, MetricItem> = {
    fetch: async (config: CollectorConfig): Promise<MetricItem[]> => {
      return [
        {
          id: 'someId',
          dataType: 'someIdDatatype',
          createdAt: new Date('2019-02-20')
        }
      ];
    }
  };

  it('should process metrics', async () => {
    const spy = jest.spyOn(elasticSearchService, 'push');

    const metricsService: MetricsService = new MetricsService(
      elasticSearchService,
      fakeCollector
    );

    const collectorConfig: CollectorConfig = {};

    await metricsService.start(collectorConfig);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
