// All site content lives here so it can be edited in one place.
// Copy mirrors the refreshed Simple Studio Webflow site (Oct 2026).

export const links = {
  booking: 'https://calendly.com/simplr-studio/30min',
  email: 'hi@simplr.studio',
  reel: 'https://www.youtube.com/watch?v=3WxrLCUxhd0',
  botanica: 'https://simplestudio.lemonsqueezy.com/checkout/buy/55c64bc5-dfdb-4999-af01-8de40566466f',
  prototype:
    'https://www.figma.com/proto/169BrrGqY3I61NtGmzjubi/Simple-Prototype?page-id=3%3A36&node-id=5%3A37&viewport=444%2C48%2C0.22&scaling=min-zoom&starting-point-node-id=5%3A37',
};

export const clients = ['Iconscout', 'Timeswape', 'ScallopX', 'Scallop', 'Metahome', 'Xlab', 'Paircode', 'pfpverse'];

export const services = [
  {
    id: 'product',
    title: 'Product design and strategy',
    body: 'We help startups turn complex, AI-powered products into experiences people instantly get. Simple to use, beautiful to look at, built to convert.',
    items: ['UI/UX design', 'Rapid prototyping', 'User research & testing', 'Post-launch optimisation'],
  },
  {
    id: 'motion',
    title: 'Motion graphics, films and explainers',
    body: "If it's not moving, it's dead. Motion and a good laugh drive reach and conversion, so we add both to your brand, with a bit of humour.",
    items: ['Explainer animation', 'Motion design', 'Comedy brand sketches', 'Launch films & ads'],
  },
  {
    id: 'brand',
    title: 'Digital branding and redesign',
    body: 'A great brand is half the launch. We help ambitious founders build brands with an edge that stands out in a crowded, AI-generated feed.',
    items: ['Logo & brand identity', 'Brand strategy', 'Rebranding', 'Social media branding'],
  },
];

// `art` picks a generative cover from src/art.js.
// Drop a real screenshot into /public/work and set `image` to use it instead.
export const work = [
  { name: 'pfpverse', url: 'https://pfpverse.world', tag: 'NFT collection', art: 'avatars', image: '',
    body: 'Custom-made, detail-crafted premium avatars designed to be your identity in the metaverse.' },
  { name: 'Surat.one', url: '', tag: 'Virtual city', art: 'city', image: '',
    body: 'A city-wide immersive experience where the people of Surat come together in a virtual city.' },
  { name: 'Khelaiya', url: '', tag: 'Learning app', art: 'garba', image: '',
    body: "Teaches Gujarat's folk dances, Garba and Dandiya, with illustrated, step-by-step guides." },
  { name: 'Xlab', url: '', tag: 'WebGL site', art: 'sphere', image: '',
    body: "A WebGL experience we designed and built end-to-end for a client's immersive design studio." },
  { name: 'Paircode.io', url: 'https://paircode.io', tag: 'Dev tool', art: 'code', image: '',
    body: 'Developers across the world building together with the power of pair programming.' },
  { name: 'Pixel Car', url: '', tag: 'Game', art: 'pixel', image: '',
    body: "The car of the '90s is back. Warning: you might remember your childhood." },
  { name: 'L.I.T.I', url: '', tag: 'Puzzle game', art: 'nodes', image: '',
    body: "You're a newborn hacker. Follow the system's rules, connect the nodes and hack the grid." },
  { name: 'Metahome.Land', url: '', tag: 'Website', art: 'arches', image: '',
    body: 'Futuristic websites for architecture consultancies, designed for the next generation of spaces.' },
  { name: 'Botanica', url: links.botanica, tag: 'Free resource', art: 'leaves', image: '',
    body: 'Let your designs touch some grass. A free design resource, featured on Product Hunt.' },
];

export const process = [
  { title: 'Research & discovery', body: 'First, we gather everything we need from you to get a crystal-clear picture of your vision and what you want to build.' },
  { title: 'Discuss & ideate', body: 'We brainstorm as a team, build ideas and moodboards, and align with you on the direction before a single pixel moves.' },
  { title: 'Execution', body: 'Each specialist works in their craft (UI, 3D, motion, Webflow) and we bring it all together into one polished masterpiece.' },
  { title: 'Delivery & revisions', body: "We share the results with you. Not in love yet? We keep revising until you are." },
];

