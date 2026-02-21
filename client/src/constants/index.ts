import noWasteIcon from "@assets/Icon-1024_(1)_1765468583786.webp";
import noTimeIcon from "@assets/DALL·E_2024-12-25_00.31.37_-_A_modern_app_icon_for_a_student_e_1765468583786.webp";
import akitaDetectorIcon from "@assets/generated_images/akita_dog_detection_app_ui.webp";
import projectTrackerIcon from "@assets/generated_images/project_tracker_kanban_dashboard.webp";
import portfolioThumbnail from "@assets/portfolio-thumbnail.svg";
import elunicLogo from "@assets/elunic-logo.webp";
import dataAnnotationLogo from "@assets/dataannotation-logo.svg";
import limbachLogo from "@assets/limbach-logo.svg";

export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
}

export interface TechIcon {
  name: string;
  icon: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "NoWaste",
    description: "iOS food management app that reduces household waste through intelligent inventory tracking. Features barcode scanning via AVFoundation, OCR-based receipt processing using Vision Framework, real-time expiry monitoring with a traffic light system, AI-powered recipe suggestions prioritizing ingredients nearing expiration, predictive consumption analytics, automated shopping list generation, and push notifications. Includes batch scanning, Siri Shortcuts integration, and consumption pattern analysis.",
    thumbnail: noWasteIcon,
    techStack: ["SwiftUI", "AVFoundation", "Vision Framework", "Core ML", "UserDefaults"],
    githubUrl: "https://github.com",
    liveUrl: "https://apps.apple.com",
  },
  {
    id: "2",
    title: "NoTime",
    description: "iOS exam preparation app helping students prepare for their exams by tracking progress in each subject. Features AI-generated personalized learning plans based on the user's personal calendar, utilizing free time spaces to optimally schedule learning sessions. The app ensures students reach their goal grades in each subject through intelligent time management and progress tracking.",
    thumbnail: noTimeIcon,
    techStack: ["SwiftUI", "Core Data", "EventKit", "OpenAI API", "Charts"],
    githubUrl: "https://github.com/JanRitzer/NoTime---App",
    liveUrl: "https://apps.apple.com",
  },
  {
    id: "3",
    title: "Computer Vision Dog Detection",
    description: "A fun project trying to detect my Akita Inu dog using Deep Learning. This web app accesses the device camera and analyzes the image live to distinguish between my dog and other objects. Built with a complete ML pipeline from data collection to deployment. Features include live analysis at 3 FPS, front/rear camera switching, responsive design, and real-time confidence display. The neural network is a finetuned ResNet50 trained on over 1500 pictures for high accuracy, using transfer learning with ImageNet normalization.",
    thumbnail: akitaDetectorIcon,
    techStack: ["Python", "Flask", "PyTorch", "ResNet50", "JavaScript", "Camera API"],
    githubUrl: "https://github.com/JanRitzer",
    liveUrl: "https://akita-inu-detector--janritzer.replit.app",
  },
  {
    id: "4",
    title: "ProjectTracker",
    description: "projects.projectTracker.description",
    thumbnail: projectTrackerIcon,
    techStack: ["React", "TypeScript", "Tailwind CSS", "Drag & Drop", "Vercel"],
    githubUrl: "https://github.com/JanRitzer/ProjectTracker",
    liveUrl: "https://project-tracker-gamma-three.vercel.app",
  },
  {
    id: "5",
    title: "This Portfolio",
    description: "My personal developer portfolio featuring a modern dark UI with 3D tilt effects, gyroscope-based mobile interactions, bilingual support (EN/DE), and smooth scroll animations. Built as a single-page app deployed on Vercel with a serverless contact form powered by Resend.",
    thumbnail: portfolioThumbnail,
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    githubUrl: "https://github.com/JanRitzer/Portfolio",
    liveUrl: "https://janritzer.dev",
  },
];

export const techStack: TechIcon[] = [
  { name: "n8n", icon: "n8n" },
  { name: "Swift", icon: "swift" },
  { name: "Python", icon: "python" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Cursor AI", icon: "cursor" },
  { name: "Replit", icon: "replit" },
  { name: "ChatGPT", icon: "openai" },
  { name: "Claude", icon: "anthropic" },
];

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/JanRitzer", icon: "github" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/jan-ritzer-9b82a8219", icon: "linkedin" },
  { name: "Instagram", url: "https://www.instagram.com/janritzer/", icon: "instagram" },
];

