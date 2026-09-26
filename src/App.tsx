import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';
import { Link, Route, Switch, useLocation, useParams } from 'wouter';
import { HeroIllustration } from './components/HeroIllustration';
import { Reveal, RevealGroup, RevealItem } from './components/Reveal';
import { getProject, projects, type Project } from './data/projects';
import { SkiffCaseStudy } from './case-studies/Skiff/SkiffCaseStudy';
import { WagoutCaseStudy } from './case-studies/Wagout/Wagout';
import { CustomCursor } from './components/CustomCursor';
import { ResumeModal } from './components/ResumeModal';

function Header() {
  const [location] = useLocation();
  const reducedMotion = useReducedMotion();
  return (
    <header className="site-header" data-testid="site-header">
      <Link href="/" className="brand-cell" data-testid="link-home">
        <motion.span
          className="brand-mark"
          aria-hidden="true"
          animate={reducedMotion ? undefined : { rotate: [0, 3, -2, 0] }}
          whileHover={reducedMotion ? undefined : { rotate: -8, y: -1 }}
          transition={reducedMotion ? undefined : { duration: 5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
        />
        <span className="brand-name">Shreya / UI UX designer</span>
      </Link>
      <Link href="/" className={`nav-cell magnetic-link ${location === '/' ? 'active' : ''}`} data-testid="link-work">Home</Link>
      <Link href="/about" className={`nav-cell magnetic-link ${location === '/about' ? 'active' : ''}`} data-testid="link-about">About</Link>
      {/* <Link href="/playground" className={`nav-cell magnetic-link ${location === '/playground' ? 'active' : ''}`} data-testid="link-playground">Playground</Link> */}
      <a href="mailto:golatkarshreyax@gmail.com" className="nav-cell magnetic-link" data-testid="link-contact">Say hello</a>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer" data-testid="site-footer">
      <Reveal>
        <div className="eyebrow" style={{ color: 'hsl(var(--primary-foreground) / .72)' }}>A note before you go</div>
        <h2>Let’s make<br /><em>something useful.</em></h2>
      </Reveal>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Shreya — designed with attention</span>
        <div className="footer-links">
           <a className="magnetic-link" href="mailto:golarkarshreyax@gmail.com" data-testid="link-footer-email">Email</a>
           <a className="magnetic-link" href="https://www.linkedin.com/in/shreya-golatkar-783b38240/" target="_blank" rel="noreferrer" data-testid="link-footer-linkedin">LinkedIn</a>
           {/* <a className="magnetic-link" href="https://github.com/shreya27-dev/portfolio-deploy" target="_blank" rel="noreferrer" data-testid="link-footer-github">GitHub</a> */}
        </div>
      </div>
    </footer>
  );
}

function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }, [location]);
  return (
  <div className="portfolio-shell noise">
    <CustomCursor/>
    <Header />{children}<Footer /></div>

  );
}

function ArrowLink({ project }: { project: Project }) {
  return (
    <a href={project.externalUrl} target="_blank" rel="noreferrer" className="arrow-link magnetic-link" data-testid={`link-project-${project.slug}`}>
      Open source / project
    </a>
  );
}

function ProjectArt({ project }: { project: Project }) {
  if (!project.image) {
    return (
      <div className="lab-shapes" aria-label={`${project.title} preview coming soon`} data-testid="graphic-placeholder">
        <span className="lab-label">{project.title}</span>
      </div>
    );
  }
  return (
    <div className="art-frame" data-testid={`image-frame-${project.slug}`}>
      <img src={project.image} alt={`${project.title} project preview`} data-testid={`img-project-${project.slug}`} />
    </div>
  );
}

