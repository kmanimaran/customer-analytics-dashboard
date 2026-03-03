# Data Sources Documentation

## Overview

This document provides comprehensive information about the data sources for each metric in the Customer Utilization Analytics Dashboard.

---

## Category 1: Already in Dashboard (5 metrics - LIVE DATA)

### 1. Product Access Methods
**Question**: How do customers access insights from products (FFR, plaque, roadmap)?

- **Status**: ✅ Live Data
- **Current Data Source**: Product Analytics Database
- **Update Frequency**: Real-time
- **Data Owner**: Aaron (as noted in requirements)
- **Integration Method**: Direct database query
- **Notes**: Available and accurate

### 2. Access Method Correlation
**Question**: Does access method correlate with utilization?

- **Status**: ✅ Live Data
- **Current Data Source**: Product Analytics + Usage Metrics
- **Update Frequency**: Daily aggregation
- **Data Owner**: Product Team
- **Integration Method**: Analytical database query with JOIN
- **Notes**: Derived from access logs and utilization metrics

### 3. Customer Cohorts
**Question**: Cohort breakdown (OPIC vs Hospital, Plaque vs not, etc.)

- **Status**: ✅ Live Data
- **Current Data Source**: Customer Database + CRM
- **Update Frequency**: Weekly
- **Data Owner**: Customer Success / Sales Ops
- **Integration Method**: CRM export + database JOIN
- **Notes**: 8 distinct cohorts tracked

### 4. Plaque UR Rates by Disease
**Question**: Plaque UR rates by stenosis grade/CADRADS

- **Status**: ✅ Live Data
- **Current Data Source**: Clinical Database
- **Update Frequency**: Daily
- **Data Owner**: Aaron (has this data)
- **Integration Method**: Direct clinical database query
- **Notes**: Aggregated by disease severity

### 5. FFRCT + Plaque Combination
**Question**: Proportion of patients getting both FFRCT and Plaque

- **Status**: ✅ Live Data
- **Current Data Source**: Clinical Database + Orders
- **Update Frequency**: Daily
- **Data Owner**: Aaron (has this data)
- **Integration Method**: Order database with patient matching
- **Notes**: Includes disease burden analysis

---

## Category 2: Short-term Possibility (4 metrics - MOCK DATA, 1 month timeline)

### 6. Superuser Definition
**Question**: Can we define superusers and measure their impact?

- **Status**: 🟡 Mock Data (Development in progress)
- **Target Data Source**: User Activity Logs + Analytics
- **Proposed Integration**: Custom SQL query on activity database
- **Update Frequency**: Daily batch
- **Blockers**: Need to define superuser criteria
- **Estimated Completion**: End of March 2026
- **Owner**: Product Analytics Team

### 7. Roadmap Completion Rate
**Question**: % of patients needing FFR/Plaque who get tests completed

- **Status**: 🟡 Mock Data (Feasible short-term)
- **Target Data Source**: Roadmap Recommendations + Orders Database
- **Proposed Integration**: JOIN between recommendations and fulfillment
- **Update Frequency**: Daily
- **Blockers**: Need recommendation tracking improvement
- **Estimated Completion**: Early April 2026
- **Owner**: Clinical Analytics Team

### 8. Plaque Workflow Patterns
**Question**: How often is plaque ordered from caselist vs after roadmap vs after FFR?

- **Status**: 🟡 Mock Data (Event tracking enhancement needed)
- **Target Data Source**: Mixpanel Event Tracking
- **Proposed Integration**: Event sequence analysis
- **Update Frequency**: Real-time with daily aggregation
- **Blockers**: Need enhanced event tracking for workflow
- **Estimated Completion**: Mid-April 2026
- **Owner**: Engineering + Product

### 9. 3D Model Impact on Utilization
**Question**: Utilization differences for 3D model users vs non-users

- **Status**: 🟡 Mock Data (Data available, needs aggregation)
- **Target Data Source**: Feature Usage Logs + Utilization Metrics
- **Proposed Integration**: Feature flags + usage correlation
- **Update Frequency**: Daily
- **Blockers**: Need to identify 3D model users reliably
- **Estimated Completion**: Late April 2026
- **Owner**: Product Analytics

---

## Category 3: Blocked - IT Support Required (7 metrics)

### 10. User Consistency Patterns
**Question**: % consistent vs infrequent vs lost vs never active users

- **Status**: 🔴 Blocked - Needs IT Support
- **Target Data Source**: User Management Database
- **Required IT Action**: Pull user activity flag into accessible database
- **Proposed Integration**: ETL pipeline from user management system
- **Update Frequency**: Daily
- **Data Fields Needed**:
  - `user_id`
  - `last_login_date`
  - `login_count_30d`
  - `account_completion_status`
  - `activity_status_flag`
- **Estimated Effort**: Medium (2-3 weeks)
- **IT Team**: Database Team
- **Priority**: High

### 11. Product Usage Percentage
**Question**: What % of customers use each product?

