import expenseFlowImg from '../assets/expense-flow.png';
import sampurnaBoutiqueImg from '../assets/sampurna-boutique.png';
import quizAiImg from '../assets/quiz-ai.png';
import airQualityMonitorImg from '../assets/air-quality-monitor.jpg';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  bengaliTitle?: string;
  category: 'Full-Stack' | 'Web & E-Commerce' | 'AI & Labs' | 'Hardware & IoT';
  description: string;
  longDescription: string;
  tags: string[];
  features: string[];
  status?: 'Completed' | 'Currently Building' | 'Prototype';
  metrics?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  color: string;
  gradient: string;
  imageUrl?: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  score: string;
  location: string;
  description: string;
  badge?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; level: number; iconName?: string; highlight?: boolean }[];
}

export interface FocusItem {
  type: 'Building' | 'Exploring' | 'Learning' | 'Practising';
  title: string;
  items: string[];
  description: string;
  icon: string;
  tagColor: string;
}

export const PERSONAL_INFO = {
  name: "Arghya Pandey",
  roleLine1: "Developer",
  roleLine2: "& Tech Enthusiast",
  secondaryRole1: "Full-Stack Builder",
  secondaryRole2: "& Creative Engineer",
  headline: "Computer Science & Engineering Student",
  motto: "Builder · Explorer · Learner",
  bio: "Passionate developer combining clean architectural engineering with immersive web craft. Currently pursuing B.Tech in CSE, exploring modern web applications, AI systems, interactive 3D, and embedded hardware.",
  email: "arghyapandey9@gmail.com",
  location: "Phagwara, Punjab / West Bengal, India",
  university: "Lovely Professional University",
  socials: {
    linkedin: "https://www.linkedin.com/in/arghyapandey",
    github: "https://github.com/ArghyaPandey07",
    instagram: "https://www.instagram.com/arghya_pandey/",
  },
  availabilityStatus: "Open for Internships & Projects",
  stats: [
    { label: "CGPA", value: "8.11" },
    { label: "Core Projects", value: "4+" },
    { label: "Technologies", value: "15+" },
    { label: "Commitment", value: "100%" }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "expense-flow",
    title: "ExpenseFlow",
    subtitle: "Personal Expense & Financial Intelligence Tracker",
    category: "Full-Stack",
    description: "A modern finance app for tracking expenses, budgets, and savings with automated transaction extraction from Google Pay PDFs and bank CSVs.",
    longDescription: "ExpenseFlow reimagines personal finance management by eliminating manual receipt and expense entry. Users can simply upload transaction export PDFs from payment gateways (like Google Pay) or bank CSVs, which are intelligently parsed client-side using PDF.js and transformed into categorized expenses. Features dynamic analytics charts, custom category budgets, interactive cash flow projections, and persistent cloud sync via Supabase PostgreSQL.",
    tags: ["React", "Supabase", "PostgreSQL", "PDF.js", "Recharts", "Tailwind CSS", "TypeScript"],
    features: [
      "Automated PDF & CSV transaction parsing with regex extraction",
      "Interactive data visualizations with Recharts for spending trends",
      "Dynamic budget allocation with alert thresholds",
      "Real-time data synchronization backed by Supabase & Row-Level Security",
      "Exportable financial summaries and monthly breakdown reports"
    ],
    status: "Completed",
    metrics: "Automated parsing saves ~85% manual entry time",
    githubUrl: "https://github.com/ArghyaPandey07",
    featured: true,
    color: "#10B981",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    imageUrl: expenseFlowImg
  },
  {
    id: "sampurna-boutique",
    title: "Sampurna Boutique",
    bengaliTitle: "সম্পূর্ণ বুটিক",
    subtitle: "Cultural Fashion E-Commerce Platform",
    category: "Web & E-Commerce",
    description: "A production-ready e-commerce website for a Bengal-based women's fashion brand, harmonizing modern UI/UX with Bengali cultural identity.",
    longDescription: "Designed and engineered a complete digital storefront for Sampurna Boutique. The platform features a responsive product catalog, WhatsApp-integrated checkout flow, and custom branding that reflects Shantiniketan heritage. Built with React and optimized for ultra-fast load times across mobile devices, which form 80% of their customer base.",
    tags: ["React", "Vite", "Tailwind CSS", "Framer Motion", "WhatsApp API", "UI/UX Design"],
    features: [
      "Custom Bengali typography integration (Hind Siliguri)",
      "WhatsApp-driven seamless checkout architecture",
      "Dynamic product filtering and category mapping",
      "Optimized performance achieving sub-second first contentful paint"
    ],
    status: "Completed",
    metrics: "Full brand digital identity & production storefront",
    githubUrl: "https://github.com/ArghyaPandey07",
    featured: true,
    color: "#FDA228",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    imageUrl: sampurnaBoutiqueImg
  },
  {
    id: "ai-quiz-generator",
    title: "AI Quiz Generator",
    subtitle: "Adaptive Learning & Quiz Generation Engine",
    category: "AI & Labs",
    description: "An AI-powered quiz generation platform designed to create interactive learning experiences, flashcards, and assessments from user-selected topics.",
    longDescription: "AI Quiz Generator empowers educators and self-learners to turn any syllabus, document, or custom topic into challenging, engaging quizzes in seconds. Leverages modern LLM inference APIs to generate multifaceted questions (multiple choice, true/false, conceptual deep-dives), tracks real-time progress, scores answers dynamically, and gives contextual explanations for each question.",
    tags: ["AI", "Web Development", "React", "TypeScript", "Tailwind CSS", "Prompt Engineering"],
    features: [
      "Instant quiz generation across any subject or custom text input",
      "Difficulty calibration (Beginner, Intermediate, Expert)",
      "Instant grading with comprehensive explanations and concept hints",
      "Interactive timer mode and streak gamification",
      "Shareable quiz sessions for peer challenges"
    ],
    status: "Currently Building",
    metrics: "Active experimental development",
    githubUrl: "https://github.com/ArghyaPandey07",
    featured: true,
    color: "#6366F1",
    gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
    imageUrl: quizAiImg
  },
  {
    id: "air-quality-monitor",
    title: "Air Quality Monitor",
    subtitle: "IoT Environmental Telemetry Station",
    category: "Hardware & IoT",
    description: "An environmental monitoring system built with Arduino UNO, MQ-135 and DHT22 for measuring air-quality readings, temperature and humidity.",
    longDescription: "A hands-on embedded systems project engineered to capture and analyze indoor air parameters. Utilizing an Arduino UNO paired with an MQ-135 hazardous gas sensor and a DHT22 high-precision temperature/humidity sensor, the system samples particulate gas concentrations (CO2, NH3, smoke) alongside thermal dynamics, transmitting telemetry for real-time safety classification and alert triggering.",
    tags: ["Arduino UNO", "MQ-135", "DHT22", "Embedded C++", "Hardware", "Sensors"],
    features: [
      "Multi-gas concentration detection (CO2, smoke, ammonia, benzene)",
      "Accurate ambient temperature and relative humidity monitoring",
      "Real-time visual alert indicators and serial telemetry reporting",
      "Calibrated baseline gas sensor algorithms for clean-air referencing",
      "Low power embedded architecture"
    ],
    status: "Completed",
    metrics: "Multi-parameter telemetry logging",
    githubUrl: "https://github.com/ArghyaPandey07",
    featured: true,
    color: "#06B6D4",
    gradient: "from-cyan-500/20 via-sky-500/10 to-transparent",
    imageUrl: airQualityMonitorImg
  }
];