export const plans = [
  {
    name: 'Design + Webflow',
    for: 'For startups with everyday design needs.',
    items: ['Brand & logo design', 'Landing pages & websites', 'Unlimited requests', 'Unlimited revisions', 'Unlimited stock images', 'Figma source file access', 'Front-end development in Webflow', 'Ongoing support and maintenance'],
    featured: false,
  },
  {
    name: 'Design + Webflow + 3D + Motion',
    for: 'For teams who want 3D and motion to make their product unforgettable.',
    items: ['Everything in Design + Webflow', '3D illustrations', '3D illustration animations', 'Up to 5-second micro trailers for your big launches', 'Unlimited revisions'],
    featured: true,
  },
  {
    name: 'Enterprise, built around you',
    for: 'For teams who want everything extra, in both quantity and quality.',
    items: ['Everything in Design + Webflow + 3D + Motion', 'Multiple requests at a time', 'Custom art and 3D illustrations', '60+ second explainer animations', 'Real-time collaboration on Slack', 'Google Meet calls for detailed briefs'],
    featured: false,
  },
];

export const onboarding = [
  { title: 'Onboard', body: "We email you access to a ready-made Trello board that walks you through everything." },
  { title: 'Request', body: 'For each task, add your references, final content and the dimensions you need.' },
  { title: 'Receive', body: "We set a due date per request. By that date: BAM! It's ready in an organised Figma file." },
];

export const team = [
  { handle: '@geeky', role: 'Director' },
  { handle: '@bhoomi', role: 'Developer Head' },
  { handle: '@rudra', role: '3D Artist' },
  { handle: '@prateek', role: 'UI/UX Artist' },
  { handle: '@manav', role: 'Video Editor' },
];

export const faqs = [
  { q: 'What types of companies do you work with?', a: "Startups and product teams, especially those building with AI. If you're shipping something new and want it to look and feel world-class, we're your people." },
  { q: 'Why not just hire a full-time designer?', a: "A senior designer costs a full-time salary and still can't do everything. Our team covers UI/UX, 3D, motion and Webflow. And if there isn't enough work to keep a hire busy, you pay them anyway. With Simple, you can pause or cancel anytime." },
  { q: 'How does it all start? Take me through the process.', a: "Once you're on board, we send you a link to your Trello board. It comes with a few demo tasks based on your requirements, so you'll see exactly how to make a request and what to include." },
  { q: 'What types of designs can I request?', a: 'Pretty much anything: product UI, websites and landing pages, brand identities, 3D illustrations, motion graphics and more.' },
  { q: "What is your team's design process?", a: '@geeky, a designer with over 8 years in the industry, directs every project. We sketch on paper first, move on to design, 3D and animation, and finish in Webflow. Everyone is an expert in their craft, so we deliver fast.' },
  { q: 'How and when will I get my final design?', a: 'Designs arrive in a shared Figma file and Webflow builds in your own Webflow account. On average, a simple design takes 1–2 days, a 3D illustration 2–3 days and a 3D animation 3–4 days.' },
  { q: "What if I don't like the design?", a: "We keep revising until you're 100% happy." },
  { q: 'Can I really request unlimited designs?', a: 'Yes. Add as many tasks as you like. We work through them one at a time, in your order of priority. As soon as one is approved, we move on to the next.' },
  { q: 'Do I own the rights to the designs?', a: 'Yes. Duh. Everything we design for you is 100% yours.' },
  { q: 'Is there a contract?', a: 'No contracts. Pause or cancel whenever you want.' },
];

export const socials = [
  { name: 'Dribbble', url: 'https://dribbble.com/' },
  { name: 'Instagram', url: 'https://instagram.com/' },
  { name: 'X', url: 'https://x.com/' },
  { name: 'YouTube', url: 'https://www.youtube.com/' },
  { name: 'Vimeo', url: 'https://vimeo.com/' },
];
