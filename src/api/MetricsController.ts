import { Request, Response } from 'express';
import { ApiMetricsService } from './ApiMetricsService';
import { MetricsRequest } from '../Types';

export class MetricsController {
  static postMetrics = async (req: Request, res: Response) => {
    await MetricsController.handleRequest(req, res);
  };

  static updateMetrics = async (req: Request, res: Response) => {
    await MetricsController.handleRequest(req, res);
  };

  private static async handleRequest(req: Request, res: Response) {
    try {
      await this.collectMetrics(req);
      res.json({ status: 'Done!.' });
      console.log('Done!');
    } catch (error) {
      console.error(error);
      res.json({ error: 'Could not process request' });
    }
  }

  private static async collectMetrics(req: Request): Promise<void> {
    const metricsRequest = this.createRequest(req);
    return ApiMetricsService.metricsForRequest(metricsRequest);
  }

  private static createRequest(req: Request): MetricsRequest {
    const repositoryName = req.body.repositoryName || null;
    const orgName = req.body.orgName || null;
    const method = req.method;
    const startDate = req.body.startDate || null;
    const endDate = req.body.endDate || null;

    const shouldUpdateEntries = method === 'PUT';
    return {
      config: { repositoryName, orgName },
      shouldUpdateEntries,
      since: startDate,
      until: endDate
    };
  }
}
