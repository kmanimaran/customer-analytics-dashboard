import {
  MetricCategory,
  Metric,
  DataStatus,
  BlockedReasonType,
  DashboardSummary,
} from '../types/metrics';
import metricsData from '../data/metricsData.json';

/**
 * Get all metric categories with their metrics
 */
export function getAllCategories(): MetricCategory[] {
  return metricsData.categories as MetricCategory[];
}

/**
 * Get a specific category by ID
 */
export function getCategoryById(categoryId: string): MetricCategory | undefined {
  return metricsData.categories.find(
    (cat) => cat.id === categoryId
  ) as MetricCategory | undefined;
}

/**
 * Get all metrics across all categories
 */
export function getAllMetrics(): Metric[] {
  const categories = metricsData.categories as MetricCategory[];
  return categories.flatMap((category) => category.metrics);
}

/**
 * Get metrics filtered by data status
 */
export function getMetricsByStatus(status: DataStatus): Metric[] {
  return getAllMetrics().filter((metric) => metric.dataStatus === status);
}

/**
 * Get metrics filtered by category ID
 */
export function getMetricsByCategoryId(categoryId: string): Metric[] {
  const category = getCategoryById(categoryId);
  return category ? category.metrics : [];
}

/**
 * Get blocked metrics grouped by blocker type
 */
export function getBlockedMetricsByType(): Record<BlockedReasonType, Metric[]> {
  const blockedMetrics = getMetricsByStatus('blocked');

  const grouped: Record<string, Metric[]> = {
    IT: [],
    Engineering: [],
    CS: [],
  };

  blockedMetrics.forEach((metric) => {
    if (metric.blockedReason) {
      const type = metric.blockedReason.type;
      if (!grouped[type]) {
        grouped[type] = [];
      }
      grouped[type].push(metric);
    }
  });

  return grouped as Record<BlockedReasonType, Metric[]>;
}

/**
 * Get dashboard summary statistics
 */
export function getDashboardSummary(): DashboardSummary {
  const allMetrics = getAllMetrics();
  const blockedByType = getBlockedMetricsByType();

  return {
    totalMetrics: allMetrics.length,
    liveDataCount: allMetrics.filter((m) => !m.isMockData).length,
    mockDataCount: allMetrics.filter((m) => m.isMockData).length,
    notApplicableCount: allMetrics.filter(
      (m) => m.dataStatus === 'fundamental-limitation'
    ).length,
    blockedByIT: blockedByType.IT?.length || 0,
    blockedByEngineering: blockedByType.Engineering?.length || 0,
    blockedByCS: blockedByType.CS?.length || 0,
  };
}

/**
 * Search metrics by question text
 */
export function searchMetrics(query: string): Metric[] {
  if (!query.trim()) {
    return getAllMetrics();
  }

  const lowerQuery = query.toLowerCase();
  return getAllMetrics().filter(
    (metric) =>
      metric.question.toLowerCase().includes(lowerQuery) ||
      metric.description?.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get metrics requiring integration work
 */
export function getIntegrationRequiredMetrics(): Metric[] {
  return getAllMetrics().filter(
    (metric) => metric.dataStatus === 'blocked' && metric.blockedReason
  );
}

/**
 * Get a specific metric by ID
 */
export function getMetricById(metricId: string): Metric | undefined {
  return getAllMetrics().find((metric) => metric.id === metricId);
}

/**
 * Calculate percentage of metrics by status
 */
export function getStatusPercentages(): Record<DataStatus, number> {
  const allMetrics = getAllMetrics();
  const total = allMetrics.length;

  const statuses: DataStatus[] = [
    'available',
    'short-term',
    'blocked',
    'low-priority',
    'fundamental-limitation',
  ];

  const percentages: Partial<Record<DataStatus, number>> = {};

  statuses.forEach((status) => {
    const count = allMetrics.filter((m) => m.dataStatus === status).length;
    percentages[status] = Math.round((count / total) * 100);
  });

  return percentages as Record<DataStatus, number>;
}
