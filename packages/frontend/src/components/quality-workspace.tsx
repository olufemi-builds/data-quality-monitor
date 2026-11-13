import { useState } from 'react';
import { Activity, AlertCircle, CheckCircle2, Play, ShieldCheck } from 'lucide-react';
import { createValidationRun, demoRecords, initialRules, validateDataset } from '@/lib/quality-demo';
import type { QualityIssue, QualityRule, ValidationRun } from '@/lib/quality-demo';

type Section = 'Overview' | 'Rules' | 'Runs' | 'Issues';

export default function QualityWorkspace({ section }: { section: Section }) {
  const [rules, setRules] = useState<QualityRule[]>(initialRules);
  const [issues, setIssues] = useState<QualityIssue[]>([]);
  const [runs, setRuns] = useState<ValidationRun[]>([]);
  const [runNumber, setRunNumber] = useState(0);
  const executeRun = () => {
    const findings = validateDataset(demoRecords, rules);
    const nextNumber = runNumber + 1;
    const run = createValidationRun(findings, demoRecords.length, rules.filter((rule) => rule.enabled).length, nextNumber);
    setIssues((current) => findings.map((finding) => {
      const previous = current.find((issue) =>
        issue.ruleId === finding.ruleId &&
        issue.recordId === finding.recordId &&
        issue.field === finding.field
      );
      return previous ? { ...finding, status: previous.status } : finding;
    }));
    setRuns((current) => [run, ...current]);
    setRunNumber(nextNumber);
  };
  const toggleRule = (id: string) => setRules((current) => current.map((rule) => rule.id === id ? { ...rule, enabled: !rule.enabled } : rule));
  const resolveIssue = (id: string) => setIssues((current) => current.map((issue) => issue.id === id ? { ...issue, status: 'Resolved' } : issue));

  const openIssues = issues.filter((issue) => issue.status === 'Open').length;
  const latestRun = runs[0];
  const score = latestRun?.score ?? 100;
  const card = 'rounded-lg border border-border bg-card';
  const muted = 'text-muted-foreground';
  const button = 'inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90';

  if (section === 'Overview') return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-center justify-between gap-3 rounded-lg border border-sky-500/20 bg-sky-500/5 px-4 py-3'>
        <div><p className='text-xs font-semibold'>Retail Operations Demo</p><p className={'mt-1 text-[11px] ' + muted}>Synthetic dataset · 12 records · Local validation</p></div>
        <span className='rounded-full border border-sky-500/30 px-3 py-1 text-[10px] font-semibold text-sky-600'>DEMO MODE</span>
      </div>
      <div className='grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
        {[{ label: 'Quality score', value: latestRun ? score + '%' : '—', icon: ShieldCheck }, { label: 'Active rules', value: String(rules.filter((rule) => rule.enabled).length), icon: CheckCircle2 }, { label: 'Validation runs', value: String(runs.length), icon: Activity }, { label: 'Open issues', value: String(openIssues), icon: AlertCircle }].map(({ label, value, icon: Icon }) => <div key={label} className={card + ' p-4'}><div className='flex items-center justify-between'><span className={'text-[11px] font-medium ' + muted}>{label}</span><Icon size={16} className={muted} /></div><p className='mt-3 text-2xl font-semibold tracking-tight'>{value}</p></div>)}
      </div>
      <div className={card + ' flex flex-wrap items-center justify-between gap-4 p-5'}>
        <div><h2 className='text-sm font-semibold'>Run a quality assessment</h2><p className={'mt-1 text-xs ' + muted}>Execute all enabled rules against the demo records.</p></div>
        <button type='button' className={button} onClick={executeRun}><Play size={14} /> Run validation</button>
      </div>
      <div className={card + ' p-5'}><h2 className='text-sm font-semibold'>Dataset profile</h2><div className='mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4'>{[{ label: 'Records', value: demoRecords.length }, { label: 'Quality rules', value: rules.length }, { label: 'Dimensions', value: new Set(rules.map((rule) => rule.dimension)).size }, { label: 'Latest score', value: latestRun ? score + '%' : 'Not run' }].map((item) => <div key={item.label}><p className={'text-[10px] ' + muted}>{item.label}</p><p className='mt-1 text-lg font-semibold'>{item.value}</p></div>)}</div></div>
    </div>
  );

  if (section === 'Rules') return (
    <div className='space-y-3'>
      {rules.map((rule) => (
        <div key={rule.id} className={card + ' flex items-center justify-between gap-3 p-4'}>
          <div>
            <p className='text-xs font-semibold'>{rule.name}</p>
            <p className={'mt-1 text-[11px] ' + muted}>{rule.id} · {rule.dimension} · {rule.severity}</p>
            <p className={'mt-1 text-xs ' + muted}>{rule.description}</p>
          </div>
          <button className={button} onClick={() => toggleRule(rule.id)}>
            {rule.enabled ? 'Enabled' : 'Disabled'}
          </button>
        </div>
      ))}
    </div>
  );

  if (section === 'Runs') return (
    <div className='space-y-3'>
      {runs.length === 0 ? (
        <p className={card + ' p-6 text-sm text-muted-foreground'}>No validation runs yet. Run an assessment from Overview.</p>
      ) : runs.map((run) => (
        <div key={run.id} className={card + ' flex flex-wrap justify-between gap-3 p-4'}>
          <div>
            <p className='text-sm font-semibold'>{run.id}</p>
            <p className={'mt-1 text-xs ' + muted}>{new Date(run.timestamp).toLocaleString()}</p>
          </div>
          <div className='flex gap-5 text-xs'>
            <span>Score: <b>{run.score}%</b></span>
            <span>Passed: <b>{run.passed}</b></span>
            <span>Failed: <b>{run.failed}</b></span>
          </div>
        </div>
      ))}
    </div>
  );

  if (section === 'Issues') return (
    <div className='space-y-3'>
      {issues.length === 0 && <p className={card + ' p-6 text-sm ' + muted}>No findings yet. Run validation from Overview.</p>}
      {issues.map((issue) => (
        <div key={issue.id} className={card + ' flex flex-wrap items-center justify-between gap-3 p-4'}>
          <div>
            <p className='text-xs font-semibold'>{issue.message}</p>
            <p className={'mt-1 text-[11px] ' + muted}>{issue.recordId} · {issue.field} · {issue.severity}</p>
            <p className={'mt-1 text-[11px] ' + muted}>Value: {issue.value || '(empty)'} · {issue.status}</p>
          </div>
          {issue.status === 'Open' && <button className={button} onClick={() => resolveIssue(issue.id)}>Resolve</button>}
        </div>
      ))}
    </div>
  );
  return null;
}