export const EDUCATION_LIST: Education[] = [
  {
    institution: "Lovely Professional University",
    degree: "B.Tech — Computer Science & Engineering",
    period: "2025 — Present",
    score: "CGPA: 8.11",
    location: "Phagwara, Punjab",
    description: "Specializing in Computer Science, software architecture, data structures, algorithms, and web systems. Actively building hands-on projects and collaborating with developer communities.",
    badge: "Current Degree"
  },
  {
    institution: "Simlapal Madan Mohan High School",
    degree: "Higher Secondary Education (10+2 / Science)",
    period: "2021 — 2023",
    score: "89%",
    location: "Simlapal, Bankura, West Bengal",
    description: "Completed higher secondary curriculum with major coursework in Physics, Chemistry, Mathematics, and Computer Fundamentals.",
    badge: "89% Distinction"
  },
  {
    institution: "New Integrated Govt. School, Simlapal",
    degree: "Secondary Education (10th Standard)",
    period: "2020 — 2021",
    score: "92.3%",
    location: "Simlapal, Bankura, West Bengal",
    description: "Graduated with top academic standing, laying strong foundations in analytical thinking, mathematics, and logical reasoning.",
    badge: "92.3% Excellence"
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: "Programming Languages",
    description: "Core languages used for problem solving, backend logic, and algorithms",
    skills: [
      { name: "C++", level: 90, highlight: true },
      { name: "Java", level: 85, highlight: true },
      { name: "Python", level: 88, highlight: true },
      { name: "JavaScript (ES6+)", level: 92, highlight: true },
    ]
  },
  {
    title: "Web & Frontend",
    description: "Modern frameworks and styling tools for intuitive, responsive interfaces",
    skills: [
      { name: "React", level: 92, highlight: true },
      { name: "TypeScript", level: 88, highlight: true },
      { name: "Vite", level: 90 },
      { name: "Tailwind CSS", level: 95, highlight: true },
      { name: "HTML5 / CSS3", level: 95 },
      { name: "Responsive UI/UX", level: 90 }
    ]
  },
  {
    title: "Backend & Database",
    description: "Server architecture, persistent storage, and API design",
    skills: [
      { name: "Supabase", level: 86, highlight: true },
      { name: "PostgreSQL", level: 82, highlight: true },
      { name: "RESTful APIs", level: 88 },
      { name: "Database Design", level: 84 }
    ]
  },
  {
    title: "Tools, 3D & Hardware",
    description: "Creative technologies, version control, and embedded systems",
    skills: [
      { name: "Git & GitHub", level: 92, highlight: true },
      { name: "Three.js & WebGL", level: 75, highlight: true },
      { name: "AI & LLM APIs", level: 82, highlight: true },
      { name: "Arduino & IoT Sensors", level: 80 }
    ]
  }
];

