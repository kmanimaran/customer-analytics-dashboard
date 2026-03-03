'use client';

import { useState, useEffect } from 'react';
import { MetricCategory, DashboardSummary } from '@/lib/types/metrics';
import {
  getAllCategories,
  getDashboardSummary,
} from '@/lib/services/metricsService';

export function useMetrics() {
  const [categories, setCategories] = useState<MetricCategory[]>([]);
  const [summary, setSummary] = useState<DashboardSummary>({
    totalMetrics: 0,
    liveDataCount: 0,
    mockDataCount: 0,
    notApplicableCount: 0,
    blockedByIT: 0,
    blockedByEngineering: 0,
    blockedByCS: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async data fetching (in a real app, this would be an API call)
    const fetchData = async () => {
      try {
        setLoading(true);
        // Add a small delay to simulate network request
        await new Promise((resolve) => setTimeout(resolve, 100));

        const categoriesData = getAllCategories();
        const summaryData = getDashboardSummary();

        setCategories(categoriesData);
        setSummary(summaryData);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    categories,
    summary,
    loading,
  };
}