- **Status**: 🔴 Blocked - Needs IT Support
- **Target Data Source**: User Profile System + Product Access Logs
- **Required IT Action**: Enrich user profiles with product usage flags
- **Proposed Integration**: User profile API enhancement
- **Update Frequency**: Hourly
- **Data Fields Needed**:
  - `user_id`
  - `ffrct_enabled`
  - `plaque_enabled`
  - `roadmap_enabled`
  - `last_product_usage_date`
- **Estimated Effort**: Small (1 week)
- **IT Team**: Marketing Ops + IT
- **Priority**: High

### 12. Value-Add Time Analysis
**Question**: Time on value-add vs non-value-add tasks

- **Status**: 🔴 Blocked - Needs IT + Engineering Support
- **Target Data Source**: Mixpanel Events + Tableau
- **Required IT Action**: Pull comprehensive event list into Tableau dataset
- **Required Engineering Action**: Tag events as value-add or non-value-add
- **Proposed Integration**: Streaming event pipeline to analytical DB
- **Update Frequency**: Real-time with 5-min aggregation
- **Data Fields Needed**:
  - All UI interaction events
  - Event category (value-add flag)
  - Session duration
  - Timestamps
- **Estimated Effort**: Large (4-6 weeks)
- **IT Team**: Data Engineering
- **Engineering Team**: Product Analytics
- **Priority**: Medium

### 13. UI Activity Breakdown
**Question**: Time breakdown per activity (load, navigation, analysis)

- **Status**: 🔴 Blocked - Needs IT + Product Support
- **Target Data Source**: Mixpanel + Performance Monitoring
- **Required IT Action**: Comprehensive event tracking in Tableau
- **Required Product Action**: Categorize events by activity type
- **Proposed Integration**: Event stream + performance metrics
- **Update Frequency**: Real-time
- **Data Fields Needed**:
  - `event_type`
  - `event_category` (load/navigation/analysis)
  - `duration_ms`
  - `page_url`
  - `user_id`
- **Estimated Effort**: Large (4-6 weeks)
- **IT Team**: Data Team
- **Product Team**: Analytics
- **Priority**: Medium

### 14. Usage by User Type
**Question**: Metrics breakdown by IC, gen card, reader

- **Status**: 🔴 Blocked - Needs IT Support
- **Target Data Source**: User Management + CRM
- **Required IT Action**: User profile enrichment with role data
- **Proposed Integration**: CRM sync to user database
- **Update Frequency**: Weekly (roles change infrequently)
- **Data Fields Needed**:
  - `user_type` (IC/Gen Card/Reader)
  - `specialty` (Cardiology/Radiology)
  - `practice_type` (Employed/Private)
- **Estimated Effort**: Medium (2-3 weeks)
- **IT Team**: Marketing Ops
- **Priority**: High

### 15. Access by Role
**Question**: Case viewing rates by role (readers vs ICs vs referrers)

- **Status**: 🔴 Blocked - Needs IT Support
- **Target Data Source**: User Profiles + Case Access Logs
- **Required IT Action**: Role-based analytics enrichment
- **Proposed Integration**: Role data JOIN with access logs
- **Update Frequency**: Daily
- **Data Fields Needed**:
  - User role
  - Cases assigned
  - Cases viewed
  - View completion rate
- **Estimated Effort**: Medium (2-3 weeks)
- **IT Team**: Marketing Ops
- **Priority**: Medium

### 16. Referring Provider Orders
**Question**: Ordering rates for referring providers viewing reports

- **Status**: 🔴 Blocked - Needs IT Support
- **Target Data Source**: User Management + Ordering System
- **Required IT Action**: Flag referring providers in system
- **Proposed Integration**: User type classification enhancement
- **Update Frequency**: Weekly
- **Data Fields Needed**:
  - `is_referring_provider` flag
  - Report viewing history
  - Ordering history
- **Estimated Effort**: Small (1 week)
- **IT Team**: User Management
- **Priority**: Medium

---

## Category 4: Blocked - Engineering/Product Support Required (3 metrics)

### 17. TAT - Access Availability
**Question**: % of customers with immediate access to analyses

- **Status**: 🔴 Blocked - Needs Engineering Support
- **Target Data Source**: Analysis Processing Pipeline
- **Required Engineering Action**: Add completed timestamp to dataset
- **Proposed Integration**: Pipeline status API enhancement
- **Update Frequency**: Real-time
- **API Endpoint**: `/api/analysis-status` needs `completed_at` field
- **Data Fields Needed**:
  - `analysis_id`
  - `completed_at` timestamp
  - `first_accessed_at` timestamp
- **Estimated Effort**: Medium (2 weeks)
- **Engineering Team**: Data Engineering
- **Priority**: Medium

### 18. TAT - Delayed Viewing
**Question**: % viewing analyses significantly after availability

