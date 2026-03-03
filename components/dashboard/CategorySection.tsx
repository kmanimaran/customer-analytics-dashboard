'use client';

import { MetricCategory } from '@/lib/types/metrics';
import { MetricCard } from './MetricCard';
import { useState } from 'react';

interface CategorySectionProps {
  category: MetricCategory;
}

export function CategorySection({ category }: CategorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-8">
      {/* Category Header */}
      <div
        className="flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{category.icon}</span>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {category.name}
            </h2>
            <p className="text-sm text-gray-600">{category.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-500">
            {category.metrics.length} metric{category.metrics.length !== 1 ? 's' : ''}
          </span>
          <button
            className="text-gray-400 hover:text-gray-600 transition-transform"
            style={{
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            ▼
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      )}
    </div>
  );
}
