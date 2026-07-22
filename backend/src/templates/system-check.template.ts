export type SystemCheckData = {
  status: 'success' | 'error';
  title: string;
  message: string;
  dbTime?: string;
  systemTime?: string;
};

const SYSTEM_CHECK_HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{appName}} — System Check</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
            color: #e2e8f0;
        }
        .card {
            width: 100%;
            max-width: 480px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 20px;
            padding: 2.5rem;
            backdrop-filter: blur(12px);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.35rem 0.85rem;
            border-radius: 999px;
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            margin-bottom: 1.5rem;
        }
        .badge.success {
            background: rgba(34, 197, 94, 0.12);
            color: #22c55e;
            border: 1px solid rgba(34, 197, 94, 0.25);
        }
        .badge.error {
            background: rgba(239, 68, 68, 0.12);
            color: #ef4444;
            border: 1px solid rgba(239, 68, 68, 0.25);
        }
        .badge-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
        }
        .badge-dot.success { background: #22c55e; box-shadow: 0 0 8px #22c55e; }
        .badge-dot.error { background: #ef4444; box-shadow: 0 0 8px #ef4444; }
        h1 {
            font-size: 1.5rem;
            font-weight: 700;
            letter-spacing: -0.02em;
            margin-bottom: 0.5rem;
        }
        .app-name {
            font-size: 0.875rem;
            font-weight: 500;
            margin-bottom: 0.25rem;
        }
        .app-name.success { color: #6366f1; }
        .app-name.error { color: #ef4444; }
        .subtitle {
            font-size: 0.9rem;
            color: #94a3b8;
            line-height: 1.5;
            margin-bottom: 2rem;
        }
        .metrics {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }
        .metric {
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
            padding: 1rem 1.25rem;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 12px;
        }
        .metric-label {
            font-size: 0.7rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #64748b;
        }
        .metric-value {
            display: flex;
            align-items: flex-start;
            gap: 0.6rem;
        }
        .metric-content {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }
        .metric-formatted {
            font-size: 0.9rem;
            color: #e2e8f0;
        }
        .metric-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            flex-shrink: 0;
        }
        .metric-dot.success { background: #22c55e; }
        .metric-dot.error { background: #ef4444; }
        code {
            font-family: 'Cascadia Code', 'Fira Code', Consolas, monospace;
            font-size: 0.8rem;
            color: #cbd5e1;
            word-break: break-all;
        }
        .footer {
            margin-top: 2rem;
            padding-top: 1.25rem;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
            font-size: 0.75rem;
            color: #475569;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="badge {{status}}">
            <span class="badge-dot {{status}}"></span>
            {{statusLabel}}
        </div>
        <p class="app-name {{status}}">{{appName}}</p>
        <h1>{{title}}</h1>
        <p class="subtitle">{{message}}</p>
        {{metrics}}
        <div class="footer">System Check · {{timestamp}}</div>
    </div>
</body>
</html>`;

const METRIC_HTML = `<div class="metric">
    <span class="metric-label">{{label}}</span>
    <div class="metric-value">
        <span class="metric-dot {{status}}"></span>
        <div class="metric-content">
            <span class="metric-formatted">{{formatted}}</span>
            <code>{{raw}}</code>
        </div>
    </div>
</div>`;

type SystemCheckMetricSource = keyof Pick<
  SystemCheckData,
  'dbTime' | 'systemTime'
>;

type SystemCheckMetricMap = {
  label: string;
  source: SystemCheckMetricSource;
};

const SYSTEM_CHECK_METRIC_MAP: SystemCheckMetricMap[] = [
  { label: 'Hora do banco', source: 'dbTime' },
  { label: 'Hora do sistema', source: 'systemTime' },
];

const formatLocaleTime = (isoTime: string): string => {
  const date = new Date(isoTime);
  if (Number.isNaN(date.getTime())) return isoTime;
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  }).format(date);
};

const mapSystemCheckMetrics = (
  data: SystemCheckData,
): Array<{ label: string; formatted: string; raw: string }> =>
  SYSTEM_CHECK_METRIC_MAP.flatMap(({ label, source }) => {
    const raw = data[source];
    if (!raw) return [];
    return [{ label, formatted: formatLocaleTime(raw), raw }];
  });

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const fillTemplate = (
  template: string,
  values: Record<string, string>,
): string =>
  Object.entries(values).reduce(
    (html, [key, value]) => html.replaceAll(`{{${key}}}`, value),
    template,
  );

export const buildSystemCheckHtml = (
  appName: string,
  data: SystemCheckData,
): string => {
  const status = data.status;
  const statusLabel = status === 'success' ? 'Operacional' : 'Indisponível';

  const metrics = mapSystemCheckMetrics(data);

  const metricsHtml = metrics.length
    ? `<div class="metrics">${metrics
        .map((metric) =>
          fillTemplate(METRIC_HTML, {
            status,
            label: escapeHtml(metric.label),
            formatted: escapeHtml(metric.formatted),
            raw: escapeHtml(metric.raw),
          }),
        )
        .join('')}</div>`
    : '';

  return fillTemplate(SYSTEM_CHECK_HTML, {
    appName: escapeHtml(appName),
    status,
    statusLabel,
    title: escapeHtml(data.title),
    message: escapeHtml(data.message),
    metrics: metricsHtml,
    timestamp: new Date().toISOString(),
  });
};
