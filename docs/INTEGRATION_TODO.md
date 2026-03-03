# Customer Analytics Dashboard - Integration Requirements

## Summary
- Total Metrics: 22
- Live Data: 5/22 (23%)
- Requiring Integration: 15/22 (68%)
- Not Applicable: 2/22 (9%)

## Overview

This document outlines all the data integration requirements for the Customer Utilization Analytics Dashboard. Currently, 15 out of 22 metrics are using sample/mock data and require integration with various internal systems.

### Blocked Metrics Breakdown
- **IT Support Required**: 7 metrics
- **Engineering/Product Support Required**: 3 metrics
- **CS Support Required**: 1 metric

---

## IT Support Required (7 metrics)

### 1. User Consistency and Activity Patterns
**Question**: What percent of customers are consistent users (every week) vs. infrequent (every month or quarter) vs. lost (logged in but inactive for 2+ quarters) vs. never active (never completed account)?

- **Current Status**: Mock data
- **Required**: User activity flag needs to be pulled into database
- **System**: User Management Database
- **Data Points Needed**:
  - Last login timestamp
  - Login frequency
  - Account completion status
  - Activity flags (consistent/infrequent/lost/never)
- **Update Frequency**: Daily batch update
- **Estimated Effort**: Medium
- **Owner**: IT Database Team
- **Priority**: High

### 2. Product Usage by Customer
**Question**: What % of customers use each product?

- **Current Status**: Mock data
- **Required**: Enriching user profiles with product usage data
- **System**: User Profile System + Product Analytics
- **Data Points Needed**:
  - User ID mapping to products
  - Product access flags
  - Product usage timestamps
- **Update Frequency**: Real-time or hourly sync
- **Estimated Effort**: Small
- **Owner**: IT/Marketing Ops
- **Priority**: High

### 3. Value-Add vs Non-Value-Add Time Analysis
**Question**: How much time do customers spend on 'value add' vs 'non-value add' tasks in each product?

- **Current Status**: Mock data
- **Required**: Comprehensive list of events into Tableau dataset
- **System**: Event Tracking System (Mixpanel) + Tableau
- **Data Points Needed**:
  - All UI interaction events
  - Event timestamps
  - Session durations
  - Event categorization (value-add vs non-value-add)
- **Update Frequency**: Real-time streaming or hourly batch
- **Estimated Effort**: Large
- **Owner**: IT Data Team + Engineering for event tagging
- **Priority**: Medium

### 4. UI Activity Time Breakdown
**Question**: What is the breakdown of time spent in the clinical UI per activity?

- **Current Status**: Mock data
- **Required**: Comprehensive event tracking with timestamps
- **System**: Mixpanel + Tableau
- **Data Points Needed**:
  - Load time metrics
  - Navigation events
  - Feature interaction durations
  - Page view durations
- **Update Frequency**: Real-time or hourly
- **Estimated Effort**: Large
- **Owner**: IT Data Team + Product for event categorization
- **Priority**: Medium

### 5. Usage Breakdown by User Type
**Question**: Break down of all metrics based on user type (IC, gen card, reader)

- **Current Status**: Mock data
- **Required**: User profile enrichment with role information
- **System**: User Management System + CRM
- **Data Points Needed**:
  - User role classification
  - IC vs Gen Card vs Reader flags
  - Cardiologist vs Radiologist distinction
  - Specialty information
