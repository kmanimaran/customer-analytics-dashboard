export type DataStatus =
  | 'available'
  | 'short-term'
  | 'blocked'
  | 'low-priority'
  | 'fundamental-limitation';

export type BlockedReasonType = 'IT' | 'Engineering' | 'CS';

export type VisualizationType =
  | 'number'
  | 'percentage'
  | 'line-chart'
  | 'bar-chart'
  | 'donut-chart'
  | 'progress'
  | 'table';

export interface BlockedReason {
  type: BlockedReasonType;
  description: string;
  estimatedEffort?: 'Small' | 'Medium' | 'Large';
  requiredFrom?: string;
}

export interface MetricMetadata {
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  lastUpdated: string;
  targetValue?: number;
  notes?: string;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface TableData {
  headers: string[];
  rows: Array<Array<string | number>>;
}

export interface Metric {
  id: string;
  question: string;
  categoryId: string;
  dataStatus: DataStatus;
  blockedReason?: BlockedReason;
  currentValue: number | string;
  isMockData: boolean;
  visualizationType: VisualizationType;
  metadata: MetricMetadata;
  chartData?: ChartDataPoint[];
  tableData?: TableData;
  description?: string;
}

export interface MetricCategory {
  id: string;
  name: string;
  description: string;
  dataStatus: DataStatus;
  priority: number;
  metrics: Metric[];
  icon?: string;
}

export interface DashboardSummary {
  totalMetrics: number;
  liveDataCount: number;
  mockDataCount: number;
  notApplicableCount: number;
  blockedByIT: number;
  blockedByEngineering: number;
  blockedByCS: number;
}
