'use client';

import { Metric } from '@/lib/types/metrics';
import { BarChart, DonutChart } from '@tremor/react';
import { formatNumber, formatPercentage } from '@/lib/utils/formatters';

interface MetricChartProps {
  metric: Metric;
}

export function MetricChart({ metric }: MetricChartProps) {
  const { visualizationType, chartData, tableData, currentValue, metadata } =
    metric;

  // Number/Percentage display
  if (visualizationType === 'number' || visualizationType === 'percentage') {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="text-4xl font-bold text-gray-900">
          {visualizationType === 'percentage' && typeof currentValue === 'number'
            ? formatPercentage(currentValue)
            : currentValue}
        </div>
        {metadata.unit && (
          <div className="text-sm text-gray-500 mt-2">{metadata.unit}</div>
        )}
      </div>
    );
  }

  // Bar Chart
  if (visualizationType === 'bar-chart' && chartData) {
    return (
      <div className="h-64">
        <BarChart
          data={chartData}
          index="date"
          categories={['value']}
          colors={['blue']}
          valueFormatter={(value) =>
            metadata.unit === 'percentage' ? `${value}%` : formatNumber(value)
          }
          showLegend={false}
          showGridLines={true}
          yAxisWidth={48}
        />
      </div>
    );
  }

  // Donut Chart
  if (visualizationType === 'donut-chart' && chartData) {
    return (
      <div className="h-64 flex items-center justify-center">
        <DonutChart
          data={chartData}
          category="value"
          index="date"
          colors={['emerald', 'blue', 'amber', 'rose', 'purple']}
          valueFormatter={(value) =>
            metadata.unit === 'percentage' ? `${value}%` : formatNumber(value)
          }
          showLabel={true}
        />
      </div>
    );
  }

  // Line Chart (using bar chart with different style)
  if (visualizationType === 'line-chart' && chartData) {
    return (
      <div className="h-64">
        <BarChart
          data={chartData}
          index="date"
          categories={['value']}
          colors={['indigo']}
          valueFormatter={(value) =>
            metadata.unit === 'percentage' ? `${value}%` : formatNumber(value)
          }
          showLegend={false}
          showGridLines={true}
        />
      </div>
    );
  }

  // Progress Bar
  if (visualizationType === 'progress' && typeof currentValue === 'number') {
    const percentage = metadata.targetValue
      ? (currentValue / metadata.targetValue) * 100
      : currentValue;

    return (
      <div className="py-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-700">
            {formatPercentage(percentage)}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
      </div>
    );
  }

  // Table
  if (visualizationType === 'table' && tableData) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {tableData.headers.map((header, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData.rows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Fallback for unknown visualization types
  return (
    <div className="flex items-center justify-center py-8 text-gray-500">
      <p>Visualization not available</p>
    </div>
  );
}
