import { useState, type ReactNode } from 'react';
import { Link } from 'wouter';
import { projects } from '@/data/projects';
import './Wagout.css';

const A = (file: string) => `/assets/work/wagout/${file}`;

/* ---------- palette for the hi-fi screen illustrations (brand-locked, not theme-driven) ---------- */
const C = {
  bg: '#F5F6F1',
  card: '#FFFFFF',
  ink: '#1E1E1E',
  inkSoft: '#5A5A54',
  border: '#E3E3DD',
  moss: '#3F6B4F',
  mossLight: '#DCE8E2',
  amber: '#E8954A',
  amberSoft: '#FBEADA',
  coral: '#E2574C',
};

/* ---------- small building blocks ---------- */

function Shot({ src, alt, file, className = '' }: { src: string; alt: string; file: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className={`wg-shot ${className}`}>
      {failed ? (
        <div className="wg-shot-missing" role="img" aria-label={`Missing screenshot: ${file}`}>
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
    <section className="wg-section" id={id} aria-labelledby={`${id ?? 'wg'}-${index}-h`}>
      <div className="wg-container">
        <div className="wg-section-grid">
          <div className="wg-section-heading">
            <p className="eyebrow">{index} / {kicker}</p>
            <h2 id={`${id ?? 'wg'}-${index}-h`}>{title}</h2>
          </div>
          <div className="wg-section-body">
            {lede ? <p className="wg-lede">{lede}</p> : null}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function Tag({ children, variant }: { children: ReactNode; variant?: 'moss' }) {
  return <span className={`wg-tag ${variant === 'moss' ? 'wg-tag--moss' : ''}`}>{children}</span>;
}

/* ---------- phone chrome shared by every hi-fi SVG screen ---------- */

function PhoneChrome({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 300 640" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="640" fill={C.bg} />
      {/* status bar */}
      <text x="20" y="28" fontFamily="monospace" fontSize="10" fill={C.ink}>9:41</text>
      <text x="255" y="28" fontFamily="monospace" fontSize="10" fill={C.ink}>5G ■■■</text>
      {children}
    </svg>
  );
}

function BottomNav({ active }: { active: number }) {
  const icons = ['⌂', '🔍', '🐾', '🎁', '☰'];
  return (
    <g>
      <rect x="0" y="588" width="300" height="52" fill={C.card} stroke={C.border} />
      {icons.map((ic, i) => (
        <text key={i} x={30 + i * 60} y="618" fontSize="16" textAnchor="middle" opacity={i === active ? 1 : 0.35}>{ic}</text>
      ))}
    </g>
  );
}

/* ---------- 01 Home / Browse ---------- */
function ScreenHome() {
  const dogs = [
    { name: 'Nelly', tag: 'Calm', walks: 23 },
    { name: 'Coco', tag: 'Playful', walks: 8 },
  ];
  return (
    <PhoneChrome>
      <text x="20" y="60" fontFamily="serif" fontSize="18" fill={C.ink}>Hi Riya 👋</text>
      <text x="20" y="80" fontFamily="sans-serif" fontSize="11" fill={C.inkSoft}>Dogs near you are waiting</text>
      <rect x="20" y="96" width="260" height="38" rx="10" fill={C.card} stroke={C.border} />
      <text x="34" y="120" fontSize="11" fill={C.inkSoft}>🔍  Try “calm and small”</text>
      <rect x="20" y="148" width="120" height="24" rx="12" fill={C.moss} />
      <text x="80" y="164" fontSize="10" fill="#fff" textAnchor="middle">Family-friendly</text>
      <rect x="148" y="148" width="70" height="24" rx="12" fill={C.card} stroke={C.border} />
      <text x="183" y="164" fontSize="10" fill={C.ink} textAnchor="middle">Low energy</text>
      {dogs.map((d, i) => (
        <g key={d.name} transform={`translate(20, ${190 + i * 168})`}>
          <rect width="260" height="150" rx="14" fill={C.card} stroke={C.border} />
          <rect width="260" height="90" rx="14" fill={C.mossLight} />
          <circle cx="130" cy="45" r="26" fill={C.moss} opacity="0.5" />
          <text x="130" y="50" fontSize="20" textAnchor="middle">🐕</text>
          <rect x="12" y="12" width="60" height="18" rx="9" fill={C.amber} />
          <text x="42" y="24" fontSize="8" fill="#fff" textAnchor="middle">{d.walks} walks</text>
          <text x="16" y="112" fontFamily="serif" fontSize="16" fill={C.ink}>{d.name}</text>
          <text x="16" y="130" fontSize="10" fill={C.inkSoft}>2.4 km away · {d.tag} · Vet checked ✓</text>
          <rect x="180" y="105" width="66" height="26" rx="8" fill={C.amber} />
          <text x="213" y="122" fontSize="10" fill="#fff" textAnchor="middle">View</text>
        </g>
      ))}
      <BottomNav active={0} />
    </PhoneChrome>
  );
}

/* ---------- 02 Dog profile ---------- */
function ScreenProfile() {
  return (
    <PhoneChrome>
      <rect x="0" y="0" width="300" height="220" fill={C.mossLight} />
      <text x="150" y="120" fontSize="48" textAnchor="middle">🐕</text>
      <rect x="20" y="44" width="60" height="26" rx="13" fill={C.card} />
      <text x="50" y="61" fontSize="10" fill={C.ink} textAnchor="middle">← Back</text>
      <rect x="20" y="236" width="90" height="20" rx="10" fill={C.amber} />
      <text x="65" y="250" fontSize="9" fill="#fff" textAnchor="middle">Available now</text>
      <text x="20" y="284" fontFamily="serif" fontSize="26" fill={C.ink}>Nelly</text>
      <text x="20" y="304" fontSize="11" fill={C.inkSoft}>2 yrs · Indie mix · 14 kg · Sunrise Shelter</text>
      {['Calm', 'Good with kids', '23 walks'].map((t, i) => (
        <g key={t}>
          <rect x={20 + i * 88} y="316" width="80" height="24" rx="12" fill={C.card} stroke={C.border} />
          <text x={60 + i * 88} y="332" fontSize="9" fill={C.ink} textAnchor="middle">{t}</text>
        </g>
      ))}
      <rect x="20" y="356" width="260" height="1" fill={C.border} />
      <text x="20" y="382" fontFamily="serif" fontSize="13" fill={C.ink}>About Nelly</text>
      {[0, 1, 2].map((i) => <rect key={i} x="20" y={396 + i * 14} width={i === 2 ? 160 : 260} height="8" rx="3" fill={C.border} />)}
      <text x="20" y="454" fontFamily="serif" fontSize="13" fill={C.ink}>Vet &amp; safety record</text>
      <rect x="20" y="466" width="260" height="46" rx="10" fill={C.card} stroke={C.border} />
      <text x="34" y="486" fontSize="10" fill={C.ink}>✓ Vaccinated · ✓ Spayed</text>
      <text x="34" y="502" fontSize="10" fill={C.ink}>✓ 0 incidents in 23 walks</text>
      <rect x="20" y="558" width="260" height="46" rx="12" fill={C.amber} />
      <text x="150" y="586" fontSize="13" fill="#fff" textAnchor="middle" fontWeight="700">Book a walk with Nelly</text>
    </PhoneChrome>
  );
}

/* ---------- 03 Booking & payment (trust dip 1) ---------- */
function ScreenBooking() {
  return (
    <PhoneChrome>
      <text x="20" y="56" fontFamily="serif" fontSize="18" fill={C.ink}>Confirm your walk</text>
      <text x="20" y="76" fontSize="11" fill={C.inkSoft}>with Nelly · Today</text>
      <text x="20" y="106" fontSize="10" fill={C.inkSoft}>DURATION</text>
      {['1 hr', '2 hr', '3 hr'].map((d, i) => (
        <g key={d}>
          <rect x={20 + i * 88} y="114" width="80" height="30" rx="15" fill={i === 2 ? C.amber : C.card} stroke={C.border} />
          <text x={60 + i * 88} y="133" fontSize="10" fill={i === 2 ? '#fff' : C.ink} textAnchor="middle">{d}</text>
        </g>
      ))}
      <text x="20" y="170" fontSize="10" fill={C.inkSoft}>SLOT</text>
      <rect x="20" y="178" width="260" height="34" rx="10" fill={C.card} stroke={C.border} />
      <text x="34" y="200" fontSize="11" fill={C.ink}>4:00 PM – 7:00 PM  ▾</text>
      <rect x="20" y="232" width="260" height="114" rx="12" fill={C.card} stroke={C.border} />
      <text x="34" y="256" fontSize="10" fill={C.inkSoft}>Rental (3 hr)</text>
      <text x="246" y="256" fontSize="10" fill={C.ink} textAnchor="end">₹450</text>
      <text x="34" y="278" fontSize="10" fill={C.inkSoft}>Refundable deposit</text>
      <text x="246" y="278" fontSize="10" fill={C.ink} textAnchor="end">₹500</text>
      <rect x="34" y="292" width="212" height="1" fill={C.border} />
      <text x="34" y="314" fontSize="11" fill={C.ink} fontWeight="700">Total due now</text>
      <text x="246" y="314" fontSize="11" fill={C.ink} textAnchor="end" fontWeight="700">₹950</text>
      <text x="34" y="332" fontSize="8.5" fill={C.moss}>Deposit refunds in 24h if no incident — see policy</text>
      <rect x="20" y="362" width="260" height="1" fill={C.border} />
      <rect x="20" y="374" width="260" height="150" rx="12" fill={C.amberSoft} />
      <text x="34" y="396" fontSize="10" fill={C.ink} fontWeight="700">If something goes wrong</text>
      {['Free cancellation up to 2h before', 'Full deposit refund, no questions asked', 'In-app SOS + shelter contact on every walk'].map((t, i) => (
        <text key={t} x="34" y={416 + i * 18} fontSize="9.5" fill={C.inkSoft}>✓ {t}</text>
      ))}
      <rect x="20" y="558" width="260" height="46" rx="12" fill={C.amber} />
      <text x="150" y="586" fontSize="13" fill="#fff" textAnchor="middle" fontWeight="700">Pay ₹950 &amp; confirm</text>
    </PhoneChrome>
  );
}

/* ---------- 04 Active walk ---------- */
function ScreenWalk() {
  return (
    <PhoneChrome>
      <rect x="0" y="0" width="300" height="360" fill={C.mossLight} />
      <path d="M20 300 C 90 200, 150 260, 220 160 S 280 90, 280 40" stroke={C.moss} strokeWidth="3" fill="none" strokeDasharray="6 6" opacity="0.6" />
      <circle cx="220" cy="160" r="6" fill={C.amber} />
      <rect x="90" y="150" width="120" height="36" rx="18" fill={C.card} />
      <text x="150" y="173" fontSize="11" fill={C.ink} textAnchor="middle">🐾 You're walking Nelly</text>
      <rect x="20" y="382" width="260" height="90" rx="16" fill={C.ink} />
      <text x="150" y="418" fontFamily="monospace" fontSize="30" fill="#fff" textAnchor="middle" fontWeight="700">1:47:12</text>
      <text x="150" y="438" fontSize="9" fill="#cfcfcf" textAnchor="middle">TIME REMAINING</text>
      <rect x="20" y="486" width="124" height="52" rx="12" fill={C.card} stroke={C.border} />
      <text x="82" y="508" fontSize="10" fill={C.ink} textAnchor="middle">Care tips</text>
      <text x="82" y="524" fontSize="8.5" fill={C.inkSoft} textAnchor="middle">Water every 45 min</text>
      <rect x="156" y="486" width="124" height="52" rx="12" fill={C.coral} />
      <text x="218" y="516" fontSize="12" fill="#fff" textAnchor="middle" fontWeight="700">SOS</text>
      <rect x="20" y="558" width="260" height="46" rx="12" fill={C.moss} />
      <text x="150" y="586" fontSize="13" fill="#fff" textAnchor="middle" fontWeight="700">Head back to shelter</text>
    </PhoneChrome>
  );
}

/* ---------- 05 Drop-off (trust dip 2 / emotional peak) ---------- */
function ScreenDropoff() {
  return (
    <PhoneChrome>
      <text x="150" y="60" fontFamily="serif" fontSize="18" fill={C.ink} textAnchor="middle">Nelly's home safe 🐾</text>
      <text x="150" y="82" fontSize="10.5" fill={C.inkSoft} textAnchor="middle">You walked for 2h 58m today</text>
      <rect x="20" y="104" width="260" height="130" rx="14" fill={C.mossLight} />
      <circle cx="150" cy="168" r="30" fill={C.moss} opacity="0.5" />
      <text x="150" y="176" fontSize="26" textAnchor="middle">📷</text>
      <text x="150" y="256" fontSize="10" fill={C.inkSoft} textAnchor="middle">How was your walk with Nelly?</text>
      <text x="150" y="282" fontSize="22" textAnchor="middle" fill={C.amber}>★★★★★</text>
      <rect x="20" y="308" width="260" height="1" fill={C.border} />
      <rect x="20" y="326" width="260" height="76" rx="14" fill={C.card} stroke={C.border} />
      <text x="34" y="350" fontSize="12" fill={C.ink} fontWeight="700">🎁  Gift Nelly something</text>
      <text x="34" y="368" fontSize="9.5" fill={C.inkSoft}>Treats, a toy or a vet-fund top-up</text>
      <rect x="34" y="378" width="90" height="16" rx="8" fill={C.card} stroke={C.moss} />
      <text x="79" y="390" fontSize="8" fill={C.moss} textAnchor="middle">Send a gift →</text>
      <rect x="20" y="414" width="260" height="90" rx="14" fill={C.amberSoft} stroke={C.amber} />
      <text x="34" y="440" fontSize="12" fill={C.ink} fontWeight="700">💛  Already missing her?</text>
      <text x="34" y="458" fontSize="9.5" fill={C.inkSoft}>Take the 2-min readiness quiz</text>
      <rect x="34" y="468" width="120" height="22" rx="11" fill={C.amber} />
      <text x="94" y="483" fontSize="9" fill="#fff" textAnchor="middle">Adopt Nelly →</text>
      <rect x="20" y="558" width="260" height="46" rx="12" fill={C.card} stroke={C.border} />
      <text x="150" y="586" fontSize="12" fill={C.ink} textAnchor="middle">Back to home</text>
    </PhoneChrome>
  );
}

/* ---------- 06 Adoption readiness ---------- */
function ScreenAdopt() {
  return (
    <PhoneChrome>
      <text x="20" y="56" fontFamily="serif" fontSize="18" fill={C.ink}>Ready for Nelly?</text>
      <text x="20" y="76" fontSize="11" fill={C.inkSoft}>3 quick questions, no commitment yet</text>
      <rect x="20" y="98" width="80" height="6" rx="3" fill={C.amber} />
      <rect x="104" y="98" width="156" height="6" rx="3" fill={C.border} />
      <text x="20" y="140" fontSize="10" fill={C.inkSoft}>QUESTION 1 OF 3</text>
      <text x="20" y="164" fontFamily="serif" fontSize="16" fill={C.ink}>Does your home allow pets?</text>
      {['Yes, confirmed', 'Not sure yet', 'No, but exploring'].map((o, i) => (
        <g key={o}>
          <rect x="20" y={186 + i * 46} width="260" height="36" rx="10" fill={i === 0 ? C.mossLight : C.card} stroke={i === 0 ? C.moss : C.border} strokeWidth={i === 0 ? 1.5 : 1} />
          <text x="36" y={208 + i * 46} fontSize="11" fill={C.ink}>{o}</text>
        </g>
      ))}
      <rect x="20" y="398" width="260" height="110" rx="12" fill={C.card} stroke={C.border} />
      <text x="34" y="422" fontSize="10" fill={C.ink} fontWeight="700">What happens next</text>
      {['Submit application', 'Quick home check', 'Sign &amp; pay adoption fee'].map((t, i) => (
        <text key={i} x="34" y={442 + i * 20} fontSize="9.5" fill={C.inkSoft}>{i + 1}. {t.replace('&amp;', '&')}</text>
      ))}
      <rect x="20" y="558" width="260" height="46" rx="12" fill={C.amber} />
      <text x="150" y="586" fontSize="13" fill="#fff" textAnchor="middle" fontWeight="700">Continue</text>
    </PhoneChrome>
  );
}

/* ---------- content ---------- */

const marketStats = [
  ['~69M', 'homeless dogs & cats living on streets or in shelters across India', 'Dogster'],
  ['31M+', 'pet dogs already in Indian homes — the most-owned pet by 63% of owners', 'Dogster'],
  ['~6 lakh', 'pets newly adopted in India in a single recent year, mostly first-time owners', 'Unleashed by Purina'],
  ['50%', 'of Indian pet owners admit to relinquishing a pet since the pandemic began', 'Dogster'],
];

const methods = [
  ['01', 'Secondary research', "India's pet adoption market size, app behaviour and competitor landscape, sourced from Dogster, Unleashed by Purina, Greenice and Fortune Business Insights."],
  ['02', 'Stakeholder framing interviews', 'Conversations with shelter volunteers to understand staffing, liability and welfare constraints — and what a rental model would actually require from their end.'],
  ['03', 'Informal user conversations', '8–10 conversations with urban Indians aged 25–38 who either want a dog or have considered adoption, used to build proto-personas.'],
  ['04', 'Journey mapping workshop', 'Plotted emotional highs and lows across a full rental experience to locate where confidence dips.'],
];

const insights = [
  ['01', 'Adoption is treated as binary', "People either \u201Cdecide to adopt\u201D or don't engage with shelters at all. There's no accepted middle step, so curious but uncertain people opt out entirely.", false],
  ['02', 'Trust is built through transparency, not marketing', "Vet records, temperament tags and visible shelter accountability mattered more than photos or branding. People don't need to be convinced a dog is good — they need to be shown.", false],
  ['03', 'Shelters are resource-constrained, not resistant', 'Staff are open to a rental model but worried about admin load and liability. Booking and drop-off must reduce their effort, not add to it.', false],
  ['04', 'The emotional peak is right after the walk', "Attachment is highest at the moment of returning the dog, not picking it up. That's where gift and adopt prompts belong.", false],
  ['05', "Families want a \u201Ctrial run,\u201D not just a walk", "For first-time owners with kids, the appeal is a low-risk way to see how the household reacts before committing to years of care.", true],
];

const empathy = [
  ['\u201CI just want to spend time with a dog first\u201D', 'Adoption shouldn\u2019t have to be instant or permanent', 'Hopeful, cautious', 'Reframe the core action as \u201Crenting time,\u201D with adoption as an optional next step'],
  ['\u201CWhat if the dog bites someone, or runs off?\u201D', "I don't know enough about this specific dog yet", 'Anxious', 'Surface temperament tags, vet checks and incident history on the dog profile'],
  ['\u201CThe shelter is only open weekday afternoons\u201D', "This isn't built for someone with a 9-to-5 job", 'Frustrated', 'Online slot booking with real-time availability, not phone or walk-in only'],
  ['\u201CI already miss him after just 3 hours\u201D', "Maybe I'm more ready than I thought", 'Attached, reflective', 'Capture this moment immediately post drop-off with a gentle adopt + gift prompt'],
];

const journey = [
  ['Doing', ['Downloads app, browses without signup', 'Filters by size / energy, reads dog profile', 'Picks 3 hrs, selects slot, pays deposit', 'Walks Nelly with live timer + map', 'Returns Nelly, rates the walk', 'Sees gift & adopt prompt']],
  ['Thinking', ['“Can I really just rent a dog?”', '“Which one matches my apartment?”', '“Is my deposit safe?”', '“This is easier than I expected.”', '“Already missing her.”', '“Maybe I’m ready to adopt.”']],
  ['Feeling', ['Curious, sceptical', 'Excited, hopeful', 'Cautious — dip', 'Joyful, connected', 'Sad, attached — dip', 'Inspired, motivated']],
  ['Opportunity', ['60-second value-prop onboarding', 'Temperament tags + mood state + walk count', 'Refund policy inline, itemised price', 'Timer shows time remaining, not elapsed', 'Capture the peak: photo recap, soft CTA', 'Adoption readiness quiz, not a hard form']],
];
const journeyStages = ['01 Discover', '02 Browse & pick', '03 Book slot', '04 Walk', '05 Drop-off', '06 Post-walk'];

const competitors = [
  ['Rover (global)', 'Marketplace: owners \u2192 walkers / sitters', 'Assumes you already own a dog — no adoption pathway'],
  ['Wag (global)', 'On-demand walking, strong GPS UX', 'Same: built for existing pet owners, not shelters'],
  ['Indian shelters', 'In-person visits, manual adoption forms', 'No online booking, no low-commitment entry point'],
  ['Govt. portals', 'Structured online application', 'Adoption-only, no rental, narrow dog pool'],
];

const ia = [
  { name: 'Browse dogs', items: ['Filter & search', 'Dog profile', 'Shelter profile'] },
  { name: 'Book a walk', items: ['Slot picker', 'ID / KYC', 'Payment'] },
  { name: 'Active walk', items: ['Live timer + map', 'Care tips / SOS', 'Drop-off & rating'] },
  { name: 'Gift store', items: ['Browse items', 'Gift to a dog', 'Order tracking'] },
  { name: 'Adoption', items: ['Readiness quiz', 'Application', 'Status tracker'] },
  { name: 'My account', items: ['Rental history', 'Saved dogs', 'Payments'] },
];

const flows: [string, string[]][] = [
  ['Book a walk', ['Open app', 'Browse & filter', 'Dog profile', 'Pick slot', 'ID + pay', 'Confirmed']],
  ['Gift a dog', ['Post drop-off', 'Tap “Gift”', 'Browse store', 'Add note', 'Checkout', 'Shelter notified']],
  ['Adopt the dog', ['Tap “Adopt”', 'Readiness quiz', 'Application', 'Home check', 'Sign & pay', 'Dog goes home']],
];

const principles = [
  ['01', 'Show, don\u2019t promise', 'Every trust claim — temperament, vet status, safety — is backed by a visible record on the dog\u2019s profile, not a marketing badge.'],
  ['02', 'Ask at the peak, not the start', 'Adoption and gifting prompts are timed to the post-walk emotional high, not pushed early before the bond has formed.'],
  ['03', 'Light for the shelter, guided for the renter', 'QR check-in, auto care cards and minimal data entry reduce shelter staff effort while giving first-time renters enough structure.'],
  ['04', 'Make the deposit feel safe, not scary', 'Refund terms and cancellation policy are shown inline at the moment of payment — never buried in T&Cs.'],
];

const onboarding = [
  ['O1', 'Value prop', '3 swipe slides explaining the entire app in 30 seconds: borrow, gift, adopt.'],
  ['O2', 'Sign up', 'Phone OTP + Google sign-in only — lowest possible friction, matches Swiggy / Zomato patterns.'],
  ['O3', 'Name + photo', 'First name only, used for “Hi Riya 👋”. Photo optional.'],
  ['O4', 'Location', 'Warm framing before the OS prompt: “Which city are you in?”'],
  ['O5', 'Preference quiz', '2 questions that personalise the home feed and journey triggers.'],
  ['O6', 'ID verification', 'Framed as a safety measure, with a skip option reminded at booking.'],
  ['O7', 'All set', '“You’re ready, Riya! 🐾” — goes straight to home, no extra steps.'],
];

const tradeoffs = [
  { a: 'Simplification', b: 'Control', risk: 'Too much abstraction can frustrate cautious, detail-seeking users.', decision: 'Show the two trust moments — payment and drop-off — in full detail; keep everything else minimal.' },
  { a: 'Warm tone', b: 'Credibility', risk: 'A playful, emoji-forward voice could undercut trust in vet and safety claims.', decision: 'Keep safety data (vet checks, incident count) in plain factual language; reserve warmth for onboarding and post-walk copy.' },
  { a: 'Frictionless signup', b: 'Shelter liability', risk: 'Low-friction OTP signup reduces the ID/KYC step shelters need for accountability.', decision: 'Make ID verification a soft ask at signup, but a hard requirement before the first booking is confirmed.' },
  { a: 'Nudging adoption', b: 'Not feeling sold to', risk: 'A pushy adopt CTA right after drop-off could feel manipulative in an emotional moment.', decision: 'Frame it as a 2-minute readiness quiz, not a form — optional, reversible, low-pressure.' },
];

const kpis = [
  ['Walk-to-adoption conversion', 'How often a rental leads to an adoption application', '8–12%'],
  ['Repeat rental rate', 'Whether renters come back for the same or a different dog', '\u2265 35%'],
  ['Booking completion rate', 'Drop-off between browsing and confirmed booking', '\u2265 70%'],
  ['Gift conversion (post-walk)', 'Share of walks that end in a gift purchase', '15–20%'],
  ['Dog incident rate', 'Escapes, injuries or disputes per 100 walks', '< 1%'],
  ['Shelter onboarding time', 'Operational feasibility for new partner shelters', '< 2 weeks'],
];

const learnings = [
  ['Journey maps reveal non-obvious priorities', "The two trust dips — payment anxiety and post-walk separation — weren't obvious from conversations alone. Plotting emotion as a curve made them impossible to ignore."],
  ['Trust is a design problem, not a copy problem', "The refund policy builds trust because it's visible at the exact moment of anxiety, not because it uses the right words. Placement matters more than wording."],
  ['Timing a CTA matters as much as writing one', 'Putting “Adopt” on the drop-off screen, after the bond has formed, is the decision that makes it work — not the dog profile.'],
  ['Operations constrain design as much as users do', "Shelter staff can't absorb new admin load, so QR check-in and auto care cards were as much about their workflow as the renter's."],
  ['Proto-personas still need a validation plan', 'Naming that Riya and Arjun are built from secondary research, not validated interviews, is more credible than papering over it.'],
  ['Onboarding is UX, not just UI', "The preference quiz changes what each user sees on home — designing it as a data step that improves the core experience is a systems decision."],
];

const nextSteps = [
  ['Validate personas with 8–10 real interviews', 'A mix of past adopters, abandoned attempts and shelter volunteers to pressure-test these assumptions.'],
  ['Usability test the booking + drop-off flows', '5 people on the wireframe prototype, watching for hesitation at the two trust dips before moving to hi-fi.'],
  ['Build the hi-fi design system in Figma', 'Colour tokens, type scale and a component library before touching a single screen.'],
  ['Design all 26 screens in hi-fi', 'With particular attention on the dog profile, payment, active walk and drop-off screens.'],
  ['Prototype + a second round of usability tests', 'Wire up Book, Gift and Adopt in Figma and test with real users.'],
  ['Define liability + insurance with a pilot shelter', 'Work with a Mumbai / Pune NGO partner on deposits, incidents and QR check-in before build.'],
];

/* ---------- page ---------- */

export function WagoutCaseStudy() {
  const i = projects.findIndex((p) => p.slug === 'wagout');
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  return (
    <main className="page-in wg">
      {/* 00 HERO */}
      <section className="wg-hero">
        <div className="wg-container">
          <Link href="/" className="wg-back">← Back to work</Link>
          <div className="wg-hero-grid">
            <div>
              <p className="eyebrow">00 / UX case study — dog rental &amp; adoption platform</p>
              <h1>Wagout — Walk a shelter dog. <em>Fall for one.</em></h1>
              <p className="wg-hero-lede">An end-to-end UX case study for a mobile app that lets people in urban India spend a few hours walking a shelter dog — with adoption as the natural next step, not the first one.</p>
            </div>
            <dl className="wg-meta">
              <div><dt>Role</dt><dd>UX / UI Designer · Solo project</dd></div>
              <div><dt>Duration</dt><dd>4 weeks</dd></div>
              <div><dt>Tools</dt><dd>Figma · Miro · Lovable </dd></div>
              <div><dt>Platform</dt><dd>Mobile app · Android &amp; iOS</dd></div>
            </dl>
          </div>

           <div className="wg-hero-video">
            <video
              src={A('walkthrough.mp4')}
              poster={A('wagout.png')}
              controls
              playsInline
              muted
              preload="metadata"
              data-testid="video-wagout-walkthrough"
            >
              Your browser doesn't support embedded video. <a href={A('walkthrough.mp4')}>Download the walkthrough</a> instead.
            </video>
            <span className="wg-hero-video-caption">Full end-to-end walkthrough — browse, book, walk, drop-off, adopt</span>
          </div>

        </div>
      </section>

      {/* 01 PROBLEM */}
      <Section index="01" kicker="Problem space" id="problem" title={<>Adoption is<br />all-or-nothing.</>}>
        <p className="wg-body">India has roughly 69 million homeless dogs, yet most people who'd love one never adopt — not because they don't want to, but because adopting feels like a permanent, high-stakes decision made before they've spent any real time with the animal.</p>
        <p className="wg-body">There's no accepted middle step. You either adopt, or you don't engage with shelters at all.</p>
        <p className="wg-quote">“I'd love a dog, but what if I can't handle it? I don't want to commit and then give it back — that feels worse than not trying.”</p>
        <div className="wg-statement">
          <Tag variant="moss">Problem statement</Tag>
          <p>First-time urban Indian pet seekers want to give a shelter dog a home, but the current adoption process asks for a permanent decision before they've spent any real time with the animal — causing hesitation and abandoned adoption attempts.</p>
        </div>
        <p className="wg-pull">Wagout's hypothesis: lower the first commitment to a few hours, and the jump to adoption becomes natural, not scary.</p>
      </Section>

      {/* 02 MARKET */}
      <Section index="02" kicker="Market context" id="market" title={<>Why India,<br />why now.</>}
        lede="The pet adoption category is growing fast in India, but the booking and trust infrastructure hasn't caught up.">
        <div className="wg-stats">
          {marketStats.map(([n, d, src]) => (
            <div className="wg-stat" key={n}>
              <strong>{n}</strong>
              <span>{d}</span>
              <small>Source: {src}</small>
            </div>
          ))}
        </div>
        <p className="wg-body">Maharashtra leads India in adoption activity, backed by an established shelter network and increasingly pet-friendly housing — making Mumbai and Pune the target pilot market.</p>
      </Section>

      {/* 03 RESEARCH */}
      <Section index="03" kicker="Research" id="research" title={<>Four ways<br />in.</>}
        lede="Secondary research, informal user conversations, and stakeholder framing interviews with shelter volunteers.">
        <div className="wg-methods">
          {methods.map(([n, t, d]) => (
            <div className="wg-card wg-method" key={n}><span className="wg-method-n">METHOD {n}</span><h3>{t}</h3><p>{d}</p></div>
          ))}
        </div>
        <div className="wg-callout"><strong>Research honesty note:</strong> these are proto-personas built from secondary research and informal conversations, not a large-scale validated study — intended to align design decisions, with a clear flag to validate with real renters and shelter staff before build.</div>
      </Section>

      {/* 04 INSIGHTS */}
      <Section index="04" kicker="Key findings" id="insights" title={<>Five insights<br />that shaped the design.</>}>
        <div className="wg-insights">
          {insights.map(([n, t, d, wide]) => (
            <div className={`wg-card wg-insight ${wide ? 'wg-insight--wide' : ''}`} key={n as string}>
              <span className="wg-method-n">INSIGHT {n}</span><h3>{t}</h3><p>{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 05 PERSONAS */}
      <Section index="05" kicker="User personas" id="personas" title={<>Who we're<br />designing for.</>}
        lede="Two proto-personas representing the most common motivations: testing compatibility, and trialling family readiness.">
        <div className="wg-personas">
          <div className="wg-persona">
            <div className="wg-persona-head">
              <div className="wg-persona-avatar">RM</div>
              <div><div className="wg-persona-name">Riya Mehta</div><div className="wg-persona-meta">28 · Marketing exec · Pune</div></div>
            </div>
            <div className="wg-persona-body">
              <p className="wg-persona-quote">“I love dogs but my apartment, my job, my travel — I just can't commit to one yet.”</p>
              <p className="wg-plabel">Goals</p>
              <ul className="wg-plist">
                <li>Get regular dog time without long-term commitment</li>
                <li>Test compatibility before deciding to adopt</li>
                <li>Feel she's doing something good for a shelter dog</li>
              </ul>
              <p className="wg-plabel">Frustrations</p>
              <ul className="wg-plist wg-plist--frustration">
                <li>Shelters have rigid visiting hours, no online booking</li>
                <li>No way to know a dog's temperament before meeting it</li>
              </ul>
            </div>
          </div>
          <div className="wg-persona">
            <div className="wg-persona-head">
              <div className="wg-persona-avatar wg-persona-avatar--b">AK</div>
              <div><div className="wg-persona-name">Arjun Kulkarni</div><div className="wg-persona-meta">34 · Father of two · Mumbai</div></div>
            </div>
            <div className="wg-persona-body">
              <p className="wg-persona-quote">“My kids keep begging for a dog. I want to see how we'd actually manage one first.”</p>
              <p className="wg-plabel">Goals</p>
              <ul className="wg-plist">
                <li>Give his kids a safe, supervised dog experience</li>
                <li>Find a calm, family-friendly breed match</li>
              </ul>
              <p className="wg-plabel">Frustrations</p>
              <ul className="wg-plist wg-plist--frustration">
                <li>Doesn't know which dogs are good with children</li>
                <li>No trusted, structured way to “trial” pet ownership</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* 06 EMPATHY + JOURNEY */}
      <Section index="06" kicker="Journey mapping" id="journey" title={<>Two trust dips<br />shaped everything.</>}
        lede="Riya's first Wagout rental, mapped across actions, thoughts, emotion and design opportunity.">
        <div className="wg-scroll">
          <table className="wg-journey" role="table">
            <thead><tr><th></th>{journeyStages.map((s) => <th key={s}>{s}</th>)}</tr></thead>
            <tbody>
              {journey.map(([label, cells]) => (
                <tr key={label as string}>
                  <td className="wg-j-label">{label}</td>
                  {(cells as string[]).map((c, i) => (
                    <td key={i} className={label === 'Opportunity' ? 'wg-opp' : ''}>
                      {label === 'Feeling' ? <span className={`wg-feel ${c.includes('dip') ? 'wg-feel--dip' : (i === 3 || i === 5) ? 'wg-feel--peak' : ''}`}>{c}</span> : c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="wg-callout"><strong>Key insight:</strong> confidence dips right before payment (deposit anxiety) and right after drop-off (separation, “did I do enough?”). These two screens received the deepest design attention and drive the four principles below.</div>

        <h3 className="wg-subhead">Pain → opportunity</h3>
        <div className="wg-scroll">
          <table className="wg-journey" role="table">
            <thead><tr><th>Says</th><th>Thinks</th><th>Feels</th><th>Design opportunity</th></tr></thead>
            <tbody>
              {empathy.map((row) => (
                <tr key={row[0]}>
                  <td>{row[0]}</td><td>{row[1]}</td><td><span className="wg-feel">{row[2]}</span></td><td className="wg-opp">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 07 COMPETITIVE */}
      <Section index="07" kicker="Competitive analysis" id="competitive" title={<>Where Wagout<br />sits.</>}
        lede="Global dog-walking apps assume ownership. Indian adoption channels assume full commitment. Wagout's white space is the step in between.">
        <table className="wg-comp">
          <thead><tr><th>Player</th><th>Core model</th><th>Gap Wagout fills</th></tr></thead>
          <tbody>
            {competitors.map((c) => <tr key={c[0]}><td><strong>{c[0]}</strong></td><td>{c[1]}</td><td>{c[2]}</td></tr>)}
            <tr><td><strong>Wagout</strong></td><td>Time-boxed rental + gifting + guided adoption</td><td>—</td></tr>
          </tbody>
        </table>
      </Section>

      {/* 08 IA */}
      <Section index="08" kicker="Information architecture" id="ia" title={<>Six sections,<br />one goal each.</>}>
        <div className="wg-ia" role="group" aria-label="Wagout information architecture">
          <div className="wg-ia-root">Wagout</div>
          <ul className="wg-ia-cols">
            {ia.map((col) => (
              <li key={col.name} className="wg-ia-col">
                <h3>{col.name}</h3>
                <ul>{col.items.map((it) => <li key={it}>{it}</li>)}</ul>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 09 FLOWS */}
      <Section index="09" kicker="Core user flows" id="flows" title={<>Three flows,<br />one continuous story.</>}>
        {flows.map(([label, steps]) => (
          <div className="wg-flow" key={label}>
            <Tag>{label}</Tag>
            <ol className="wg-flow-steps">{steps.map((s) => <li key={s}>{s}</li>)}</ol>
          </div>
        ))}
      </Section>

      {/* 10 PRINCIPLES */}
      <Section index="10" kicker="Design principles" id="principles" title={<>Four rules<br />behind every screen.</>}>
        <div className="wg-principles">
          {principles.map(([n, t, d]) => (
            <div className="wg-principle" key={n}><span className="wg-principle-n">{n}</span><h3>{t}</h3><p>{d}</p></div>
          ))}
        </div>
      </Section>

      {/* 11 ONBOARDING */}
      <Section index="11" kicker="Onboarding" id="onboarding" title={<>Seven screens<br />to earn trust first.</>}
        lede="Renting a dog is a new concept, so onboarding explains the app, builds trust and personalises the experience before showing a single dog.">
        <div className="wg-onb">
          {onboarding.map(([n, t, d]) => (
            <div className="wg-onb-step" key={n}><Tag>{n}</Tag><h4>{t}</h4><p>{d}</p></div>
          ))}
          <div className="wg-onb-full">Splash → Value prop → Sign up → Name → Location → Preferences → ID verify → Home</div>
        </div>
      </Section>

      {/* 12 SCREENS — Home & Browse */}
      <Section index="12" kicker="01 // Browse & discover" id="screens-browse" title={<>Filter by feeling,<br />not by breed sheet.</>}
        lede="The home screen leads with a search built for how people actually describe what they want, and resource cards that surface trust signals — walk count, vet status — before a single tap.">
        <div className="wg-shots">
          <div className="wg-shot"><div className="wg-phone"><ScreenHome /></div><span className="wg-shot-label"><strong>Home & browse</strong>Search, filters, dog cards</span></div>
          <div className="wg-shot"><div className="wg-phone"><ScreenProfile /></div><span className="wg-shot-label"><strong>Dog profile</strong>Temperament, vet record, CTA</span></div>
        </div>
      </Section>

      {/* 13 SCREENS — Booking */}
      <Section index="13" kicker="02 // Booking & payment" id="screens-booking" title={<>The deposit,<br />made to feel safe.</>}
        lede="This is trust dip one. Refund terms and “what if something goes wrong” sit inline at the moment of payment — not behind a terms-and-conditions link.">
        <div className="wg-shots">
          <div className="wg-shot"><div className="wg-phone"><ScreenBooking /></div><span className="wg-shot-label"><strong>Booking & payment</strong>Slot, itemised price, refund policy</span></div>
          {/* <Shot src={A('kyc.png')} file="kyc.png" alt="Wagout ID verification screen" /> */}
        </div>
      </Section>

      {/* 14 SCREENS — Active walk & drop-off */}
      <Section index="14" kicker="03 // Walk & drop-off" id="screens-walk" title={<>Time remaining,<br />not time elapsed.</>}
        lede="A countdown reframes the walk around what's left to enjoy. Drop-off is trust dip two — and the emotional peak — so it carries the gift and adopt prompts, timed to arrive after the bond has formed.">
        <div className="wg-shots">
          <div className="wg-shot"><div className="wg-phone"><ScreenWalk /></div><span className="wg-shot-label"><strong>Active walk</strong>Live timer, map, SOS</span></div>
          <div className="wg-shot"><div className="wg-phone"><ScreenDropoff /></div><span className="wg-shot-label"><strong>Drop-off</strong>Rating, gift & adopt prompts</span></div>
        </div>
      </Section>

      {/* 15 SCREENS — Gift & Adopt */}
      <Section index="15" kicker="04 // Gift & adopt" id="screens-adopt" title={<>From “still deciding”<br />to “dog goes home.”</>}
        lede="The readiness quiz reframes the adoption application as a low-pressure, reversible next step rather than a binding form.">
        <div className="wg-shots">
          <div className="wg-shot"><div className="wg-phone"><ScreenAdopt /></div><span className="wg-shot-label"><strong>Adoption readiness</strong>Quiz, not a form</span></div>
          {/* <Shot src={A('gift-store.png')} file="gift-store.png" alt="Wagout gift store screen" />
          <Shot src={A('order-confirmation.png')} file="order-confirmation.png" alt="Wagout gift order confirmation" />
          <Shot src={A('status-tracker.png')} file="status-tracker.png" alt="Wagout adoption status tracker" /> */}
        </div>
        <p className="wg-note"><Tag>Note</Tag> The six screens above are hi-fi illustrations built for this case study from the app's real flows. The remaining screens of the 26-screen set — shelter side, account, settings — use this same <code>Shot</code> pattern: drop your Figma exports into <code>/assets/work/wagout/</code> and they'll render automatically.</p>
      </Section>

      {/* 16 DESIGN SYSTEM */}
      <Section index="16" kicker="Design system" id="system" title={<>Warm, not cute.<br />Calm, not clinical.</>}
        lede="Moss green and warm amber carry the brand's balance of shelter credibility and playful warmth; every colour pairing was checked against the trust-first tone the research called for.">
        <div className="wg-ds-grid">
          <div className="wg-card">
            <h3>Typography</h3>
            <p className="wg-type-serif" style={{ marginTop: 10 }}>Outfit — headlines</p>
            <p className="wg-type-sans">Inter — interface and body</p>
            <p className="wg-type-mono">JetBrains Mono — labels and data</p>
          </div>
          <div className="wg-card">
            <h3>Colour</h3>
            <ul className="wg-swatches">
              {[['Moss', C.moss], ['Amber', C.amber], ['Coral', C.coral], ['Sand', C.bg], ['Ink', C.ink], ['Border', C.border]].map(([n, v]) => (
                <li key={n as string}><span style={{ background: v }} /><small>{n}</small></li>
              ))}
            </ul>
          </div>
          <div className="wg-card">
            <h3>Components</h3>
            <div className="wg-row">
              <span className="wg-btn">Primary</span>
              <span className="wg-btn wg-btn-moss">Secondary</span>
              <span className="wg-btn wg-btn-ghost">Ghost</span>
            </div>
            <div className="wg-timer-chip">1:47:12</div>
          </div>
        </div>
      </Section>

      {/* 17 TRADE-OFFS */}
      <Section index="17" kicker="Key design trade-offs" id="tradeoffs" title={<>What I gave up,<br />and why.</>}>
        <div className="wg-two">
          {tradeoffs.map((t, n) => (
            <div className="wg-card" key={t.a}>
              <span className="eyebrow">Trade-off {String(n + 1).padStart(2, '0')}</span>
              <h3 style={{ fontFamily: 'var(--app-font-serif)', fontSize: 22, textTransform: 'none', letterSpacing: '-.02em', marginTop: 10 }}>{t.a} <span style={{ color: 'hsl(var(--amber))' }}>↔</span> {t.b}</h3>
              <p>{t.risk}</p>
              <p style={{ color: 'hsl(var(--foreground))', marginTop: 10, borderTop: '1px solid hsl(var(--border))', paddingTop: 10 }}><strong>Decision:</strong> {t.decision}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 18 OUTCOMES */}
      <Section index="18" kicker="Success metrics" id="outcomes" title={<>How I'd measure<br />success.</>}
        lede="Target KPIs for a 90-day pilot with one partner shelter.">
        <table className="wg-kpi">
          <thead><tr><th>Metric</th><th>What it tells us</th><th>Target</th></tr></thead>
          <tbody>{kpis.map((k) => <tr key={k[0]}><td>{k[0]}</td><td>{k[1]}</td><td>{k[2]}</td></tr>)}</tbody>
        </table>
      </Section>

      {/* 19 REFLECTION */}
      <Section index="19" kicker="Reflection" id="reflection" title={<>What I learned.</>}>
        <div className="wg-learnings">
          {learnings.map(([t, d]) => (
            <div key={t as string}><h4>{t}</h4><p>{d}</p></div>
          ))}
        </div>
      </Section>

      {/* 20 NEXT STEPS */}
      <Section index="20" kicker="Next steps" id="next" title={<>What comes next.</>}>
        <ol className="wg-steps">
          {nextSteps.map(([t, d], n) => (
            <li key={t}><span className="wg-step-n">{n + 1}</span><div><strong>{t}</strong><span>{d}</span></div></li>
          ))}
        </ol>
      </Section>

      {/* 21 SUMMARY */}
      <section className="wg-summary">
        <div className="wg-container">
          <div className="wg-summary-card">
            <h2>Wagout</h2>
            <p className="wg-summary-line">Rent a shelter dog for a walk. Fall for one. Take it home.</p>
            <dl className="wg-meta wg-meta-row">
              <div><dt>Role</dt><dd>UX / UI Designer · Solo project</dd></div>
              <div><dt>Duration</dt><dd>4 weeks</dd></div>
              <div><dt>Scope</dt><dd>Research · IA · Flows · UI · Design system</dd></div>
              <div><dt>Platform</dt><dd>Mobile · Android &amp; iOS</dd></div>
            </dl>
          </div>
          <nav className="wg-pn" aria-label="Project navigation">
            <Link href={`/work/${prev.slug}`} className="wg-pn-link"><span className="eyebrow">← Previous project</span><strong>{prev.cardTitle}</strong></Link>
            <Link href={`/work/${next.slug}`} className="wg-pn-link wg-pn-next"><span className="eyebrow">Next project →</span><strong>{next.cardTitle}</strong></Link>
          </nav>
        </div>
      </section>
    </main>
  );
}