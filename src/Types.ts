export interface MetricsRequest {
  shouldUpdateEntries: boolean;
  config: any;
  since?: Date;
  until?: Date;
}
