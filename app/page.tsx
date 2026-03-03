'use client';

import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { CategorySection } from '@/components/dashboard/CategorySection';
import { IntegrationTodoPanel } from '@/components/dashboard/IntegrationTodoPanel';
import { useMetrics } from '@/hooks/useMetrics';
import { useFilteredMetrics } from '@/hooks/useFilteredMetrics';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react';

export default function Home() {
  const { categories, summary, loading } = useMetrics();
  const { filteredCategories, setSearchQuery } = useFilteredMetrics(categories);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              <p className="mt-4 text-gray-600">Loading dashboard...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Summary Stats */}
        <DashboardHeader summary={summary} onSearch={setSearchQuery} />

        {/* Tabs for Categories */}
        <TabGroup className="mb-8">
          <TabList className="mb-6">
            <Tab>All Categories</Tab>
            {categories.map((category) => (
              <Tab key={category.id}>
                <span className="mr-2">{category.icon}</span>
                {category.name.split(' ')[0]}
                <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                  {category.metrics.length}
                </span>
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            {/* All Categories View */}
            <TabPanel>
              <div className="space-y-8">
                {filteredCategories.map((category) => (
                  <CategorySection key={category.id} category={category} />
                ))}
              </div>
            </TabPanel>

            {/* Individual Category Views */}
            {categories.map((category) => (
              <TabPanel key={category.id}>
                <CategorySection category={category} />
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>

        {/* Integration TODO Panel */}
        <IntegrationTodoPanel />

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>
            Customer Utilization Analytics Dashboard • Last Updated: March 2026
          </p>
          <p className="mt-2">
            🟢 Live Data: {summary.liveDataCount} • 🟡 Mock Data: {summary.mockDataCount} •
            ⛔ Not Feasible: {summary.notApplicableCount}
          </p>
        </footer>
      </div>
    </main>
  );
}
