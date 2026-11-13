import { useState } from 'react';
import {
  Activity,
  AlertCircle,
  ArrowUpRight,
  ChevronDown,
  CircleHelp,
  Database,
  LayoutDashboard,
  Menu,
  Moon,
  Settings2,
  ShieldCheck,
  Sun,
  X,
} from 'lucide-react';
import QualityWorkspace from '@/components/quality-workspace';
import { useTheme } from '@/hooks/theme.context';
import { cn } from '@/lib/utils';

type Section = 'Overview' | 'Rules' | 'Runs' | 'Issues';

const navigation = [
  { label: 'Overview' as const, icon: LayoutDashboard },
  { label: 'Rules' as const, icon: ShieldCheck },
  { label: 'Runs' as const, icon: Activity },
  { label: 'Issues' as const, icon: AlertCircle },
];

const sectionDetails: Record<
  Section,
  { eyebrow: string; title: string; description: string }
> = {
  Overview: {
    eyebrow: 'WORKSPACE OVERVIEW',
    title: 'Data health at a glance',
    description:
      'Monitor data quality, investigate issues, and track validation activity across your Fabric data sources.',
  },
  Rules: {
    eyebrow: 'QUALITY MANAGEMENT',
    title: 'Quality rules',
    description:
      'Define and manage the checks used to assess completeness, validity, uniqueness, consistency, and accuracy.',
  },
  Runs: {
    eyebrow: 'VALIDATION ACTIVITY',
    title: 'Validation runs',
    description:
      'Review validation executions, their outcomes, and changes in data quality over time.',
  },
  Issues: {
    eyebrow: 'INVESTIGATION',
    title: 'Data quality issues',
    description:
      'Investigate failed checks, prioritize findings, and track remediation through to resolution.',
  },
};

function App() {
  const { isDark, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<Section>('Overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const detail = sectionDetails[activeSection];

  return (
    <div className="app-shell flex h-full min-h-0 overflow-hidden bg-background text-foreground">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          'app-sidebar fixed inset-y-0 left-0 z-40 flex w-[248px] shrink-0 flex-col border-r border-border bg-card transition-transform duration-200 lg:static lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-[68px] items-center justify-between border-b border-border px-5">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ShieldCheck size={19} strokeWidth={2.2} />
            </div>
            <div className="min-w-0">
              <p className="text-[14px] font-semibold tracking-tight">
                Data Quality Monitor
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.13em] text-muted-foreground">
                Fabric application
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setSidebarOpen(false)}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-accent lg:hidden"
          >
            <X size={17} />
          </button>
        </div>

        <div className="px-4 pb-3 pt-6">
          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Workspace
          </p>
          <div className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Database size={16} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold">Data workspace</p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                Demo dataset active
              </p>
            </div>
            <span className="size-2 shrink-0 rounded-full bg-emerald-500" />
          </div>
        </div>

        <nav className="flex-1 px-4 py-4" aria-label="Main navigation">
          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Monitor
          </p>
          <div className="space-y-1">
            {navigation.map(({ label, icon: Icon }) => (
              <button
                type="button"
                key={label}
                onClick={() => {
                  setActiveSection(label);
                  setSidebarOpen(false);
                }}
                aria-current={activeSection === label ? 'page' : undefined}
                className={cn(
                  'flex h-10 w-full items-center gap-3 rounded-md px-3 text-left text-[13px] font-medium transition-colors',
                  activeSection === label
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                <Icon size={17} strokeWidth={1.8} />
                <span>{label}</span>
                {activeSection === label && (
                  <span className="ml-auto size-1.5 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>

          <div className="my-5 border-t border-border" />

          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Configuration
          </p>
          <div className="space-y-1">
            <div className="flex h-10 items-center gap-3 rounded-md px-3 text-[13px] text-muted-foreground">
              <Settings2 size={17} strokeWidth={1.8} />
              <span>Settings</span>
              <span className="ml-auto text-[9px] uppercase tracking-wider">
                Soon
              </span>
            </div>
          </div>
        </nav>

        <div className="border-t border-border p-4">
          <div className="flex items-center gap-2 rounded-lg bg-muted/60 px-3 py-3">
            <div className="flex size-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground">
              <CircleHelp size={16} />
            </div>
            <div>
              <p className="text-xs font-medium">Need guidance?</p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                Data quality workspace
              </p>
            </div>
            <ArrowUpRight
              size={14}
              className="ml-auto text-muted-foreground"
            />
          </div>
          <p className="mt-4 px-1 text-[10px] text-muted-foreground">
            DATA QUALITY MONITOR <span className="mx-1">·</span> v1.0.0
          </p>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-[68px] shrink-0 items-center justify-between border-b border-border bg-card/80 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              aria-label="Open navigation"
              onClick={() => setSidebarOpen(true)}
              className="rounded-md p-2 text-muted-foreground hover:bg-accent lg:hidden"
            >
              <Menu size={19} />
            </button>
            <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
              <span>Workspace</span>
              <span className="text-border">/</span>
              <span className="font-medium text-foreground">
                {activeSection}
              </span>
            </div>
            <span className="truncate text-xs font-medium sm:hidden">
              {activeSection}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 sm:flex">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-semibold tracking-wide text-emerald-700 dark:text-emerald-400">
                DEMO MODE
              </span>
            </div>
            <button
              type="button"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={toggleTheme}
              className="flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <div className="hidden size-8 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary sm:flex">
              DQ
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1440px] px-4 pb-10 pt-7 sm:px-6 sm:pt-9 lg:px-9">
            <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-3xl">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-primary">
                  {detail.eyebrow}
                </p>
                <h1 className="text-[25px] font-semibold tracking-[-0.04em] sm:text-[30px]">
                  {detail.title}
                </h1>
                <p className="mt-2 max-w-2xl text-[13px] leading-6 text-muted-foreground">
                  {detail.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-9 items-center gap-2 rounded-md border border-border bg-card px-3 text-[11px] text-muted-foreground">
                  <Database size={14} />
                  Fabric workspace
                  <ChevronDown size={13} />
                </span>
              </div>
            </div>

            <QualityWorkspace section={activeSection} />

            <footer className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-[10px] text-muted-foreground">
              <span>Data Quality Monitor</span>
              <span>Synthetic demo data · Local validation</span>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