function Home() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const noteY = useTransform(scrollYProgress, [0.08, 0.32], [0, reducedMotion ? 0 : -22]);
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0.28]);
  return (
    <main className="page-in">
      <section className="hero-home" data-testid="home-hero">
        <div className="hero-kicker">
          <Reveal><span className="eyebrow">UI UX designer & Developer<br />currently in Mumbai / India</span></Reveal>
          <Reveal delay={0.08}><span className="eyebrow">Selected work<br />2022—2026</span></Reveal>
        </div>
        <div className="hero-copy">
          <Reveal delay={0.12}><h1 className="display-title">Shreya makes<br /><em>products</em> feel<br />inevitable.</h1></Reveal>
          <Reveal delay={0.22}><p>I design clear, characterful digital experiences for people who have better things to do than figure out an interface.</p></Reveal>
        </div>
        <HeroIllustration />
         <Reveal delay={0.35}>
           <motion.div
             className="scribble"
             style={{ opacity: reducedMotion ? 1 : scrollCueOpacity }}
             whileHover={reducedMotion ? undefined : { x: 5, rotate: -4 }}
             aria-hidden="true"
           >
             <span className="scribble-dot" />scroll, there’s more
           </motion.div>
         </Reveal>
      </section>

      <section className="section-wrap" aria-labelledby="work-heading">
        <Reveal className="hairline"><span aria-hidden="true" /></Reveal>
        <Reveal className="project-meta-strip" delay={0.08} style={{ padding: '25px 0 30px', display: 'flex', justifyContent: 'space-between' }}>
          <span id="work-heading" className="eyebrow">Selected work</span>
          <span className="eyebrow">{projects.length.toString().padStart(2, '0')} projects</span>
        </Reveal>
        <div className="work-index">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
              whileHover={reducedMotion ? undefined : { y: -4 }}
            >
              <Link
                href={`/work/${project.slug}`}
                className="project-card"
                data-testid={`card-project-${project.slug}`}
              >
                <div className="project-meta">
                  <span className="eyebrow">{project.number} / {project.tag}</span>
                  <span className="eyebrow">{project.year}</span>
                </div>
                <div>
                  <h2 className="project-title">{project.cardTitle}</h2>
                  <p className="project-desc">{project.intro}</p>
                </div>
                <div className="project-art"><ProjectArt project={project} /></div>
                 <span className="arrow-link">Read case study</span>
                 <span className="project-peek" aria-hidden="true">peek <span>↗</span></span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-wrap">
        <motion.div className="home-note" style={{ y: noteY }} data-testid="home-note">
          <Reveal><span className="eyebrow">The short version</span></Reveal>
          <Reveal delay={0.1}>
            <div>
              <h2>Good design is<br /><em>clear thinking</em><br />with a pulse.</h2>
              <p>My sweet spot is the moment a complicated thing becomes obvious — without becoming boring. I bring strategy, systems and a slightly unreasonable love of detail.</p>
            </div>
          </Reveal>
        </motion.div>
      </section>
    </main>
  );
}

