export type Severity = 'Critical' | 'High' | 'Medium';

export interface DemoRecord {
  orderId: string;
  customerEmail: string;
  productSku: string;
  quantity: number;
  status: string;
  region: string;
  orderDate: string;
}

export interface QualityRule {
  id: string;
  name: string;
  dimension: string;
  description: string;
  severity: Severity;
  enabled: boolean;
}

export interface QualityIssue {
  id: string;
  ruleId: string;
  ruleName: string;
  severity: Severity;
  recordId: string;
  field: string;
  value: string;
  message: string;
  status: "Open" | "Resolved";
}

export interface ValidationRun {
  id: string;
  timestamp: string;
  score: number;
  passed: number;
  failed: number;
  recordsChecked: number;
}

export const demoRecords: DemoRecord[] = [
  { orderId: 'ORD-1001', customerEmail: 'ada@example.com', productSku: 'SKU-101', quantity: 2, status: 'Completed', region: 'West', orderDate: '2026-10-01' },
  { orderId: 'ORD-1002', customerEmail: 'tunde@example.com', productSku: 'SKU-104', quantity: 1, status: 'Processing', region: 'North', orderDate: '2026-10-02' },
  { orderId: 'ORD-1003', customerEmail: 'amara@example.com', productSku: 'SKU-102', quantity: 4, status: 'Completed', region: 'East', orderDate: '2026-10-03' },
  { orderId: 'ORD-1004', customerEmail: 'bisi@example.com', productSku: 'SKU-103', quantity: 3, status: 'Shipped', region: 'South', orderDate: '2026-10-04' },
  { orderId: 'ORD-1005', customerEmail: '', productSku: 'SKU-101', quantity: 2, status: 'Processing', region: 'West', orderDate: '2026-10-05' },
  { orderId: 'ORD-1006', customerEmail: 'chidi@example.com', productSku: 'SKU-105', quantity: 0, status: 'Completed', region: 'East', orderDate: '2026-10-06' },
  { orderId: 'ORD-1007', customerEmail: 'zara.example.com', productSku: 'SKU-102', quantity: 1, status: 'Shipped', region: 'North', orderDate: '2026-10-07' },
  { orderId: 'ORD-1008', customerEmail: 'kemi@example.com', productSku: 'SKU-106', quantity: 2, status: 'Unknown', region: 'South', orderDate: '2026-10-08' },
  { orderId: 'ORD-1009', customerEmail: 'femi@example.com', productSku: 'SKU-103', quantity: 5, status: 'Completed', region: '', orderDate: '2026-10-09' },
  { orderId: 'ORD-1010', customerEmail: 'lola@example.com', productSku: 'SKU-107', quantity: -1, status: 'Processing', region: 'West', orderDate: '2026-10-10' },
  { orderId: 'ORD-1003', customerEmail: 'amara@example.com', productSku: 'SKU-102', quantity: 4, status: 'Completed', region: 'East', orderDate: '2026-10-03' },
  { orderId: 'ORD-1012', customerEmail: 'ife@example.com', productSku: 'SKU-108', quantity: 2, status: 'Completed', region: 'Central', orderDate: '2026-10-12' },
 ];

export const initialRules: QualityRule[] = [
  { id: 'DQ-001', name: 'Order ID completeness', dimension: 'Completeness', description: 'Every order must have an identifier.', severity: 'Critical', enabled: true },
  { id: 'DQ-002', name: 'Customer email completeness', dimension: 'Completeness', description: 'Every order must include a customer email.', severity: 'High', enabled: true },
  { id: 'DQ-003', name: 'Unique order identifiers', dimension: 'Uniqueness', description: 'Order identifiers must not be duplicated.', severity: 'Critical', enabled: true },
  { id: 'DQ-004', name: 'Valid email format', dimension: 'Validity', description: 'Customer emails must use a valid format.', severity: 'Medium', enabled: true },
  { id: 'DQ-005', name: 'Positive order quantity', dimension: 'Validity', description: 'Order quantity must be greater than zero.', severity: 'High', enabled: true },
  { id: 'DQ-006', name: 'Approved order status', dimension: 'Consistency', description: 'Order status must be approved.', severity: 'Medium', enabled: true },
  { id: 'DQ-007', name: 'Sales region completeness', dimension: 'Completeness', description: 'Every order must have a region.', severity: 'Medium', enabled: true },
 ];

export function validateDataset(records: DemoRecord[], rules: QualityRule[]): QualityIssue[] {
  const issues: QualityIssue[] = [];
  const enabled = rules.filter((rule) => rule.enabled);
  const seen = new Set<string>();
  for (const [recordIndex, record] of records.entries()) {
    for (const rule of enabled) {
      let field = "";
      let value = "";
      let message = "";
      switch (rule.id) {
        case "DQ-001": if (!record.orderId.trim()) { field = "orderId"; value = record.orderId; message = "Order ID is missing."; } break;
        case "DQ-002": if (!record.customerEmail.trim()) { field = "customerEmail"; value = record.customerEmail; message = "Customer email is missing."; } break;
        case "DQ-003": if (record.orderId && seen.has(record.orderId)) { field = "orderId"; value = record.orderId; message = "Duplicate order identifier."; } seen.add(record.orderId); break;
        case "DQ-004": if (record.customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(record.customerEmail)) { field = "customerEmail"; value = record.customerEmail; message = "Email format is invalid."; } break;
        case "DQ-005": if (record.quantity <= 0) { field = "quantity"; value = String(record.quantity); message = "Quantity must be greater than zero."; } break;
        case "DQ-006": if (!["Completed", "Processing", "Shipped"].includes(record.status)) { field = "status"; value = record.status; message = "Order status is not approved."; } break;
        case "DQ-007": if (!record.region.trim()) { field = "region"; value = record.region; message = "Sales region is missing."; } break;
      }
      if (message) issues.push({ id: "ISS-" + rule.id + "-" + String(recordIndex + 1).padStart(3, "0") + "-" + field, ruleId: rule.id, ruleName: rule.name, severity: rule.severity, recordId: record.orderId || "UNKNOWN", field, value, message, status: "Open" });
    }
  }
  return issues;
}

export function createValidationRun(issues: QualityIssue[], recordCount: number, enabledRuleCount: number, runNumber: number): ValidationRun {
  const totalChecks = recordCount * enabledRuleCount;
  const failed = issues.length;
  const passed = Math.max(0, totalChecks - failed);
  return {
    id: "RUN-" + String(runNumber).padStart(4, "0"),
    timestamp: new Date().toISOString(),
    score: totalChecks ? Math.round((passed / totalChecks) * 100) : 100,
    passed,
    failed,
    recordsChecked: recordCount,
  };
}
