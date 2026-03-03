'use client';

import { DashboardSummary } from '@/lib/types/metrics';
import { Card } from '@tremor/react';

interface DashboardHeaderProps {
  summary: DashboardSummary;
  onSearch?: (query: string) => void;
}

export function DashboardHeader({ summary, onSearch }: DashboardHeaderProps) {
  const livePercentage = Math.round((summary.liveDataCount / summary.totalMetrics) * 100);

  return (
    <div className="mb-8">
      {/* Title and Description */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Customer Utilization Analytics Dashboard
        </h1>
        <p className="text-gray-600">
          Analytics for customer utilization metrics across FFRCT, Plaque, and Roadmap products
        </p>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <p className="text-xs text-gray-600 mb-1">Total Metrics</p>
          <p className="text-3xl font-bold text-gray-900">{summary.totalMetrics}</p>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <p className="text-xs text-gray-600 mb-1">Live Data</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-green-700">{summary.liveDataCount}</p>
            <p className="text-sm text-green-600">({livePercentage}%)</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <p className="text-xs text-gray-600 mb-1">Mock Data</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-amber-700">{summary.mockDataCount}</p>
            <p className="text-sm text-amber-600">
              ({Math.round((summary.mockDataCount / summary.totalMetrics) * 100)}%)
            </p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <p className="text-xs text-gray-600 mb-1">Need Integration</p>
          <div className="flex flex-col gap-1">
            <p className="text-2xl font-bold text-purple-700">
              {summary.blockedByIT + summary.blockedByEngineering + summary.blockedByCS}
            </p>
            <div className="flex gap-2 text-xs">
              <span className="text-purple-600">IT: {summary.blockedByIT}</span>
              <span className="text-purple-600">Eng: {summary.blockedByEngineering}</span>
              <span className="text-purple-600">CS: {summary.blockedByCS}</span>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
          <p className="text-xs text-gray-600 mb-1">Not Feasible</p>
          <p className="text-3xl font-bold text-gray-700">{summary.notApplicableCount}</p>
        </Card>
      </div>

      {/* Search Bar */}
      {onSearch && (
        <div className="max-w-2xl">
          <input
            type="text"
            placeholder="Search metrics by question or description..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