function About() {
  const [resumeOpen, setResumeOpen] = useState(false);
  return (
    <main className="page-in">
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
      <section className="about-hero">
        <Reveal>
          <div className="about-copy">
            <span className="about-badge">
              <img src="/images/Shreya.png" alt="It's Shreya illustration" />
            </span>
            <span className="eyebrow">A little context</span>
            <h1>Hi, I'm<br /><em>Shreya.</em></h1>
            <div className="about-intro">
              <p><strong>I'm a product designer who likes to get close to the problem.</strong></p>
              <p>I work across interaction, visual systems and the messy middle where a good idea becomes a thing people can actually use. Before design, I was the kid who rearranged the furniture in every room.</p>
            </div>
            <div className="about-sticker">curious<br />by default</div>
            <span className="about-dot" aria-hidden="true" />
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="about-photos">
            <div className="about-photo about-photo-main">
              <span className="about-photo-label">
                <img src="/images/Portrait-Photo.png" alt="Shreya's Life" />
              </span>
            </div>
            <div className="about-photo about-photo-sub">
              <span className="about-photo-label">
                <img src="/images/photo-1.jpeg" alt="Shreya's Life" />
              </span>
            </div>
            <div className="about-photo about-photo-sub">
              <span className="about-photo-label">
                <img src="/images/photo-2.jpeg" alt="Shreya's Life" />
              </span>
            </div>
          </div>
        </Reveal>
      </section>
      
      <Reveal className="experience" ariaLabelledBy="experience-heading">
        <div className="experience-head">
          <span id="experience-heading" className="eyebrow">Experience</span>
          <button className="arrow-link" onClick={() => setResumeOpen(true)} data-testid="link-resume">View my resume</button>
        </div>
        <div className="experience-row"><span>UI UX Designer & Angular Dev</span><span>Kemar Port Automation</span><span>2026—Present</span></div>
        <div className="experience-row"><span>UI UX Designer & Developer</span><span>Mahity Systems Ltd.</span><span>2024—2026</span></div>
      </Reveal>

      <RevealGroup className="about-grid">
        <RevealItem>
          <div className="about-block">
            <span className="eyebrow">How I work</span>
            <h2>Make it<br /><em>legible.</em></h2>
            <p>I ask a lot of “why” questions, prototype earlier than feels comfortable, and care about the last 10% as much as the first spark. Good collaboration should make the work sharper and the room lighter.</p>
          </div>
        </RevealItem>
        <RevealItem>
          <div className="about-block">
            <span className="eyebrow">Outside the frame</span>
            <h2>Collecting<br /><em>references.</em></h2>
            <p>Films with excellent title sequences, Indian packaging, tiny museums, long walks, and recipes that are mostly instructions to trust your instincts.</p>
          </div>
        </RevealItem>
      </RevealGroup>
    </main>
  );
}


function Playground() {
  return (
    <main className="page-in">
      <section className="case-hero" style={{ paddingBottom: 48 }}>
        <Reveal>
          <span className="eyebrow">Just for fun</span>
          <h1 className="case-title">Playground.</h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="case-lede">Small interaction studies and motion experiments — the stuff I build on weekends, mostly to answer "what if this felt different?"</p>
        </Reveal>
      </section>

      <section className="section-wrap">
        <RevealGroup className="playground-grid">
          <RevealItem>
            <div className="playground-card">
              <div className="playground-video-frame">
                <video
                  src="/public/videos/interaction-animations.mp4"
                  poster="/public/images/interaction-animations-poster.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  data-testid="video-playground-noure"
                />
              </div>
              <div className="playground-card-meta">
                <span className="eyebrow">Micro-interaction / Coffee brand</span>
                <h2>Noure, <em>tap to taste.</em></h2>
                <p>A quick interaction study for a coffee brand concept — tapping the cup cycles through drinks, with the background, type and coffee beans all reacting in sync.</p>
              </div>
            </div>
          </RevealItem>
        </RevealGroup>
      </section>
    </main>
  );
}

