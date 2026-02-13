import noWasteIcon from "@assets/Icon-1024_(1)_1765468583786.png";
import noTimeIcon from "@assets/DALL·E_2024-12-25_00.31.37_-_A_modern_app_icon_for_a_student_e_1765468583786.png";
import akitaDetectorIcon from "@assets/generated_images/akita_dog_detection_app_ui.png";
import projectTrackerIcon from "@assets/generated_images/project_tracker_kanban_dashboard.png";

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

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

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
    "I'm Jan – a developer passionate about cutting-edge technology, currently studying Information Systems at the Technical University of Munich. In a rapidly evolving tech landscape, I explore and integrate the latest AI models and automation tools to build software that doesn't just work, but thinks.",
    "I'm passionate about AI-Augmented Development, using cutting-edge tools like Cursor, Replit, and other AI-powered development environments to build software smarter and faster. My goal is to simplify complex problems through intelligent, AI-driven solutions – bridging the gap between advanced backend logic and intuitive user experiences.",
    "",
    "In my free time, I love playing padel tennis 🎾, going to the gym 💪, or having a ride with my road bike 🚴.",
  ],
  stats: [
    { label: "Years Experience", value: "4+" },
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
}

export const experiences: Experience[] = [
  {
    id: "4",
    title: "Software Engineer: Computer Vision Prototyping",
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
  },
];

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  coverImage: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Scalable React Applications with TypeScript",
    slug: "building-scalable-react-apps-typescript",
    excerpt: "Learn how to structure large React applications using TypeScript, custom hooks, and modern patterns for maintainable codebases.",
    content: `
# Building Scalable React Applications with TypeScript

When it comes to building large-scale React applications, TypeScript isn't just a nice-to-have—it's essential for maintaining code quality and developer productivity.

## Why TypeScript?

TypeScript provides static type checking that catches errors at compile time rather than runtime. This is crucial for:

- **Better IDE Support**: Autocomplete, refactoring tools, and inline documentation
- **Reduced Bugs**: Catch type-related errors before they reach production
- **Improved Collaboration**: Types serve as documentation for your team

## Project Structure

Here's how I structure my React + TypeScript projects:

\`\`\`
src/
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── pages/          # Route components
├── lib/            # Utility functions
├── types/          # Shared TypeScript types
└── constants/      # Static data and configuration
\`\`\`

## Custom Hooks Pattern

One of the most powerful patterns in React is extracting logic into custom hooks:

\`\`\`typescript
function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
\`\`\`

## Conclusion

TypeScript adds a learning curve but pays dividends in maintainability and developer experience. Start small, be consistent, and your codebase will thank you.
    `,
    publishedAt: "2024-12-01",
    readTime: 8,
    tags: ["React", "TypeScript", "Architecture"],
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
  },
  {
    id: "2",
    title: "SwiftUI Best Practices for Production Apps",
    slug: "swiftui-best-practices-production",
    excerpt: "Discover proven patterns and techniques for building robust iOS applications with SwiftUI that scale.",
    content: `
# SwiftUI Best Practices for Production Apps

SwiftUI has matured significantly since its introduction. Here's what I've learned shipping production apps with SwiftUI.

## State Management

SwiftUI offers multiple property wrappers for state management. Choose wisely:

- **@State**: Local component state
- **@Binding**: Two-way data binding to parent
- **@StateObject**: Observable object lifecycle
- **@EnvironmentObject**: Dependency injection

## View Composition

Keep views small and focused. Extract reusable components:

\`\`\`swift
struct UserAvatar: View {
    let user: User
    var size: CGFloat = 44
    
    var body: some View {
        AsyncImage(url: user.avatarURL) { image in
            image.resizable()
        } placeholder: {
            Circle().fill(.gray)
        }
        .frame(width: size, height: size)
        .clipShape(Circle())
    }
}
\`\`\`

## Performance Tips

1. Use \`LazyVStack\` and \`LazyHStack\` for large lists
2. Avoid unnecessary view updates with \`.equatable()\`
3. Profile with Instruments to find bottlenecks

## Testing

SwiftUI views can be tested using ViewInspector or snapshot testing with SnapshotTesting library.

## Conclusion

SwiftUI is production-ready. With proper architecture and these best practices, you can build amazing iOS apps.
    `,
    publishedAt: "2024-11-15",
    readTime: 6,
    tags: ["SwiftUI", "iOS", "Mobile"],
    coverImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
  },
  {
    id: "3",
    title: "Integrating AI into Your Applications",
    slug: "integrating-ai-applications",
    excerpt: "A practical guide to adding AI capabilities to your apps using modern APIs and frameworks.",
    content: `
# Integrating AI into Your Applications

AI integration has become more accessible than ever. Here's how to add intelligent features to your apps.

## Choosing Your Approach

### 1. API-Based AI

Use services like OpenAI, Anthropic, or Google AI:

\`\`\`typescript
const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: userMessage }
  ]
});
\`\`\`

### 2. On-Device AI

For mobile apps, consider Core ML (iOS) or TensorFlow Lite:

- Lower latency
- Works offline
- Better privacy

## Use Cases

- **Smart Search**: Semantic search over content
- **Content Generation**: Automated descriptions, summaries
- **Image Analysis**: Object detection, classification
- **Recommendations**: Personalized suggestions

## Best Practices

1. **Rate Limiting**: Implement proper throttling
2. **Caching**: Cache responses when appropriate
3. **Fallbacks**: Have graceful degradation
4. **Cost Management**: Monitor API usage

## Conclusion

Start with clear use cases, choose the right approach for your needs, and iterate based on user feedback.
    `,
    publishedAt: "2024-10-28",
    readTime: 7,
    tags: ["AI", "OpenAI", "Machine Learning"],
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
  },
];