- **Status**: 🔴 Blocked - Needs Engineering Support
- **Target Data Source**: Analysis Pipeline + User Activity
- **Required Engineering Action**: Completed timestamp for delay calculation
- **Proposed Integration**: Same as #17 above
- **Update Frequency**: Real-time
- **Data Fields Needed**: Same as #17
- **Estimated Effort**: Medium (2 weeks, same as #17)
- **Engineering Team**: Data Engineering
- **Priority**: Medium

### 19. Immediate Viewing Impact
**Question**: Utilization difference for immediate vs delayed viewers

- **Status**: 🔴 Blocked - Needs Engineering Support
- **Target Data Source**: Mixpanel Event Tracking
- **Required Engineering Action**: Add Roadmap viewed timestamp to events
- **Proposed Integration**: Mixpanel event enhancement
- **Update Frequency**: Real-time event streaming
- **Event Details**:
  - Event: `roadmap_viewed`
  - New field: `viewed_at` timestamp
- **Estimated Effort**: Small (1 week)
- **Engineering Team**: Product Analytics
- **Priority**: High

---

## Category 5: Blocked - CS Support Required (1 metric)

### 20. Conditional Orders
**Question**: % of conditional CCTA orders and unfulfilled rate

- **Status**: 🔴 Blocked - Needs CS + Engineering Support
- **Target Data Source**: Ordering System + CS Tracking (NEW)
- **Required CS Action**: New data collection process
- **Required Engineering Action**: Build tracking for conditional orders
- **Proposed Integration**: New database table + order classification
- **Update Frequency**: Real-time or daily
- **Data Fields Needed**:
  - `order_id`
  - `order_type` (conditional/unconditional)
  - `conditional_reason`
  - `fulfillment_status`
  - `rejection_reason`
- **Estimated Effort**: Large (6-8 weeks) - requires new infrastructure
- **CS Team**: Data Team
- **Engineering Team**: Order Management
- **Priority**: Low

---

## Category 6: Low Priority (1 metric)

### 21. Frustration Metrics
**Question**: Can we detect user frustration and churn behavior?

- **Status**: ⚫ Low Priority - Complex ML Project
- **Target Data Source**: All user interaction events
- **Proposed Approach**: Machine learning pattern detection
- **Requirements**:
  - Advanced event tracking
  - ML model development
  - Pattern recognition algorithms
- **Estimated Effort**: Large (3+ months)
- **Priority**: P2 - Not now
- **Notes**: Requires sophisticated behavioral analysis

---

## Category 7: Fundamental Limitation (1 metric)

### 22. CCTA Ordering + Plaque Correlation
**Question**: Does CCTA ordering change with plaque access?

- **Status**: ⛔ Not Feasible
- **Reason**: No way to track CCTA ordering provider in current system
- **Fundamental Issue**: CCTA orders placed outside our system
- **Potential Future Solution**: Would require integration with external PACS/RIS systems
- **Priority**: Not applicable
- **Notes**: Recommend offline report if external data becomes available

---

## Data Integration Patterns

### Pattern 1: Real-time Event Streaming
**Used for**: User activity, feature usage, performance metrics
**Technology**: Mixpanel → Kafka → Analytical DB
**Latency**: < 5 minutes
**Metrics**: 19, 8, 9, 13, 17, 18

### Pattern 2: Daily Batch ETL
**Used for**: User profiles, cohorts, aggregations
**Technology**: Airflow + SQL ETL
**Latency**: Daily at 2 AM UTC
**Metrics**: 2, 4, 5, 7, 10, 11, 14, 15

### Pattern 3: Weekly Sync
**Used for**: Slowly changing dimensions (roles, customer info)
**Technology**: CRM → Data Warehouse sync
**Latency**: Weekly on Sundays
**Metrics**: 3, 14, 16

### Pattern 4: On-demand API
**Used for**: Live status checks, current values
**Technology**: REST API
**Latency**: < 500ms
**Metrics**: 17, 18

---

## Data Quality Monitoring

### Automated Checks (Daily)
- [ ] Data freshness validation
- [ ] Null value detection
- [ ] Outlier detection
- [ ] Schema validation
- [ ] Volume consistency checks

### Manual Review (Weekly)
- [ ] Metric accuracy spot checks
- [ ] Dashboard performance review
- [ ] User feedback analysis
- [ ] Data pipeline health check

---

## Next Steps

1. **Immediate (Week 1-2)**
   - Prioritize IT metrics #10, #11, #14 (user-related)
   - Engage IT team for user database access
   - Begin Engineering metric #19 (small effort, high impact)

2. **Short-term (Month 1-2)**
   - Complete remaining IT metrics
   - Implement Engineering metrics #17, #18
   - Launch short-term metrics #6, #7, #8, #9

3. **Medium-term (Month 3-4)**
   - Tackle large effort items (#12, #13, #20)
   - Evaluate P2 metric (#21) based on business need

---

**Last Updated**: March 2, 2026
**Document Owner**: [Your Name/Team]
**Next Review**: April 1, 2026
