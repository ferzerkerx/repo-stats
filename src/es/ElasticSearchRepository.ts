import * as elasticsearch from 'elasticsearch';

export class ElasticSearchRepository {
  private readonly client: any;
  private readonly host: string;

  constructor({ host }) {
    this.host = host;
    this.client = new elasticsearch.Client({
      host: this.host,
      log: 'error'
    });
  }

  async push({ indexName, id, payload }): Promise<any> {
    return this.client.index({
      index: indexName,
      id,
      body: {
        ...payload
      }
    });
  }

  async entryExists(indexName: string, id: string): Promise<boolean> {
    const response = await this.client
      .search({
        index: indexName,
        body: {
          query: {
            match: {
              id
            }
          }
        }
      })
      .catch(ignored => {
        return { hits: { hits: [] } };
      });

    return response.hits.hits.length > 0;
  }
}
