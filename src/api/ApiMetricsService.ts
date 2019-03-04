import { AppFactory } from '../AppFactory';
import { MetricsRequest } from '../Types';

export class ApiMetricsService {
  public static async metricsForRequest(
    metricsRequest: MetricsRequest
  ): Promise<void> {
    try {
      await this.collectMetrics(
        metricsRequest.config,
        metricsRequest.shouldUpdateEntries
      );
      console.log('Done!');
    } catch (error) {
      console.error(error);
    }
  }

  private static async collectMetrics(
    config: any,
    shouldUpdateEntries: boolean
  ) {
    const collectorConfig = AppFactory.collectorConfiguration(config);

    const metricsService = AppFactory.metricsService(shouldUpdateEntries);
    return metricsService.start(collectorConfig);
  }
}
