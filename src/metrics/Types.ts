export interface CollectorService<
  T extends CollectorConfig,
  K extends MetricItem
> {
  fetch(config: T): Promise<K[]>;
}

export interface MetricItem {
  id: string;
  createdAt: Date;
}

export interface CollectorConfig {}

export interface CollectorModuleFactory<
  T extends CollectorConfig,
  K extends MetricItem
> {
  collectorInstance(): CollectorService<T, K>;
  collectorConfiguration(obj: any): T;
}
