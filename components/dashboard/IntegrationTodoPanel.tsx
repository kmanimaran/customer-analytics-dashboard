'use client';

import { Metric, BlockedReasonType } from '@/lib/types/metrics';
import { getBlockedMetricsByType, getDashboardSummary } from '@/lib/services/metricsService';
import { Card } from '@tremor/react';
import { useState } from 'react';
import { getBlockerTypeColor } from '@/lib/utils/formatters';

export function IntegrationTodoPanel() {
  const [isExpanded, setIsExpanded] = useState(true);
  const blockedByType = getBlockedMetricsByType();
  const summary = getDashboardSummary();

  const exportToMarkdown = () => {
    let markdown = '# Customer Analytics Dashboard - Integration Requirements\n\n';
    markdown += '## Summary\n';
    markdown += `- Total Metrics: ${summary.totalMetrics}\n`;
    markdown += `- Live Data: ${summary.liveDataCount}/${summary.totalMetrics} (${Math.round((summary.liveDataCount / summary.totalMetrics) * 100)}%)\n`;
    markdown += `- Requiring Integration: ${summary.mockDataCount}/${summary.totalMetrics} (${Math.round((summary.mockDataCount / summary.totalMetrics) * 100)}%)\n`;
    markdown += `- Not Applicable: ${summary.notApplicableCount}/${summary.totalMetrics} (${Math.round((summary.notApplicableCount / summary.totalMetrics) * 100)}%)\n\n`;

    const types: BlockedReasonType[] = ['IT', 'Engineering', 'CS'];

    types.forEach((type) => {
      const metrics = blockedByType[type] || [];
      if (metrics.length > 0) {
        markdown += `## ${type} Support Required (${metrics.length} metrics)\n\n`;

        metrics.forEach((metric, idx) => {
          markdown += `### ${idx + 1}. ${metric.question}\n`;
          markdown += `- **Current Status**: Mock data\n`;
          if (metric.blockedReason) {
            markdown += `- **Required**: ${metric.blockedReason.description}\n`;
            if (metric.blockedReason.estimatedEffort) {
              markdown += `- **Estimated Effort**: ${metric.blockedReason.estimatedEffort}\n`;
            }
            if (metric.blockedReason.requiredFrom) {
              markdown += `- **Owner**: ${metric.blockedReason.requiredFrom}\n`;
            }
          }
          markdown += `- **Priority**: ${metric.categoryId === 'short-term' ? 'High' : 'Medium'}\n`;
          markdown += '\n';
        });
      }
    });

    markdown += '## Implementation Checklist\n\n';
    markdown += `- [ ] Identify IT contact for system access (${blockedByType.IT?.length || 0} metrics)\n`;
    markdown += `- [ ] Identify Engineering contact for API development (${blockedByType.Engineering?.length || 0} metrics)\n`;
    markdown += `- [ ] Identify CS contact for data exports (${blockedByType.CS?.length || 0} metrics)\n`;
    markdown += '- [ ] Define data refresh schedules\n';
    markdown += '- [ ] Create data pipeline architecture\n';
    markdown += '- [ ] Implement authentication for data sources\n';
    markdown += '- [ ] Build ETL processes\n';
    markdown += '- [ ] Set up monitoring and alerts\n';
    markdown += '- [ ] Create data quality checks\n';
    markdown += '- [ ] Document all integrations\n';

    // Download as file
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'integration-todo.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderMetricsList = (metrics: Metric[], type: BlockedReasonType) => {
    if (!metrics || metrics.length === 0) return null;

    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getBlockerTypeColor(type)}`}>
            {type === 'IT' && '🔧 '}
            {type === 'Engineering' && '⚙️ '}
            {type === 'CS' && '👥 '}
            {type} Support ({metrics.length})
          </span>
        </div>
        <ul className="space-y-2">
          {metrics.map((metric) => (
            <li key={metric.id} className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 text-blue-600 rounded"
              />
              <div>
                <p className="text-gray-900 font-medium">{metric.question}</p>
                {metric.blockedReason && (
                  <p className="text-gray-600 text-xs mt-1">
                    {metric.blockedReason.description}
                    {metric.blockedReason.estimatedEffort && (
                      <span className="ml-2 text-gray-500">
                        • Effort: {metric.blockedReason.estimatedEffort}
                      </span>
                    )}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <Card className="bg-blue-50 border-2 border-blue-200">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            🚀 Integration Required
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {summary.mockDataCount} metrics need data source integration
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              exportToMarkdown();
            }}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Export TODO
          </button>
          <button className="text-gray-400 hover:text-gray-600 transition-transform"
            style={{
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            ▼
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-6 space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-xs text-gray-600 mb-1">Total Metrics</p>
              <p className="text-2xl font-bold text-gray-900">{summary.totalMetrics}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-xs text-gray-600 mb-1">Live Data</p>
              <p className="text-2xl font-bold text-green-700">
                {summary.liveDataCount}
                <span className="text-sm ml-2">
                  ({Math.round((summary.liveDataCount / summary.totalMetrics) * 100)}%)
                </span>
              </p>
            </div>
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <p className="text-xs text-gray-600 mb-1">Mock Data</p>
              <p className="text-2xl font-bold text-amber-700">
                {summary.mockDataCount}
                <span className="text-sm ml-2">
                  ({Math.round((summary.mockDataCount / summary.totalMetrics) * 100)}%)
                </span>
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-xs text-gray-600 mb-1">Not Applicable</p>
              <p className="text-2xl font-bold text-gray-700">
                {summary.notApplicableCount}
                <span className="text-sm ml-2">
                  ({Math.round((summary.notApplicableCount / summary.totalMetrics) * 100)}%)
                </span>
              </p>
            </div>
          </div>

          {/* Blocked Metrics by Type */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Required Integrations by Team
            </h3>

            {renderMetricsList(blockedByType.IT, 'IT')}
            {renderMetricsList(blockedByType.Engineering, 'Engineering')}
            {renderMetricsList(blockedByType.CS, 'CS')}

            {/* Implementation Checklist */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-md font-semibold text-gray-900 mb-3">
                Implementation Checklist
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1 h-4 w-4" />
                  <span>Identify IT contact for system access</span>
                </li>
                <li className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1 h-4 w-4" />
                  <span>Identify Engineering contact for API development</span>
                </li>
                <li className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1 h-4 w-4" />
                  <span>Identify CS contact for data exports</span>
                </li>
                <li className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1 h-4 w-4" />
                  <span>Define data refresh schedules</span>
                </li>
                <li className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1 h-4 w-4" />
                  <span>Create data pipeline architecture</span>
                </li>
                <li className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1 h-4 w-4" />
                  <span>Set up monitoring and alerts</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