function DoctorSection({
  index,
  kicker,
  title,
  lede,
  children,
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="doctor-section">
      <div className="doctor-container">
        <div className="doctor-section-grid">
          <div className="doctor-section-heading">
            <p className="eyebrow">{index} / {kicker}</p>
            <h2>{title}</h2>
          </div>
          <div className="doctor-section-body">
            {lede ? <p className="doctor-lede">{lede}</p> : null}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function DoctorNote({ src, caption, className = '' }: { src: string; caption: string; className?: string }) {
  return (
    <figure className={`doctor-note ${className}`}>
      <div className="doctor-note-frame">
        <img src={src} alt={caption} loading="lazy" />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function DoctorPhone({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="doctor-phone">
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
}

function DoctorScreen({
  step,
  name,
  src,
  question,
  decisions,
  flip = false,
}: {
  step: string;
  name: string;
  src: string;
  question: string;
  decisions: string[];
  flip?: boolean;
}) {
  return (
    <div className={`doctor-screen ${flip ? 'doctor-screen-flip' : ''}`}>
      <div className="doctor-screen-image">
        <DoctorPhone src={src} alt={`${name} screen`} />
      </div>
      <div className="doctor-screen-copy">
        <p className="eyebrow">Screen {step}</p>
        <h3>{name}</h3>
        <p className="doctor-question">“{question}”</p>
        <ul>
          {decisions.map((decision) => (
            <li key={decision}>{decision}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DoctorCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="doctor-card">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

const doctorJourney = [
  ['Problem', 'Worried'],
  ['Search', 'Unsure'],
  ['Specialist', 'Curious'],
  ['Discover', 'Hopeful'],
  ['Compare', 'Evaluating'],
  ['Availability', 'Relieved'],
  ['Book', 'Confident'],
  ['Confirm', 'Reassured'],
];

const doctorTradeoffs = [
  ['Guidance', 'Simplicity', 'More guidance helps, but too much overwhelms. Guide progressively — one suggestion at the moment of doubt, not a questionnaire.'],
  ['More choice', 'Easier decisions', 'More doctors means more choice and more decision fatigue. Show a short, relevant list before offering filters.'],
  ['Transparency', 'Information overload', 'Detail builds trust, but a wall of it is unreadable. Essentials on the card, depth on the profile.'],
  ['Family booking', 'Core booking', 'Booking for a parent matters, but it is not the first job. It becomes one question inside the flow, not a separate mode.'],
];

function DoctorBookingCaseStudy({ project }: { project: Project }) {
  const img = (name: string) => `/assets/work/doctor-booking/${name}`;

  return (
    <main className="page-in doctor-case-study">
      <section className="doctor-hero">
        <div className="doctor-container">
          <Link href="/" className="doctor-back">← Back to work</Link>
          <div className="doctor-hero-grid">
            <div>
              <p className="eyebrow">02 / Product design — take-home case study</p>
              <h1>Find the right doctor.<br /><em>Book with confidence.</em></h1>
              <p className="doctor-hero-lede">A mobile app for booking appointments across hospitals and clinics. The hard part was never the booking — it was everything a worried person has to decide before they get there.</p>
            </div>
            <dl className="doctor-meta">
              <div><dt>Role</dt><dd>UX &amp; UI, end to end</dd></div>
              <div><dt>Year</dt><dd>2026</dd></div>
              <div><dt>Scope</dt><dd>Problem framing → flow → wireframes → high-fidelity screens</dd></div>
              <div><dt>Context</dt><dd>Design assignment, solo</dd></div>
            </dl>
          </div>

          <div className="doctor-hero-screens">
            <DoctorPhone src={img('Find Doctors.png')} alt="Find doctors home screen" />
            <DoctorPhone src={img('Search Results.png')} alt="Search results with specialist suggestion" />
            <DoctorPhone src={img('Doctors Profile.png')} alt="Doctor profile screen" />
            <DoctorPhone src={img('Booking Confirmed.png')} alt="Booking confirmed screen" />
          </div>
        </div>
      </section>

      <DoctorSection index="02" kicker="The brief" title={<>Six problems,<br />one sentence.</>} lede="I was asked to design a mobile app for booking appointments with doctors across multiple hospitals and clinics — for people who currently struggle at every step before the booking itself.">
        <div className="doctor-two-column">
          <DoctorCard title="What users struggle with" items={[
            'Finding the right doctor for their problem',
            'Understanding which specialist to choose',
            'Comparing doctors',
            'Finding available appointment slots',
            'Knowing consultation fees before booking',
            'Managing appointments for family members',
          ]} />
          <div className="doctor-highlight">
            <p>“Find the right doctor for my problem and book an appointment.”</p>
            <span>The whole assignment collapses into that one line: problem → specialist → doctor → slot → appointment.</span>
          </div>
        </div>
      </DoctorSection>

      <DoctorSection index="03" kicker="First thinking" title={<>Before pixels,<br />a notebook.</>} lede="I started by writing the problem out by hand — who this person is, what they are feeling, and what genuinely matters first. Ranking the six struggles was the most useful part of the project.">
        <div className="doctor-two-column">
          <DoctorNote src={img('1.jpeg')} caption="Goal, the six ideas from the brief, and a first priority ranking." />
          <DoctorNote src={img('2.jpeg')} caption="Who the user is emotionally, the main goal, and the first trade-off: guidance vs. overwhelm." />
        </div>
        <div className="doctor-three-column">
          <DoctorCard title="Highest priority" items={['Finding the right doctor for the right problem', 'Understanding which specialist to choose', 'Available slots', 'Transparent pricing']} />
          <DoctorCard title="Medium priority" items={['Comparing doctors']} />
          <DoctorCard title="Lower priority" items={['Booking for family members']} />
        </div>
        <div className="doctor-card doctor-user-card">
          <h3>The user, in five words</h3>
          {[
            ['Anxious', 'What if I choose the wrong doctor?'],
            ['Confused', 'Which specialist should I even see?'],
            ['Overwhelmed', 'There are too many choices.'],
            ['Price-conscious', 'How much will this cost me?'],
            ['Time-sensitive', 'Is there a slot when I need it?'],
          ].map(([mood, line]) => <div className="doctor-user-row" key={mood}><strong>{mood}</strong><span>{line}</span></div>)}
        </div>
        <DoctorNote src={img('3.jpeg')} caption="Assumptions I designed against: availability matters, fees must be known before booking, and family booking belongs inside the flow — not beside it." />
      </DoctorSection>

      <DoctorSection index="04" kicker="Storyboard" title={<>Dad’s knee,<br />eight frames.</>} lede="To keep the design honest I gave it a real situation: my dad mentions knee pain, and I have a phone in my hand. Every frame had to answer one question and hand over the next one.">
        <div className="doctor-two-column">
          <DoctorNote src={img('5.jpeg')} caption="Frames 1–4: the pain is mentioned, the phone comes out, “knee pain” is searched, and the app suggests an orthopaedist." />
          <DoctorNote src={img('6.jpeg')} caption="Frames 5–8: a slot for tomorrow, the booking is marked as “for dad”, confirmed, and shared." />
        </div>
        <div className="doctor-card">
          <h3>Emotional shift</h3>
          <div className="doctor-journey">
            {doctorJourney.map(([step, mood], i) => <div key={step}><span className="eyebrow">{String(i + 1).padStart(2, '0')}</span><strong>{step}</strong><small>{mood}</small></div>)}
          </div>
          <p className="doctor-pull">“Worried” to “reassured” is the actual product. Each screen only has to remove one piece of uncertainty.</p>
        </div>
      </DoctorSection>

      <DoctorSection index="05" kicker="Constraints & trade-offs" title={<>What the design<br />had to live with.</>} lede="Real conditions shaped this more than any aesthetic choice: slots expire, doctors practise in several places, and the people using it range from confident to nervous with a phone.">
        <div className="doctor-two-column">
          <DoctorCard title="Constraints" items={['Availability changes — a slot shown now may be gone later', 'Doctors practise at multiple locations', 'Users have very different levels of digital comfort', 'Booking may be for someone else', 'Medical jargon excludes people', 'The business wants completed bookings, without misleading anyone']} />
          <DoctorCard title="Core requirements" items={['Discover and compare suitable doctors', 'Availability treated as a first-class detail', 'Transparent pricing before commitment', 'Confident, unambiguous booking confirmation', 'Plain language over medical terminology', 'Fewer steps, more certainty per step']} />
        </div>
        <div className="doctor-two-column">
          {doctorTradeoffs.map(([a, b, text]) => <div className="doctor-card" key={a}><h3>{a} <span>↔</span> {b}</h3><p>{text}</p></div>)}
        </div>
        <DoctorNote src={img('4.jpeg')} caption="Requirements, constraints and the first full user flow — enter, search, describe, speciality, doctors, compare, availability, review, confirm." />
      </DoctorSection>

      <DoctorSection index="06" kicker="Wireframes" title={<>Structure<br />before style.</>} lede="Six low-fidelity frames to test the order of decisions: a big search bar as the front door, popular searches for the unsure, essentials on every doctor card, and “who is this for?” placed at the very end where it costs nothing.">
        <div className="doctor-three-column">
          <DoctorNote src={img('7.jpeg')} caption="Find doctors + results: search in the middle, popular searches underneath, doctors listed with fee and a clear action." />
          <DoctorNote src={img('8.jpeg')} caption="Doctor profile + booking: details, reviews, location, fees, availability — then “who is this appointment for?”" />
          <DoctorNote src={img('9.jpeg')} caption="Review booking + confirmation: a final readable summary, then a clear booked state with a way home." />
        </div>
      </DoctorSection>

      <section className="doctor-screens-section">
        <div className="doctor-container">
          <p className="eyebrow">07 / The screens</p>
          <h2>One journey, seven answers.</h2>
          <p className="doctor-lede">Each screen answers the question the previous one raised. No dead ends, no step that asks for something the person cannot know yet.</p>
          <div className="doctor-screen-list">
            <DoctorScreen step="01" name="Find doctors" src={img('Find Doctors.png')} question="Where do I even start?" decisions={['One large search field placed high and centre — the only thing asked of a worried person.', 'It accepts a problem in plain words, not a speciality name.', 'Popular searches sit underneath as a shortcut for common concerns and a hint about what to type.']} />
            <DoctorScreen step="02" name="Searching" src={img('searching.png')} question="Am I describing this right?" decisions={['Suggestions appear as the person types, so the app meets them halfway instead of returning nothing.', 'Symptom language and speciality language are both accepted and quietly reconciled.']} flip />
            <DoctorScreen step="03" name="Search results" src={img('Search Results.png')} question="Who can actually help with this?" decisions={['“Knee pain” resolves to an orthopaedist suggestion — the specialist question answered without a quiz.', 'Relevant doctors are listed immediately below, so understanding and acting happen on one screen.', 'Each card carries the essentials: experience, location, fee and availability.']} />
            <DoctorScreen step="04" name="Doctor profile" src={img('Doctors Profile.png')} question="Is this the right person, at the right price?" decisions={['Credentials, reviews and location up top; consultation fee stated plainly rather than revealed at checkout.', 'Available slots are shown on the profile, so choosing the doctor and choosing the time are one decision.']} flip />
            <DoctorScreen step="05" name="Appointment for" src={img('Appointment for_.png')} question="This one is for my dad." decisions={['Family booking is a single question at the point of booking — not a separate account mode or onboarding step.', 'Myself is the default; adding someone else takes one tap and a name.', 'It sits after the doctor is chosen, so the lower-priority need never slows down the high-priority one.']} />
            <DoctorScreen step="06" name="Review appointment" src={img('Review Appointment.png')} question="Have I got this right before I commit?" decisions={['Doctor, date, time, location, who it is for and total fee in one readable summary.', 'Anything editable is reachable from here, so the last step is a check rather than a leap.']} flip />
            <DoctorScreen step="07" name="Booking confirmed" src={img('Booking Confirmed.png')} question="It is actually done." decisions={['An unambiguous confirmed state — the emotional payoff the whole flow was building toward.', 'The details repeat here so the confirmation is shareable with the person it was booked for.']} />
          </div>
        </div>
      </section>

      <DoctorSection index="08" kicker="What I’d do next" title={<>Confidence is<br />the metric.</>} lede="Whether the flow works is easy to check. Whether it makes someone feel less anxious is the harder, more useful question.">
        <div className="doctor-two-column">
          <DoctorCard title="I’d test" items={['Does the specialist suggestion actually land as an answer, or get scrolled past?', 'Do people trust a doctor list they did not filter themselves?', 'Is the fee noticed before booking, or only at review?', 'Does “who is this for?” read as helpful or as an extra step?']} />
          <DoctorCard title="I’d design next" items={['Slot expiry and graceful recovery when availability changes mid-flow', 'Multiple locations for the same doctor, without cluttering the card', 'A light appointments view for managing bookings after the fact', 'Reschedule and cancel, which need the same calm as booking']} />
        </div>
        <div className="doctor-highlight doctor-final">
          <p>My goal was to make booking a doctor feel less confusing, less stressful, and more certain.</p>
          <span>The measure I care about is not whether someone completed the flow, but whether they could explain it to their dad five minutes later.</span>
        </div>
        <Link href="/" className="doctor-back doctor-final-link">Back to selected work ↗</Link>
      </DoctorSection>
    </main>
  );
}

function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProject(slug);

  if (!project) return <NotFound />;

  if (project.slug === 'doctor-booking') {
    return <DoctorBookingCaseStudy project={project} />;
  }

  if (project.slug === 'skiff') {
  return <SkiffCaseStudy />;
}

if (project.slug === 'wagout') {
  return <WagoutCaseStudy />;
}

  return (
    <main className="page-in">
      <section className="case-hero">
        <Reveal>
          <Link href="/" className="back-link" data-testid="link-back-work">
            ← Back to work
          </Link>
        </Reveal>

        <div className="case-grid">
          <Reveal>
            <span className="eyebrow">
              {project.number} / {project.tag}
            </span>

            <h1 className="case-title">
              {project.title}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="case-lede">
              {project.intro}
            </p>

            <div className="case-details">
              <div>
                <div className="case-detail-label">Role</div>
                <div className="case-detail-value">
                  {project.role}
                </div>
              </div>

              <div>
                <div className="case-detail-label">Year</div>
                <div className="case-detail-value">
                  {project.year}
                </div>
              </div>

              <div>
                <div className="case-detail-label">Status</div>
                <div className="case-detail-value">
                  Concept / assignment
                </div>
              </div>

              <div>
                <div className="case-detail-label">Project</div>
                <span className="case-detail-value">
                  Mobile experience
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div
            className={`case-image ${project.slug}`}
            data-testid={`hero-project-${project.slug}`}
          >
            <ProjectArt project={project} />
          </div>
        </Reveal>
      </section>

      <section className="case-content">
        <Reveal className="case-section">
          <div>
            <span className="eyebrow">01 / The why</span>
            <h2>
              Start with<br />
              <em>tension.</em>
            </h2>
          </div>

          <div>
            <p>{project.problem}</p>

            <p className="pull">
              “The user doesn't just need a booking.
              They need help making the right decision.”
            </p>
          </div>
        </Reveal>

        <Reveal className="case-section">
          <div>
            <span className="eyebrow">02 / The move</span>
            <h2>
              Turn the<br />
              <em>problem around.</em>
            </h2>
          </div>

          <div>
            <p>{project.approach}</p>
          </div>
        </Reveal>

        <Reveal className="case-section">
          <div>
            <span className="eyebrow">03 / What changed</span>
            <h2>
              Make the next<br />
              <em>step obvious.</em>
            </h2>
          </div>

          <div>
            <p>{project.outcome}</p>
          </div>
        </Reveal>

        <Reveal className="case-cta">
          <h2>
            Keep<br />
            <em>looking.</em>
          </h2>

          <Link
            href="/"
            className="case-button magnetic-link"
            data-testid="button-next-work"
          >
            Back to selected work ↗
          </Link>
        </Reveal>
      </section>
    </main>
  );
}

function NotFound() {
  return (
    <main className="page-in" style={{ minHeight: '60vh', padding: '14vw 6vw' }}>
      <span className="eyebrow">404 / wrong turn</span>
      <h1 className="case-title" style={{ marginTop: 35 }}>This page<br /><em>moved on.</em></h1>
      <Link href="/" className="arrow-link" style={{ marginTop: 45 }} data-testid="link-404-home">Take me back to work</Link>
    </main>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/playground" component={Playground} />
      <Route path="/work/:slug" component={CaseStudy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return <Layout><Router /></Layout>;
}

export default App;