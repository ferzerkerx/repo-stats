import { MetricItem } from '../metrics';
import { ElasticSearchService } from './Types';
import { ElasticSearchRepository } from './ElasticSearchRepository';

export class ElasticSearchServiceImpl implements ElasticSearchService {
  constructor(
    private readonly elasticSearchRepository: ElasticSearchRepository,
    private readonly indexPrefix: string,
    private readonly shouldReplaceEntry: boolean
  ) {}

  async push(metricItem: MetricItem): Promise<any> {
    const indexName = `${this.indexPrefix}`;
    const id = metricItem.id;

    if (!this.shouldReplaceEntry) {
      const entryExists = await this.elasticSearchRepository.entryExists(
        indexName,
        id
      );

      if (entryExists) {
        console.info('Item already exists...' + JSON.stringify(metricItem));
        return Promise.resolve({});
      }
    }

    return this.elasticSearchRepository.push({
      indexName,
      id,
      payload: metricItem
    });
  }
}
