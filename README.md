# Data Quality Monitor

A practical data-quality validation application prototype built for Microsoft Fabric.

Data Quality Monitor provides a workspace for managing validation rules, checking data quality, investigating failed checks, and reviewing validation results.

**Built by:** Olufemi Olamoyegun
**Version:** 1.0.0

- **Live application:** [Open Data Quality Monitor](https://legal-flame-e535066b79-southafricanorth.webapp.fabricapps.net)
- **Community discussion:** [Data Quality Monitor – Microsoft Fabric Community](https://community.fabric.microsoft.com/discussions/pbi_fabricappsgallery/data-quality-monitor-%E2%80%93-a-practical-data-quality-validation-app-for-microsoft-fab/5405401)

## Overview

Data Quality Monitor demonstrates how data-quality checks can be organized into configurable rules, validation runs, and actionable issues.

The current prototype uses a synthetic retail operations dataset containing 12 records. Users can enable or disable validation rules, execute checks, inspect failed records, and mark issues as resolved.

## Features

### 1. Quality Rules Management

- Seven configurable validation rules.
- Rules covering completeness, uniqueness, validity, and consistency.
- Enable or disable individual rules.

### 2. Data Validation

- Executes enabled rules against the synthetic dataset.
- Calculates a quality score for each validation run.
- Reports passed and failed checks.
- Displays validation results for investigation.

With all seven rules enabled, each run evaluates 84 checks across 12 records.

The demonstration produces the following example result:

| Metric | Result |
|---|---:|
| Records evaluated | 12 |
| Active rules | 7 |
| Total checks | 84 |
| Passed checks | 77 |
| Failed checks | 7 |
| Quality score | 92% |

The score is calculated from the validation results and is not a fixed or permanently stored value.

### 3. Issue Investigation

- Identifies problematic records and fields.
- Classifies findings by severity: Critical, High, and Medium.
- Displays failed values and validation messages.
- Allows users to mark identified issues as resolved.

### 4. Validation History

- Displays individual validation runs.
- Shows quality scores, passed checks, and failed checks.
- Allows users to review results from runs during the current session.

## Technology Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Lucide React
- Microsoft Rayfin packages and Fabric application architecture

The application uses Microsoft's Rayfin-based architecture for its Fabric application foundation and authentication integration.

## Architecture and Source Files

The main application-specific implementation is organized around:

| File | Responsibility |
|---|---|
| `packages/frontend/src/components/quality-workspace.tsx` | Main quality-monitoring workspace and user interactions |
| `packages/frontend/src/lib/quality-demo.ts` | Synthetic dataset, validation rules, and validation logic |
| `packages/frontend/src/App.tsx` | Application entry point and app composition |

## Getting Started

### Prerequisites

- Node.js compatible with the installed Vite and Rayfin tooling.
- npm.
- Access to the Microsoft Rayfin development tooling and any required Fabric authentication.

### Installation

Clone the repository:

```bash
git clone https://github.com/olufemi-builds/data-quality-monitor.git
cd data-quality-monitor
```

Install dependencies:

```bash
npm install
```

Start the application using the Rayfin development workflow:

```bash
npm run dev
```

To run the frontend Vite development server directly:

```bash
npm run dev:frontend
```

Follow the Rayfin authentication and development setup requirements where prompted.

## Available Commands

Run these commands from the repository root:

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Rayfin development workflow |
| `npm run dev:frontend` | Start the frontend development server |
| `npm run typecheck` | Run TypeScript project checks |
| `npm run lint` | Run ESLint |
| `npm test` | Run the automated test suite |
| `npm run build` | Build the application |
| `npm run preview` | Preview the frontend production build |

## Current Implementation Scope and Limitations

Data Quality Monitor is a functional application prototype, not yet a production-connected data-quality platform.

- **Data source:** Uses synthetic retail operations data.
- **Validation execution:** Runs locally in the application.
- **Fabric integration:** Live Fabric data-source integration has not yet been implemented.
- **Persistence:** Validation runs, issue changes, and rule state are held in application memory and reset when the application reloads.
- **Automated tests:** The existing test suite covers application components and supporting functionality. It should not be interpreted as dedicated automated test coverage for every validation rule.

These limitations describe the current demonstration scope.

## Why This Project?

Data-quality problems can undermine analytics and reporting before they become visible to business users.

The goal of Data Quality Monitor is to make data-quality results visible, actionable, and easier to investigate through a practical application experience.

This project was developed as a contribution to **Data Days: AI @Work**.

## Attribution and Licensing

This application was built using Microsoft's Rayfin-based application architecture and starter-template material.

The repository retains the existing Microsoft copyright and MIT licence notice. Microsoft-originated framework and template material should retain its applicable attribution and licence notices.

The application-specific implementation is by Olufemi Olamoyegun. Refer to the applicable licence and third-party notices before reusing or redistributing the source code.

---

**Project:** Data Quality Monitor
**Author:** Olufemi Olamoyegun
**Version:** 1.0.0