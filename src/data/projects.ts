export type Project = {
  slug: string;
  number: string;
  title: string;
  cardTitle: string;
  tag: string;
  year: string;
  role: string;
  intro: string;
  problem: string;
  approach: string;
  outcome: string;
  accent: 'cobalt' | 'teal' | 'saffron' | 'ink';
  image?: string;
  externalUrl: string;
};

export const projects: Project[] = [
  {
  slug: 'skiff',
  number: '01',
  title: 'Skiff',
  cardTitle: 'Skiff',
  tag: 'Cloud hosting / product design',
  year: '2024',
  role: 'Product Designer · UX/UI',
  intro: 'Making cloud hosting feel less technical, without removing the power underneath.',
  problem: 'Cloud interfaces often expose infrastructure detail before users know what they need.',
  approach: 'Start from the goal, use sensible presets, and keep advanced configuration behind progressive disclosure.',
  outcome: 'A conceptual exploration. Its assumptions are framed as hypotheses to validate.',
  accent: 'cobalt',
  image: '/assets/work/Skiff.svg',
  externalUrl: 'https://github.com/shreya27-dev/portfolio-deploy',
},
  {
    slug: 'doctor-booking',
    number: '02',
    title: 'Find the right doctor',
    cardTitle: 'Doctor booking',
    tag: 'Mobile product / healthcare',
    year: '2026',
    role: 'UX & UI, end to end',
    intro: 'Helping people move from “something hurts” to a confident, booked appointment.',
    problem: 'People can struggle to identify the right specialist, compare doctors, understand fees and find a suitable slot before they can even book.',
    approach: 'I made the user’s problem the front door: search in plain language, resolve the likely specialist, surface relevant doctors, expose decision-making details and place family booking inside the final flow.',
    outcome: 'A focused appointment journey that reduces uncertainty one decision at a time — from problem to specialist to doctor to slot to confirmation.',
    accent: 'teal',
    image: '/assets/work/doctor-booking/doctor_cover_page.png',
    externalUrl: 'https://github.com/shreya27-dev/portfolio-shreya',
  },
  {
    slug: 'wagout',
    number: '03',
    title: 'Wagout',
    cardTitle: 'Wagout',
    tag: 'Dog rental & adoption / mobile app',
    year: '2026',
    role: 'UX/UI Designer · Solo project',
    intro: 'One walk could change two lives',
    problem: 'Adoption in India is treated as an all-or-nothing decision — there\u2019s no low-stakes way to spend real time with a dog before committing to years of care.',
    approach: 'Reframe adoption as a journey, not a form: let people book a few hours with a shelter dog first, then time the adopt and gift prompts to the emotional peak right after drop-off, not before.',
    outcome: 'A 26-screen mobile case study spanning research, IA, three core flows and a hi-fi design system, with two identified trust dips shaping every major screen.',
    accent: 'ink',
    image: '/assets/work/wagout/wagout.png',
    externalUrl: 'https://github.com/shreya27-dev/wagout-dog-walks',
  },
];

export const getProject = (slug?: string) => projects.find((project) => project.slug === slug);