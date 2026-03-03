'use client';

import { useState, useMemo } from 'react';
import { MetricCategory, DataStatus } from '@/lib/types/metrics';
import { searchMetrics } from '@/lib/services/metricsService';

export function useFilteredMetrics(categories: MetricCategory[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<DataStatus | 'all'>('all');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');

  const filteredCategories = useMemo(() => {
    let filtered = [...categories];

    // Filter by category
    if (selectedCategoryId !== 'all') {
      filtered = filtered.filter((cat) => cat.id === selectedCategoryId);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.map((cat) => ({
        ...cat,
        metrics: cat.metrics.filter((metric) => metric.dataStatus === selectedStatus),
      }));
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const searchResults = searchMetrics(searchQuery);
      const searchResultIds = new Set(searchResults.map((m) => m.id));

      filtered = filtered.map((cat) => ({
        ...cat,
        metrics: cat.metrics.filter((metric) => searchResultIds.has(metric.id)),
      }));
    }

    // Remove categories with no metrics after filtering
    filtered = filtered.filter((cat) => cat.metrics.length > 0);

    return filtered;
  }, [categories, selectedStatus, selectedCategoryId, searchQuery]);

  return {
    filteredCategories,
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    selectedCategoryId,
    setSelectedCategoryId,
  };
}
