# Customer Utilization Analytics Dashboard

A modern, web-based analytics dashboard for tracking customer utilization metrics across FFRCT, Plaque, and Roadmap products.

## Overview

This dashboard provides visibility into 22 key customer utilization metrics organized across 5 priority categories:

- **Already in Dashboard** (5 metrics) - Live data currently available
- **Short-term Possibility** (4 metrics) - Achievable within 1 month
- **Blocked/Need X-functional Support** (11 metrics) - Requires IT, Engineering, or CS support
- **Lower Priority/P2** (1 metric) - Deprioritized for now
- **Fundamental Limitation** (1 metric) - Not currently feasible due to technical constraints

### Key Features

- 📊 **Modern UI** - Built with Next.js, Tremor, and Tailwind CSS
- 🎨 **Visual Status Indicators** - Clear badges showing live data vs mock data
- 📈 **Multiple Visualization Types** - Charts, tables, KPIs, and percentages
- 🔍 **Search & Filter** - Find metrics easily
- 📑 **Category Tabs** - Organized navigation across metric categories
- ⚠️ **Integration Tracking** - Comprehensive TODO list for data integration work
- 📥 **Export Functionality** - Download integration requirements as markdown
- 📱 **Responsive Design** - Works on mobile, tablet, and desktop

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **UI Components**: Tremor (dashboard components)
- **Charts**: Recharts
- **Styling**: Tailwind CSS
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd /Users/kmanimaran/shirin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

The dashboard should now be running locally!

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
/Users/kmanimaran/shirin/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with fonts
│   ├── page.tsx             # Main dashboard page
│   └── globals.css          # Global styles with animations
│
├── components/
│   └── dashboard/           # Dashboard components
│       ├── DataStatusBadge.tsx      # Status indicators
│       ├── MetricCard.tsx           # Individual metric cards
│       ├── MetricChart.tsx          # Chart visualizations
│       ├── CategorySection.tsx      # Category grouping
│       ├── IntegrationTodoPanel.tsx # Integration tracking
│       └── DashboardHeader.tsx      # Header with stats
│
├── lib/
│   ├── types/               # TypeScript interfaces
│   │   └── metrics.ts       # Metric & category types
│   │
│   ├── data/                # Data layer
│   │   └── metricsData.json # Complete metrics dataset
│   │
│   ├── services/            # Business logic
│   │   └── metricsService.ts # Data access functions
│   │
│   └── utils/               # Helper functions
│       └── formatters.ts    # Number, date formatters
│
├── hooks/                   # Custom React hooks
│   ├── useMetrics.ts        # Fetch metrics data
│   └── useFilteredMetrics.ts # Filter & search logic
│
├── docs/                    # Documentation
│   ├── INTEGRATION_TODO.md  # Integration requirements
│   └── DATA_SOURCES.md      # Data source documentation
│
└── public/                  # Static assets

```

## Key Concepts

### Data Status Types

The dashboard uses 5 status types to categorize metrics:

1. **available** 🟢 - Live data from production systems
2. **short-term** ⏱ - Mock data, achievable within 1 month
3. **blocked** 🔴 - Mock data, requires external team support
4. **low-priority** ⚫ - Deprioritized, not currently pursued
5. **fundamental-limitation** ⛔ - Not feasible due to technical constraints

### Mock Data Indicators

Metrics using sample data are clearly marked with:
- Amber status badges (🟡 MOCK DATA)
- Diagonal stripe background pattern
- Warning banners explaining the blocker
- Blocker type tags (IT/Engineering/CS)

### Integration Requirements

The dashboard automatically tracks integration needs:
- Grouped by blocker type (IT, Engineering, CS)
- Detailed descriptions of what's required
- Effort estimates (Small/Medium/Large)
- Contact information placeholders
- Exportable as markdown TODO list

## Adding New Metrics

To add a new metric to the dashboard:

1. **Update the data file** ([lib/data/metricsData.json](lib/data/metricsData.json))
   - Add the metric to the appropriate category
   - Set `isMockData: true` if using sample data
   - Include `blockedReason` if integration is needed

2. **Example**:
   ```json
   {
     "id": "new-metric",
     "question": "What is the new metric question?",
     "categoryId": "already-available",
     "dataStatus": "available",
     "currentValue": "42%",
     "isMockData": false,
     "visualizationType": "percentage",
     "metadata": {
       "unit": "percentage",
       "trend": "up",
       "lastUpdated": "2026-03-02"
     }
   }
   ```

3. **Refresh the browser** - Changes to the data file will be reflected immediately

## Visualization Types

The dashboard supports multiple visualization types:

- `number` - Large KPI number display
- `percentage` - Percentage with formatting
- `bar-chart` - Vertical bar chart
- `donut-chart` - Donut/pie chart
- `line-chart` - Line chart (uses bar chart styling)
- `progress` - Progress bar with percentage
- `table` - Data table with headers and rows

## Data Integration

### Current Status
- **Live Data**: 5/22 metrics (23%)
- **Mock Data**: 15/22 metrics (68%)
- **Not Applicable**: 2/22 metrics (9%)

### Integration Priorities

**High Priority (Month 1)**:
- User consistency patterns (IT)
- Product usage percentage (IT)
- Usage by user type (IT)
- Immediate viewing impact (Engineering)

**Medium Priority (Month 2-3)**:
- Value-add time analysis (IT + Engineering)
- UI activity breakdown (IT + Product)
- TAT metrics (Engineering)

See [docs/INTEGRATION_TODO.md](docs/INTEGRATION_TODO.md) for complete integration requirements.

## Customization

### Changing Colors

Edit [app/globals.css](app/globals.css) to customize:
- Status colors
- Background patterns
- Hover effects
- Animations

### Adjusting Layout

Edit [app/page.tsx](app/page.tsx) to modify:
- Grid columns (currently 1/2/3 for mobile/tablet/desktop)
- Tab structure
- Section ordering

### Modifying Data

Edit [lib/data/metricsData.json](lib/data/metricsData.json) to:
- Update metric values
- Change visualization types
- Add/remove metrics
- Update blocked reasons

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:
```bash
PORT=3001 npm run dev
```

### Build Errors

Clear the `.next` folder and rebuild:
```bash
rm -rf .next
npm run build
```

### Styling Issues

Clear Tailwind cache:
```bash
rm -rf .next
npm run dev
```

## Performance

The dashboard is optimized for performance:
- Static data loading (no external API calls in v1)
- React component memoization
- Tailwind CSS for minimal CSS bundle
- Next.js automatic code splitting
- Target load time: < 2 seconds

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Future Enhancements

Potential improvements for v2:
- [ ] Real-time data integration with APIs
- [ ] User authentication and role-based access
- [ ] Drill-down views for detailed metric analysis
- [ ] Historical trend analysis
- [ ] Customizable dashboard layouts
- [ ] PDF export of dashboard
- [ ] Email alerts for metric thresholds
- [ ] Dark mode support

## Documentation

- **Integration Requirements**: [docs/INTEGRATION_TODO.md](docs/INTEGRATION_TODO.md)
- **Data Sources**: [docs/DATA_SOURCES.md](docs/DATA_SOURCES.md)
- **Implementation Plan**: See planning documents

## Support

For questions or issues:
1. Check this README
2. Review the documentation in `/docs`
3. Check the integration TODO list
4. Contact the dashboard maintainer

## License

Internal use only - [Your Company Name]

---

**Last Updated**: March 2, 2026
**Version**: 1.0.0
**Dashboard Owner**: [Your Name/Team]
