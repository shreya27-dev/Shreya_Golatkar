import { useState, type ReactNode } from 'react';
import { Link } from 'wouter';
import { projects } from '../../data/projects';
import './Skiff.css';

const A = (file: string) => `/assets/work/skiff/${file}`;

/* ---------- small building blocks ---------- */

function Shot({ src, alt, file, className = '' }: { src: string; alt: string; file: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className={`sk-shot ${className}`}>
      {failed ? (
        <div className="sk-shot-missing" role="img" aria-label={`Missing screenshot: ${file}`}>
          <span className="eyebrow">Screenshot needed</span>
          <code>{file}</code>
        </div>
      ) : (
        <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
      )}
    </figure>
  );
}

function Section({ index, kicker, title, lede, children, id }: {
  index: string; kicker: string; title: ReactNode; lede?: ReactNode; children?: ReactNode; id?: string;
}) {
  return (
    <section className="sk-section" id={id} aria-labelledby={`${id ?? 'sk'}-${index}-h`}>
      <div className="sk-container">
        <div className="sk-section-grid">
          <div className="sk-section-heading">
            <p className="eyebrow">{index} / {kicker}</p>
            <h2 id={`${id ?? 'sk'}-${index}-h`}>{title}</h2>
          </div>
          <div className="sk-section-body">
            {lede ? <p className="sk-lede">{lede}</p> : null}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return <span className="sk-tag">{children}</span>;
}

function Callouts({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ol className="sk-callouts">
      {items.map((item, i) => (
        <li key={item.title}>
          <span className="sk-callout-n">{String(i + 1).padStart(2, '0')}</span>
          <div>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ---------- content ---------- */

const principles = [
  ['01', 'Goal before configuration', 'Ask users what they want to accomplish before asking how the infrastructure should be configured.'],
  ['02', 'Human language before jargon', 'Translate technical states and actions into language users can understand.'],
  ['03', 'Defaults before decisions', 'Use sensible presets to reduce unnecessary configuration.'],
  ['04', 'Confidence before control', 'Users should always understand what is happening and what happens next.'],
];

const mentalModel = [
  ['Create instance', 'Launch a project'],
  ['Configure CPU', 'Choose workload'],
  ['Configure RAM', 'Choose capacity'],
  ['Configure cron', 'Schedule a task'],
  ['Configure DNS', 'Connect a domain'],
  ['Monitor infrastructure', 'Check health'],
  ['Read usage metrics', 'Understand spending'],
];

const ia = [
  { name: 'Home', items: ['Resources', 'Quick actions', 'Health', 'Alerts'] },
  { name: 'Hosting', items: ['Websites', 'Services', 'Databases'] },
  { name: 'Automation', items: ['Scheduled tasks'] },
  { name: 'Domains', items: ['Active', 'Pending', 'Issues'] },
  { name: 'Billing', items: ['Usage', 'Budget', 'Payments'] },
];

const flow = [
  ['Intent', 'What are you building?'],
  ['Choose workload', 'Pick the closest description'],
  ['Recommended plan', 'A starting point, not a quiz'],
  ['Review configuration', 'Advanced settings are optional'],
  ['Deploy', 'One clear action'],
  ['Monitor health', 'State in plain language'],
  ['Manage', 'Domain · automation · billing'],
];

const states = [
  { key: 'healthy', glyph: '●', label: 'Healthy', human: 'Running well', tech: 'Running · health checks passing' },
  { key: 'pending', glyph: '◔', label: 'Pending', human: 'Waiting on something', tech: 'Awaiting DNS propagation or verification' },
  { key: 'deploying', glyph: '↻', label: 'Deploying', human: 'Getting ready', tech: 'Provisioning / build in progress' },
  { key: 'warning', glyph: '▲', label: 'Warning', human: 'Needs a look soon', tech: 'Nearing a limit or degraded' },
  { key: 'error', glyph: '✕', label: 'Error', human: 'Something is wrong', tech: 'Failed check or failed deploy' },
  { key: 'paused', glyph: '❚❚', label: 'Paused', human: 'Stopped on purpose', tech: 'Stopped by the user' },
  { key: 'disabled', glyph: '○', label: 'Disabled', human: 'Not available', tech: 'Unavailable on this plan or blocked' },
];

const tradeoffs = [
  { a: 'Simplification', b: 'Control', risk: 'Too much abstraction can frustrate technical users.', decision: 'Use progressive disclosure rather than removing advanced configuration.' },
  { a: 'Friendly language', b: 'Precision', risk: 'Human-readable labels are easier to understand, but technical users may still need the underlying state.', decision: 'Show the human-readable state first and expose technical details when needed.' },
  { a: 'Information density', b: 'Visibility', risk: 'Cloud dashboards contain a large amount of information.', decision: 'Prioritise health, actions and attention states before secondary infrastructure details.' },
  { a: 'Automation', b: 'Transparency', risk: 'Automatic configuration reduces effort but can make users feel disconnected from what the system is doing.', decision: 'Use guided defaults while allowing users to inspect and modify advanced configuration.' },
];

const tasks = [
  ['Task 01', 'Deploy a basic website without prior cloud experience.'],
  ['Task 02', 'Connect a custom domain.'],
  ['Task 03', 'Schedule an automated task.'],
  ['Task 04', 'Understand current hosting expenditure.'],
];
const measures = ['Completion rate', 'Time to complete', 'Misunderstandings', 'Terminology comprehension', 'Confidence', 'Points of confusion'];

/* ---------- page ---------- */

export function SkiffCaseStudy() {
  const i = projects.findIndex((p) => p.slug === 'skiff');
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  return (
    <main className="page-in sk">
      {/* 01 HERO */}
      <section className="sk-hero">
        <div className="sk-container">
          <Link href="/" className="sk-back">← Back to work</Link>
          <div className="sk-hero-grid">
            <div>
              <p className="eyebrow">01 / Product design — conceptual exploration</p>
              <h1>Skiff — Making cloud hosting <em>feel less technical.</em></h1>
              <p className="sk-hero-lede">A product design exploration focused on helping non-technical users deploy, manage, and understand cloud infrastructure without needing to learn infrastructure terminology first.</p>
            </div>
            <dl className="sk-meta">
              <div><dt>Role</dt><dd>Solo UX/UI</dd></div>
              <div><dt>Scope</dt><dd>UX strategy · Information architecture · User flows · UI design · Design system</dd></div>
              <div><dt>Type</dt><dd>End to End product design (80+ Screens)</dd></div>
            </dl>
          </div>
          
        </div>
      </section>

      {/* 02 CONTEXT */}
      <Section index="02" kicker="Context" id="context" title={<>Powerful,<br />but not always approachable.</>}
        lede="Cloud infrastructure is powerful. Its interfaces don't always feel approachable. People think in goals. Platforms often ask for implementation details.">
        <div className="sk-translate" role="group" aria-label="How a goal becomes infrastructure decisions">
          <div className="sk-tr-step">
            <span className="eyebrow">User thinking</span>
            <p className="sk-tr-quote">“I want my website online.”</p>
          </div>
          <span className="sk-tr-arrow" aria-hidden="true">↓</span>
          <div className="sk-tr-step sk-tr-muted">
            <span className="eyebrow">Traditional interface</span>
            <ul className="sk-chips">{['Instance', 'vCPU', 'RAM', 'Storage', 'Region', 'DNS', 'Deployment'].map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
          <span className="sk-tr-arrow" aria-hidden="true">↓</span>
          <div className="sk-tr-step sk-tr-accent">
            <span className="eyebrow">Skiff</span>
            <p className="sk-tr-quote">“What are you trying to accomplish?”</p>
          </div>
        </div>
        <p className="sk-body">The design opportunity was to translate infrastructure decisions into user-oriented goals.</p>
      </Section>

      {/* 03 PROBLEM */}
      <Section index="03" kicker="The problem" id="problem" title={<>The<br />technical gap.</>}
        lede="Traditional cloud hosting interfaces tend to expose implementation details early. For experienced users that offers valuable control. For non-technical users it can create uncertainty and decision fatigue.">
        <p className="sk-body">This is the design problem I chose to explore, not a claim about every cloud user. It frames everything that follows.</p>
        <div className="sk-hypothesis">
          <Tag>Design hypothesis</Tag>
          <p>If users can start with their goal instead of infrastructure configuration, the product can reduce unnecessary cognitive load while preserving access to advanced controls.</p>
          <span className="sk-hyp-q">How might we make cloud hosting understandable without removing the power of the platform?</span>
        </div>
      </Section>

      {/* 04 SCENARIOS */}
      <Section index="04" kicker="User scenarios" id="scenarios" title={<>Two ways<br />of using the same product.</>}
        lede="These are behavioural scenarios I designed against. They are not research-based personas.">
        <div className="sk-two">
          <div className="sk-card">
            <Tag>Primary scenario</Tag>
            <h3>Non-technical business owner</h3>
            <ul>{['Get a website or service online', 'Understand whether everything is working', 'Avoid infrastructure jargon', 'Know what they are paying for', 'Resolve problems without understanding the whole stack'].map((n) => <li key={n}>{n}</li>)}</ul>
          </div>
          <div className="sk-card">
            <Tag>Secondary scenario</Tag>
            <h3>Technical user</h3>
            <ul>{['More control', 'Infrastructure visibility', 'Advanced configuration', 'Ability to override defaults'].map((n) => <li key={n}>{n}</li>)}</ul>
          </div>
        </div>
        <p className="sk-pull">How do we simplify the experience without making the product feel limited?</p>
      </Section>

      {/* 05 PRINCIPLES */}
      <Section index="05" kicker="Design principles" id="principles" title={<>Four rules<br />that shaped every screen.</>}>
        <div className="sk-principles">
          {principles.map(([n, t, d]) => (
            <div className="sk-principle" key={n}>
              <span className="sk-principle-n">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 06 REFRAMING */}
      <Section index="06" kicker="Reframing" id="reframing" title={<>From infrastructure management to <em>outcome management.</em></>}>
        <div className="sk-model" role="table" aria-label="Traditional mental model compared with the Skiff mental model">
          <div className="sk-model-head" role="row">
            <span role="columnheader">Traditional mental model</span>
            <span aria-hidden="true" />
            <span role="columnheader">Skiff mental model</span>
          </div>
          {mentalModel.map(([a, b]) => (
            <div className="sk-model-row" role="row" key={a}>
              <span role="cell" className="sk-model-a">{a}</span>
              <span aria-hidden="true" className="sk-model-arrow">→</span>
              <span role="cell" className="sk-model-b">{b}</span>
            </div>
          ))}
        </div>
        <p className="sk-pull sk-pull-big">The interface isn't hiding infrastructure. It is translating infrastructure into decisions users already understand.</p>
      </Section>

      {/* 07 IA */}
      <Section index="07" kicker="Information architecture" id="ia" title={<>Organised around<br />what people need to do.</>}
        lede="I organised the product around what users need to do rather than exposing the underlying infrastructure architecture.">
        <div className="sk-ia" role="group" aria-label="Skiff information architecture">
          <div className="sk-ia-root">Skiff</div>
          <ul className="sk-ia-cols">
            {ia.map((col) => (
              <li key={col.name} className="sk-ia-col">
                <h3>{col.name}</h3>
                <ul>{col.items.map((it) => <li key={it}>{it}</li>)}</ul>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 08 FLOW */}
      <Section index="08" kicker="Core user flow" id="flow" title={<>Intent first.<br />Configuration later.</>}
        lede="Technical configuration is intentionally moved away from the beginning of the journey. The user establishes intent, the system handles complexity where possible, and advanced configuration stays available when needed.">
        <ol className="sk-flow">
          {flow.map(([t, d], idx) => (
            <li key={t}>
              <span className="sk-flow-n">{String(idx + 1).padStart(2, '0')}</span>
              <strong>{t}</strong>
              <small>{d}</small>
            </li>
          ))}
        </ol>
        <p className="sk-note"><Tag>Branch</Tag> At “Review configuration”, users who want control can open advanced settings. Everyone else continues on the default path.</p>
      </Section>

      {/* 09 DASHBOARD */}
      <Section index="09" kicker="01 // Human-centric dashboard" id="dashboard" title={<>Speak human,<br />not machine.</>}
        lede="The dashboard is where every session begins, so it carries the most important jobs: find something, see if it's healthy, act on what needs attention.">
        <Shot src={A('Skiff.svg')} file="dashboard" alt="Skiff dashboard with resource search, resource health cards and quick actions" className="sk-large" />
        <Callouts items={[
          { title: 'Resource search', text: 'A single resource search reduces the need to understand where something lives within the platform.' },
          { title: 'Resource health', text: 'Friendly resource cards communicate state at a glance.' },
          { title: 'Quick actions', text: 'Important actions such as payment and domain renewal are surfaced where users already begin their session.' },
          { title: 'Human-readable terminology', text: 'Technical infrastructure states are translated into language that feels actionable.' },
        ]} />
      </Section>

      {/* 10 PROVISIONING */}
      <Section index="10" kicker="Guided provisioning" id="provisioning" title={<>Choose a plan,<br />not a processor.</>}
        lede="A user shouldn't need to understand vCPU and RAM requirements before knowing what configuration is appropriate. So the flow starts with what they're building.">
        <div className="sk-feature">
          <Shot src={A('WebServices-instanceTypes.svg')} file="provisioning.png" alt="Skiff plan selection showing a recommended Pro plan" />
          <div className="sk-prov">
            <div className="sk-prov-step">
              <span className="eyebrow">Step 1 — What are you building?</span>
              <ul className="sk-chips sk-chips-lg">{['Personal project', 'Business website', 'Growing application', 'High-traffic application'].map((c) => <li key={c}>{c}</li>)}</ul>
            </div>
            <span className="sk-tr-arrow" aria-hidden="true">↓</span>
            <div className="sk-prov-step sk-prov-plan">
              <span className="eyebrow">Step 2 — Recommended plan</span>
              <strong>Pro</strong>
              <span>Ideal for scaling applications</span>
              <span className="sk-btn" aria-hidden="true">Continue</span>
            </div>
            <details className="sk-disclosure">
              <summary>Advanced configuration</summary>
              <ul className="sk-chips">{['vCPU', 'RAM', 'Storage', 'Region'].map((c) => <li key={c}>{c}</li>)}</ul>
            </details>
          </div>
        </div>
        <p className="sk-body">Progressive disclosure is the core idea here. The system gives users a useful starting point while preserving access to technical configuration.</p>
      </Section>

      {/* 11 AUTOMATION */}
      <Section index="11" kicker="Automation" id="automation" title={<>From cron expressions<br />to intent.</>}
        lede="Instead of asking users to understand a cron expression, the interface says what will actually happen.">
        <div className="sk-cron">
          <code className="sk-cron-raw">0 9 * * *</code>
          <span className="sk-tr-arrow" aria-hidden="true">→</span>
          <div>
            <strong>Every day at 9:00 AM</strong>
            <small>Upcoming execution: Tomorrow at 9:00 AM</small>
          </div>
        </div>
        <Shot src={A('CronJob4.svg')} file="automation.png" alt="Skiff scheduled task screen with human-readable schedule" className="sk-large" />
        <p className="sk-body">The implementation detail still exists underneath. The interface simply translates it into a mental model users can understand.</p>
      </Section>

      {/* 12 DOMAINS */}
      <Section index="12" kicker="Domains & DNS" id="domains" title={<>DNS made<br />actionable.</>}
        lede="DNS is technically complex, but the question users have is simple: is my domain connected?">
        <ul className="sk-status-row" aria-label="Domain states">
          <li className="sk-pill sk-pill--healthy"><span aria-hidden="true">●</span> Active</li>
          <li className="sk-pill sk-pill--pending"><span aria-hidden="true">◔</span> Pending</li>
          <li className="sk-pill sk-pill--warning"><span aria-hidden="true">▲</span> Needs attention</li>
        </ul>
        <Shot src={A('Domains.svg')} file="domains.png" alt="Skiff domains screen showing active, pending and needs-attention domains" className="sk-large" />
        <p className="sk-body">The goal wasn't to remove DNS from the product. It was to make the user's immediate problem understandable before exposing the technical details required to solve it.</p>
      </Section>

      {/* 13 BILLING */}
      <Section index="13" kicker="Billing & FinOps" id="billing" title={<>Understand<br />your spend.</>}
        lede="Infrastructure costs can be hard to follow when usage is spread across many resources. This screen is designed for transparency and comprehension. It is not a claim about reducing cost.">
        <div className="sk-feature">
          <Shot src={A('Billing-overview.svg')} file="billing.png" alt="Skiff billing screen with usage, budget and spend status" />
          <Callouts items={[
            { title: 'Current usage', text: 'What has been used so far, in terms that map to what the user runs.' },
            { title: 'Budget', text: 'A reference point, so spend can be judged rather than just read.' },
            { title: 'Spend status and alerts', text: 'Attention states are surfaced before the user has to hunt for them.' },
            { title: 'Payment actions', text: 'The next step sits next to the information that prompts it.' },
          ]} />
        </div>
      </Section>

      {/* 14 DESIGN SYSTEM */}
      <Section index="14" kicker="Design system" id="system" title={<>A system built<br />around states.</>}
        lede="A cloud platform has many more states than the happy path. Designing the system around states helps the interface remain consistent as complexity increases.">
        <p className="sk-note"><Tag>Note</Tag> Swatches and specimens below use the case-study tokens. Replace values in <code>skiff.css</code> with your exact Figma tokens.</p>

        <div className="sk-ds-grid">
          <div className="sk-card">
            <h3>Typography</h3>
            <p className="sk-type-serif">Instrument Serif — headlines</p>
            <p className="sk-type-sans">Space Grotesk — interface and body</p>
            <p className="sk-type-mono">Space Mono — labels and data</p>
          </div>
          <div className="sk-card">
            <h3>Colour</h3>
            <ul className="sk-swatches">
              {[['Background', '--background'], ['Card', '--card'], ['Border', '--border'], ['Primary', '--primary'], ['Accent', '--accent'], ['Secondary', '--secondary']].map(([n, v]) => (
                <li key={n}><span style={{ background: `hsl(var(${v}))` }} /><small>{n}</small></li>
              ))}
            </ul>
          </div>
          <div className="sk-card">
            <h3>Spacing & radius</h3>
            <ul className="sk-space">{[4, 8, 16, 24, 40].map((s) => <li key={s}><span style={{ width: s, height: s }} /><small>{s}</small></li>)}</ul>
            <ul className="sk-radius"><li style={{ borderRadius: 2 }}>2</li><li style={{ borderRadius: 6 }}>6</li><li style={{ borderRadius: 12 }}>12</li><li style={{ borderRadius: 999 }}>pill</li></ul>
          </div>
        </div>

        <div className="sk-ds-grid">
          <div className="sk-card">
            <h3>Buttons</h3>
            <div className="sk-row"><span className="sk-btn">Primary</span><span className="sk-btn sk-btn-ghost">Secondary</span><span className="sk-btn sk-btn-disabled">Disabled</span></div>
          </div>
          <div className="sk-card">
            <h3>Input</h3>
            <label className="sk-field"><span className="eyebrow">Search resources</span><input type="text" placeholder="Try “my website”" /></label>
          </div>
          <div className="sk-card">
            <h3>Progress</h3>
            <div className="sk-progress" role="progressbar" aria-label="Specimen progress bar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}><span style={{ width: '60%' }} /></div>
            <small className="sk-muted">Specimen only</small>
          </div>
          <div className="sk-card">
            <h3>Alert</h3>
            <div className="sk-alert" role="note"><span aria-hidden="true">▲</span> A domain needs attention. <strong>Review</strong></div>
          </div>
          <div className="sk-card">
            <h3>Table row</h3>
            <div className="sk-trow"><span>example.com</span><span className="sk-pill sk-pill--healthy"><span aria-hidden="true">●</span> Active</span></div>
            <div className="sk-trow"><span>shop.example.com</span><span className="sk-pill sk-pill--pending"><span aria-hidden="true">◔</span> Pending</span></div>
          </div>
          <div className="sk-card">
            <h3>Cards, navigation, icons</h3>
            <p className="sk-muted">Shown in context in the dashboard, billing and domain screens above.</p>
          </div>
        </div>

        <h3 className="sk-subhead">Product states</h3>
        <div className="sk-states" role="table" aria-label="Product states, human label and technical meaning">
          <div className="sk-states-head" role="row"><span role="columnheader">State</span><span role="columnheader">What users read</span><span role="columnheader">What it means underneath</span></div>
          {states.map((s) => (
            <div className="sk-states-row" role="row" key={s.key}>
              <span role="cell" className={`sk-pill sk-pill--${s.key}`}><span aria-hidden="true">{s.glyph}</span> {s.label}</span>
              <span role="cell">{s.human}</span>
              <span role="cell" className="sk-muted">{s.tech}</span>
            </div>
          ))}
        </div>
        <p className="sk-body">Each state pairs a glyph with a label, so meaning never depends on colour alone.</p>
      </Section>

      {/* 15 TRADE-OFFS */}
      <Section index="15" kicker="Key design trade-offs" id="tradeoffs" title={<>What I gave up,<br />and why.</>}>
        <div className="sk-two">
          {tradeoffs.map((t, n) => (
            <div className="sk-card sk-trade" key={t.a}>
              <span className="eyebrow">Trade-off {String(n + 1).padStart(2, '0')}</span>
              <h3>{t.a} <span aria-label="versus">↔</span> {t.b}</h3>
              <p className="sk-muted">{t.risk}</p>
              <div className="sk-decision"><span className="eyebrow">Decision</span><p>{t.decision}</p></div>
            </div>
          ))}
        </div>
      </Section>

      {/* 16 VALIDATION */}
      <Section index="16" kicker="Validation" id="validation" title={<>What I'd validate<br />next.</>}
        lede="This was primarily a product and UI design exploration. The next step would be validating whether the simplified model actually improves comprehension and task completion.">
        <Tag>Proposed validation</Tag>
        <div className="sk-two sk-tasks">
          {tasks.map(([t, d]) => (
            <div className="sk-card" key={t}><span className="eyebrow">{t}</span><p>{d}</p></div>
          ))}
        </div>
        <h3 className="sk-subhead">Measured for each task</h3>
        <ul className="sk-chips sk-chips-lg">{measures.map((m) => <li key={m}>{m}</li>)}</ul>
      </Section>

      {/* 17 REFLECTION */}
      <Section index="17" kicker="Reflection" id="reflection" title={<>Complexity doesn't disappear. It moves to <em>where it belongs.</em></>}>
        <p className="sk-lede">Designing Skiff changed how I think about simplifying complex products. The goal isn't to remove complexity from the product. Infrastructure will always be complex. The designer's responsibility is to decide when that complexity needs to be visible and when the system can absorb it for the user.</p>
        <div className="sk-card">
          <h3>If I took this further, I would validate three assumptions</h3>
          <ol className="sk-assume">
            <li><Tag>Assumption</Tag> Non-technical users actually prefer goal-based provisioning.</li>
            <li><Tag>Assumption</Tag> Simplified terminology improves comprehension without reducing trust.</li>
            <li><Tag>Assumption</Tag> Technical users still feel sufficiently in control when advanced settings are hidden by default.</li>
          </ol>
        </div>
      </Section>

      {/* 18 SUMMARY */}
      <section className="sk-summary">
        <div className="sk-container">
          <div className="sk-summary-card">
            <h2>Skiff</h2>
            <p className="sk-summary-line">Making cloud hosting feel less technical.</p>
            <dl className="sk-meta sk-meta-row">
              <div><dt>Role</dt><dd>Product Designer · UX/UI</dd></div>
              <div><dt>Scope</dt><dd>UX strategy · Information architecture · User flows · UI design · Design system</dd></div>
              <div><dt>Type</dt><dd>Self-initiated product design exploration</dd></div>
            </dl>
          </div>
          <nav className="sk-pn" aria-label="Project navigation">
            <Link href={`/work/${prev.slug}`} className="sk-pn-link"><span className="eyebrow">← Previous project</span><strong>{prev.cardTitle}</strong></Link>
            <Link href={`/work/${next.slug}`} className="sk-pn-link sk-pn-next"><span className="eyebrow">Next project →</span><strong>{next.cardTitle}</strong></Link>
          </nav>
        </div>
      </section>
    </main>
  );
}