- **Update Frequency**: Weekly update (roles don't change frequently)
- **Estimated Effort**: Medium
- **Owner**: IT/Marketing Ops
- **Priority**: High

### 6. Case Viewing by Role
**Question**: How often do customers access insights by role? What percent view every case?

- **Current Status**: Mock data
- **Required**: Role-based analytics enrichment
- **System**: User Profiles + Case Access Logs
- **Data Points Needed**:
  - User roles
  - Case access logs
  - Case assignment data
  - Viewing completion rates
- **Update Frequency**: Daily
- **Estimated Effort**: Medium
- **Owner**: IT/Marketing Ops
- **Priority**: Medium

### 7. Referring Provider Flagging
**Question**: What are the ordering rates for referring providers who view reports routinely?

- **Current Status**: Mock data
- **Required**: Flag users as referring providers in the system
- **System**: User Management + Ordering System
- **Data Points Needed**:
  - Referring provider flag
  - User type classification
  - Ordering history
  - Report viewing logs
- **Update Frequency**: Weekly
- **Estimated Effort**: Small
- **Owner**: IT User Management Team
- **Priority**: Medium

---

## Engineering/Product Support Required (3 metrics)

### 8. TAT - Access Availability
**Question**: % of customers who had access to our analyses when they click

- **Current Status**: Mock data
- **Required**: Completed timestamp in our dataset
- **System**: Analysis Processing Pipeline
- **Data Points Needed**:
  - Analysis completion timestamp
  - User access timestamp
  - Time delta calculation
- **Update Frequency**: Real-time
- **Estimated Effort**: Medium
- **Owner**: IT Data Engineering
- **Priority**: Medium
- **API Endpoint**: Need new field in analysis status API

### 9. TAT - Delayed Viewing Analysis
**Question**: % of customers who view analyses significantly after being available

- **Current Status**: Mock data
- **Required**: Completed timestamp for delay calculation
- **System**: Analysis Pipeline + User Activity Logs
- **Data Points Needed**:
  - Analysis completion timestamp
  - First view timestamp
  - Viewing delay metrics
- **Update Frequency**: Real-time
- **Estimated Effort**: Medium
- **Owner**: IT Data Engineering
- **Priority**: Medium

### 10. Immediate vs Delayed Viewing Impact
**Question**: Utilization difference between immediate viewers vs delayed viewers

- **Current Status**: Mock data
- **Required**: Roadmap viewed timestamp in Mixpanel
- **System**: Mixpanel Event Tracking
- **Data Points Needed**:
  - Roadmap view event with timestamp
  - FFR/Plaque order timestamps
  - Time-to-action metrics
- **Update Frequency**: Real-time event streaming
- **Estimated Effort**: Small
- **Owner**: Engineering/Product Analytics
- **Priority**: High
- **Technical Details**: Add timestamp to `roadmap_viewed` event

---

## CS Support Required (1 metric)

### 11. Conditional Order Fulfillment
**Question**: What percent of CCTA orders are conditional and what percent don't get fulfilled?

- **Current Status**: Mock data
- **Required**: New data collection - not available on CS side either
- **System**: Ordering System + CS Tracking
- **Data Points Needed**:
  - Order type (conditional vs unconditional)
  - Conditional order reason
  - Fulfillment status
  - Rejection reason
- **Update Frequency**: Real-time or daily
- **Estimated Effort**: Large (requires new data collection process)
- **Owner**: CS Data Team + Engineering
- **Priority**: Low

---

## Implementation Checklist

### Phase 1: Team Identification & Planning (Week 1)
- [ ] Identify IT contact for system access (7 metrics)
- [ ] Identify Engineering contact for API development (3 metrics)
- [ ] Identify CS contact for data exports (1 metric)
- [ ] Schedule kickoff meeting with all stakeholders
- [ ] Review and prioritize metrics based on business impact
- [ ] Create detailed technical specifications for each integration

### Phase 2: Architecture & Design (Week 2-3)
- [ ] Define data refresh schedules for each metric
- [ ] Create data pipeline architecture diagram
- [ ] Design API contracts for new endpoints
- [ ] Plan ETL processes and data transformations
- [ ] Review security and data privacy requirements
- [ ] Design monitoring and alerting strategy

### Phase 3: Development (Week 4-8)
- [ ] Implement authentication for data sources
- [ ] Build ETL processes for IT metrics
- [ ] Develop new API endpoints for Engineering metrics
- [ ] Set up CS data export process
- [ ] Create data transformation pipelines
- [ ] Implement error handling and retry logic

### Phase 4: Testing & Validation (Week 9-10)
- [ ] Set up monitoring and alerts
- [ ] Create data quality checks
- [ ] Validate data accuracy against source systems
- [ ] Performance testing of data pipelines
- [ ] User acceptance testing with dashboard

### Phase 5: Documentation & Deployment (Week 11-12)
- [ ] Document all integrations
- [ ] Create runbooks for operations team
- [ ] Train support team on new metrics
- [ ] Gradual rollout of live data
- [ ] Monitor dashboard performance post-launch

---

## Technical Requirements

### Data Pipeline Infrastructure
- **ETL Tool**: Recommended: Airflow or similar orchestration tool
- **Data Warehouse**: Connection to existing DW or new analytical database
- **API Layer**: RESTful APIs for real-time data
- **Caching**: Redis or similar for frequently accessed metrics
- **Monitoring**: DataDog, Prometheus, or similar

### Security & Compliance
- [ ] Ensure HIPAA compliance for patient data
- [ ] Implement row-level security for user data
- [ ] Encrypt data in transit and at rest
- [ ] Audit logging for data access
- [ ] Regular security reviews

### Performance Targets
- Dashboard load time: < 2 seconds
- Real-time metrics update latency: < 5 minutes
- Batch metrics update frequency: Daily at minimum
- API response time: < 500ms for 95th percentile

---

## Success Metrics

### Integration Completion Goals
- **Month 1**: 3 IT metrics live (user consistency, product usage, user types)
- **Month 2**: 4 additional IT metrics + 2 Engineering metrics live
- **Month 3**: All remaining metrics live, CS metric in progress

### Data Quality Targets
- 99.9% data accuracy vs source systems
- < 0.1% missing data rate
- Zero critical data quality incidents

---

## Risks & Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| IT system access delays | High | Medium | Early stakeholder engagement, executive sponsorship |
| Data quality issues | High | Medium | Robust validation, data quality checks, gradual rollout |
| Performance degradation | Medium | Low | Load testing, caching strategy, query optimization |
| Scope creep | Medium | Medium | Clear requirements, change control process |
| Resource constraints | High | High | Prioritize high-impact metrics, phased approach |

---

## Contact Information

**Dashboard Owner**: [Your Name/Team]
**IT Team Contact**: [To be assigned]
**Engineering Team Contact**: [To be assigned]
**CS Team Contact**: [To be assigned]
**Project Manager**: [To be assigned]

---

**Last Updated**: March 2, 2026
**Next Review Date**: April 1, 2026