export const FOCUS_ITEMS: FocusItem[] = [
  {
    type: "Building",
    title: "AI Quiz Generator",
    items: ["Adaptive question logic", "Dynamic topic synthesis", "Instant grading UI"],
    description: "Developing a full-stack platform transforming structured and unstructured text into gamified learning checkpoints.",
    icon: "Rocket",
    tagColor: "bg-purple-500/10 text-purple-700 border-purple-200"
  },
  {
    type: "Exploring",
    title: "Three.js · WebGL · Generative AI",
    items: ["3D Scene rendering", "Interactive canvas shaders", "Prompt engineering"],
    description: "Pushing the boundaries of web experiences with spatial computing, shaders, and real-time generative agents.",
    icon: "Compass",
    tagColor: "bg-blue-500/10 text-blue-700 border-blue-200"
  },
  {
    type: "Learning",
    title: "Full-Stack Development",
    items: ["Scalable backend services", "Next.js ecosystem", "Cloud infrastructure"],
    description: "Deepening knowledge of scalable systems, enterprise cloud patterns, and high-concurrency architectures.",
    icon: "GraduationCap",
    tagColor: "bg-emerald-500/10 text-emerald-700 border-emerald-200"
  },
  {
    type: "Practising",
    title: "Data Structures & Algorithms",
    items: ["Graphs & Dynamic Programming", "Complexity optimization", "Competitive coding"],
    description: "Solving algorithmic challenges daily in C++ and Java to strengthen computational problem-solving.",
    icon: "Zap",
    tagColor: "bg-amber-500/10 text-amber-700 border-amber-200"
  }
];

export const INTERESTS_TAGS = [
  "Web Development",
  "Artificial Intelligence",
  "Interactive 3D",
  "UI / UX Design",
  "Data Visualization",
  "Hardware & IoT",
  "Algorithmic Problem Solving"
];

export const TECH_BADGES = [
  { name: "React", icon: "⚛️" },
  { name: "TypeScript", icon: "📘" },
  { name: "C++", icon: "⚡" },
  { name: "Python", icon: "🐍" },
  { name: "Supabase", icon: "⚡" },
  { name: "Tailwind CSS", icon: "🎨" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Three.js", icon: "🧊" },
  { name: "Arduino", icon: "🔌" }
];