export const aboutContent = {
  title: "About Me",
  subtitle: "",
  bio: [
    "I'm Jan – a developer passionate about cutting-edge technology, currently studying Information Systems at the Technical University of Munich. In a rapidly evolving tech landscape, I explore and integrate the latest AI models and automation tools to build software that feels intelligent and intuitive.",
    "I'm passionate about AI-Augmented Development, using cutting-edge tools like Cursor, Claude Code, and other AI-powered development environments to build software smarter and faster. My goal is to simplify complex problems through intelligent, AI-driven solutions – bridging the gap between advanced backend logic and intuitive user experiences.",
    "",
    "In my free time, I love playing padel tennis 🎾, going to the gym 💪, or having a ride with my road bike 🚴.",
  ],
  stats: [
    { label: "Years Experience", value: "5+" },
    { label: "Projects Completed", value: "20+" },
    { label: "Technologies", value: "15+" },
  ],
};

export const heroContent = {
  greeting: "Hi, I'm",
  name: "Jan",
  title: "Software Developer",
  subtitle: "& Mobile Engineer",
  description: "I build exceptional digital experiences that combine cutting-edge technology with intuitive design. Specializing in iOS apps, web platforms, and AI-powered solutions.",
};

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "mobile" | "tools";
}

export const skills: Skill[] = [
  { name: "React", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "SwiftUI", category: "mobile" },
  { name: "React Native", category: "mobile" },
  { name: "Node.js", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "Java", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "Docker", category: "tools" },
  { name: "Git", category: "tools" },
  { name: "Figma", category: "tools" },
  { name: "Claude", category: "tools" },
  { name: "Cursor", category: "tools" },
  { name: "Replit", category: "tools" },
  { name: "n8n", category: "tools" },
];

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string[];
  techStack: string[];
  logo?: string;
}

export const experiences: Experience[] = [
  {
    id: "4",
    title: "Software Engineer Computer Vision Prototyping",
    company: "elunic AG (AI.SEE)",
    location: "Munich",
    startDate: "2026-02",
    endDate: null,
    description: [
      "Developing innovative Computer Vision products and prototypes for the AI.SEE platform",
      "Building and optimizing deep learning models for industrial visual inspection and quality control",
      "Collaborating with cross-functional teams to integrate CV solutions into production environments",
    ],
    techStack: ["Python", "PyTorch", "OpenCV", "Computer Vision", "Deep Learning"],
    logo: elunicLogo,
  },
  {
    id: "1",
    title: "Generative AI Engineer",
    company: "DataAnnotation",
    location: "Remote",
    startDate: "2025-09",
    endDate: null,
    description: [
      "Working on Generative AI and software development projects as a freelance engineer",
      "Developing and training AI models for various applications",
      "Contributing to cutting-edge AI research and implementation",
    ],
    techStack: ["Python", "OpenAI", "LLMs", "Machine Learning"],
    logo: dataAnnotationLogo,
  },
  {
    id: "2",
    title: "Software Developer",
    company: "Self-employed",
    location: "Munich",
    startDate: "2021-05",
    endDate: null,
    description: [
      "Developing various small to medium-sized projects ranging from websites to mobile apps",
      "Building iOS applications with SwiftUI and modern Apple frameworks",
      "Creating full-stack web applications for diverse clients",
    ],
    techStack: ["SwiftUI", "React", "TypeScript", "Node.js", "Python"],
  },
  {
    id: "3",
    title: "Working Student for AI Management & Platform Innovation",
    company: "Limbach Gruppe SE",
    location: "Hybrid",
    startDate: "2024-12",
    endDate: "2025-09",
    description: [
      "Structured, validated, and cleaned raw data from Laboratory Information Systems (LIS)",
      "Accompanied proof-of-concepts including integration of external AI solutions (e.g., miLab) into existing IT infrastructures",
      "Contributed to AI management and platform innovation initiatives",
    ],
    techStack: ["Python", "AI/ML", "Data Processing", "LIS Integration"],
    logo: limbachLogo,
  },
];

