'use client';

import { Metric } from '@/lib/types/metrics';
import { DataStatusBadge } from './DataStatusBadge';
import { MetricChart } from './MetricChart';
import { getBlockerTypeColor, getRelativeTime } from '@/lib/utils/formatters';
import { Card } from '@tremor/react';

interface MetricCardProps {
  metric: Metric;
}

export function MetricCard({ metric }: MetricCardProps) {
  const {
    question,
    dataStatus,
    isMockData,
    blockedReason,
    metadata,
    description,
  } = metric;

  return (
    <Card
      className={`metric-card relative overflow-hidden ${
        isMockData ? 'mock-data-overlay' : ''
      } ${dataStatus === 'blocked' ? 'pulse-blocked' : ''}`}
    >
      {/* Status Badge */}
      <div className="flex justify-between items-start mb-4 relative z-10">
        <DataStatusBadge status={dataStatus} isMockData={isMockData} />
        {metadata.trend && (
          <span
            className={`text-sm ${
              metadata.trend === 'up'
                ? 'text-green-600'
                : metadata.trend === 'down'
                ? 'text-red-600'
                : 'text-gray-600'
            }`}
          >
            {metadata.trend === 'up' ? '↑' : metadata.trend === 'down' ? '↓' : '→'}
          </span>
        )}
      </div>

      {/* Mock Data Warning Banner */}
      {isMockData && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 relative z-10">
          <div className="flex items-start gap-2">
            <span className="text-amber-600 text-lg">⚠️</span>
            <div className="flex-1">
              <p className="text-xs font-semibold text-amber-800">
                SAMPLE DATA - Integration Required
              </p>
              <p className="text-xs text-amber-700 mt-1">
                This metric uses placeholder data.
                {blockedReason &&
                  ` Real data requires ${blockedReason.type} support.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Question */}
      <h3 className="text-sm font-semibold text-gray-900 mb-3 relative z-10 leading-snug">
        {question}
      </h3>

      {/* Description if available */}
      {description && (
        <p className="text-xs text-gray-600 mb-3 relative z-10">{description}</p>
      )}

      {/* Blocked Reason Details */}
      {blockedReason && (
        <div className="mb-4 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getBlockerTypeColor(
                blockedReason.type
              )}`}
            >
              {blockedReason.type === 'IT' && '🔧'}
              {blockedReason.type === 'Engineering' && '⚙️'}
              {blockedReason.type === 'CS' && '👥'}
              <span className="ml-1">{blockedReason.type} Support Needed</span>
            </span>
            {blockedReason.estimatedEffort && (
              <span className="text-xs text-gray-500">
                Effort: {blockedReason.estimatedEffort}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-700 bg-gray-50 p-2 rounded">
            💡 {blockedReason.description}
          </p>
          {blockedReason.requiredFrom && (
            <p className="text-xs text-gray-500 mt-1">
              Contact: {blockedReason.requiredFrom}
            </p>
          )}
        </div>
      )}

      {/* Chart/Visualization */}
      <div className="relative z-10">
        <MetricChart metric={metric} />
      </div>

      {/* Footer with metadata */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500 relative z-10">
        <span>Updated {getRelativeTime(metadata.lastUpdated)}</span>
        {metadata.notes && (
          <span
            className="cursor-help"
            title={metadata.notes}
          >
            ℹ️
          </span>
        )}
      </div>
    </Card>
  );
}
