import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Language = "en" | "de";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.experience": "Experience",
    "nav.about": "About",
    "nav.contact": "Contact",

    // Hero
    "hero.available": "Available for freelance work",
    "hero.greeting": "Hi, I'm",
    "hero.name": "Jan",
    "hero.title": "Software Engineer",
    "hero.subtitle": "& Mobile Engineer",
    "hero.description": "I build exceptional digital experiences that combine cutting-edge technology with intuitive design. Specializing in web platforms, iOS apps, and AI-powered solutions.",
    "hero.viewWork": "View Work",

    // Projects
    "projects.title": "Featured Projects",
    "projects.subtitle": "A selection of my recent work showcasing iOS development, web applications, and AI integration.",
    "projects.search": "Search projects...",
    "projects.clearFilters": "Clear filters",
    "projects.noResults": "No projects match your filters.",
    "projects.resetFilters": "Reset Filters",
    "projects.noWaste.description": "iOS food management app that reduces household waste through intelligent inventory tracking. Features barcode scanning via AVFoundation, OCR-based receipt processing using Vision Framework, real-time expiry monitoring with a traffic light system, AI-powered recipe suggestions prioritizing ingredients nearing expiration, predictive consumption analytics, automated shopping list generation, and push notifications. Includes batch scanning, Siri Shortcuts integration, and consumption pattern analysis.",
    "projects.noTime.description": "iOS exam preparation app helping students prepare for their exams by tracking progress in each subject. Features AI-generated personalized learning plans based on the user's personal calendar, utilizing free time spaces to optimally schedule learning sessions. The app ensures students reach their goal grades in each subject through intelligent time management and progress tracking.",
    "projects.dogDetection.title": "Computer Vision Dog Detection",
    "projects.dogDetection.description": "A fun project trying to detect my Akita Inu dog using Deep Learning. This web app accesses the device camera and analyzes the image live to distinguish between my dog and other objects. Built with a complete ML pipeline from data collection to deployment. Features include live analysis at 3 FPS, front/rear camera switching, responsive design, and real-time confidence display. The neural network is a finetuned ResNet50 trained on over 1500 pictures for high accuracy, using transfer learning with ImageNet normalization.",
    "projects.projectTracker.description": "A comprehensive project management web app for individuals and teams. Features include a Kanban board with drag-and-drop task management, ticket tracking for monitoring progress, quick notes for capturing ideas, and an intuitive dashboard for project overview. Built with modern React and designed for seamless collaboration and productivity.",
    "projects.viewProject": "View Project",
    "projects.viewCode": "View Code",

    // Tech Stack Marquee
    "techStack.title": "Technologies I Work With",

    // Skills
    "skills.title": "Skills & Technologies",
    "skills.subtitle": "Technologies I work with to bring ideas to life",
    "skills.all": "All",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend",
    "skills.mobile": "Mobile",
    "skills.tools": "Tools & AI",
    "skills.noSkills": "No skills found in this category.",

    // Experience
    "experience.title": "Work Experience",
    "experience.subtitle": "My professional journey in software development",
    "experience.present": "Present",
    "experience.elunic.title": "Software Engineer Computer Vision Prototyping",
    "experience.elunic.desc1": "Developing innovative Computer Vision products and prototypes for the AI.SEE platform",
    "experience.elunic.desc2": "Building and optimizing deep learning models for industrial visual inspection and quality control",
    "experience.elunic.desc3": "Collaborating with cross-functional teams to integrate CV solutions into production environments",
    "experience.dataAnnotation.title": "Generative AI Engineer",
    "experience.dataAnnotation.desc1": "Working on Generative AI and software development projects as a freelance engineer",
    "experience.dataAnnotation.desc2": "Developing and training AI models for various applications",
    "experience.dataAnnotation.desc3": "Contributing to cutting-edge AI research and implementation",
    "experience.selfEmployed.title": "Software Engineer",
    "experience.selfEmployed.desc1": "Developing various small to medium-sized projects ranging from websites to mobile apps",
    "experience.selfEmployed.desc2": "Building iOS applications with SwiftUI and modern Apple frameworks",
    "experience.selfEmployed.desc3": "Creating full-stack web applications for diverse clients",
    "experience.limbach.title": "Working Student for AI Management & Platform Innovation",
    "experience.limbach.desc1": "Structured, validated, and cleaned raw data from Laboratory Information Systems (LIS)",
    "experience.limbach.desc2": "Accompanied proof-of-concepts including integration of external AI solutions (e.g., miLab) into existing IT infrastructures",
    "experience.limbach.desc3": "Contributed to AI management and platform innovation initiatives",

    // About
    "about.title": "About Me",
    "about.bio1": "I'm Jan – a developer passionate about cutting-edge technology, currently studying Information Systems at the Technical University of Munich. In a rapidly evolving tech landscape, I explore and integrate the latest AI models and automation tools to build software that feels intelligent and intuitive.",
    "about.bio2": "I'm passionate about AI-Augmented Development, using cutting-edge tools like Cursor, Claude Code, and other AI-powered development environments to build software smarter and faster. My goal is to simplify complex problems through intelligent, AI-driven solutions – bridging the gap between advanced backend logic and intuitive user experiences.",
    "about.bio3": "",
    "about.bio4": "In my free time, I love playing padel tennis 🎾, going to the gym 💪, or having a ride with my road bike 🚴.",
    "about.yearsExp": "Years Experience",
    "about.projectsCompleted": "Projects Completed",
    "about.technologies": "Technologies",
    "about.whatIBring": "What I Bring to the Table",
    "about.skill.cleanCode": "Clean Code",
    "about.skill.cleanCodeDesc": "Writing maintainable, scalable solutions",
    "about.skill.uiux": "UI/UX Design",
    "about.skill.uiuxDesc": "Creating intuitive user experiences",
    "about.skill.performance": "Performance",
    "about.skill.performanceDesc": "Optimizing for speed and efficiency",
    "about.skill.collaboration": "Collaboration",
    "about.skill.collaborationDesc": "Working effectively with teams",

    // Contact
    "contact.title": "Get In Touch",
    "contact.subtitle": "Have a project in mind or want to collaborate? I'd love to hear from you. Let's create something amazing together.",
    "contact.sendMessage": "Send a Message",
    "contact.name": "Name",
    "contact.namePlaceholder": "Your name",
    "contact.email": "Email",
    "contact.emailPlaceholder": "your@email.com",
    "contact.subject": "Subject",
    "contact.subjectPlaceholder": "What's this about?",
    "contact.message": "Message",
    "contact.messagePlaceholder": "Tell me about your project...",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.sent": "Message Sent!",
    "contact.sentDesc": "Thank you for reaching out. I'll get back to you within 24 hours.",
    "contact.sendAnother": "Send Another Message",
    "contact.emailLabel": "Email",
    "contact.responseTime": "Usually respond within 24 hours",
    "contact.location": "Location",
    "contact.locationValue": "Munich, Germany",
    "contact.remoteAvailable": "Available for remote work worldwide",
    "contact.cta.title": "Let's Build Something Amazing",
    "contact.cta.desc": "I'm currently available for working student positions and freelance work. Whether you need an iOS app, a web platform, or AI integration, I'm here to help bring your vision to life.",
    "contact.cta.ios": "iOS Development",
    "contact.cta.web": "Web Apps",
    "contact.cta.ai": "AI Integration",
    "contact.success.title": "Message sent!",
    "contact.success.desc": "Thank you for reaching out. I'll get back to you soon.",
    "contact.error.title": "Something went wrong",
    "contact.error.desc": "Please try again or reach out via email directly.",

    // Footer
    "footer.rights": "All rights reserved.",
    "footer.builtWith": "Built with",
  },
  de: {
    // Navigation
    "nav.home": "Start",
    "nav.projects": "Projekte",
    "nav.skills": "Fähigkeiten",
    "nav.experience": "Erfahrung",
    "nav.about": "Über mich",
    "nav.contact": "Kontakt",

    // Hero
    "hero.available": "Verfügbar für Freelance-Projekte",
    "hero.greeting": "Hi, ich bin",
    "hero.name": "Jan",
    "hero.title": "Software Engineer",
    "hero.subtitle": "& Mobile Engineer",
    "hero.description": "Ich entwickle außergewöhnliche digitale Erlebnisse, die modernste Technologie mit intuitivem Design verbindet. Spezialisiert auf Web-Plattformen, iOS Apps und KI-gestützte Lösungen.",
    "hero.viewWork": "Projekte ansehen",

    // Projects
    "projects.title": "Ausgewählte Projekte",
    "projects.subtitle": "Eine Auswahl meiner aktuellen Arbeiten aus den Bereichen iOS-Entwicklung, Webanwendungen und KI-Integration.",
    "projects.search": "Projekte suchen...",
    "projects.clearFilters": "Filter löschen",
    "projects.noResults": "Keine Projekte gefunden.",
    "projects.resetFilters": "Filter zurücksetzen",
    "projects.noWaste.description": "iOS-App zur Lebensmittelverwaltung, die Haushaltsabfälle durch intelligente Bestandsverfolgung reduziert. Funktionen: Barcode-Scanning via AVFoundation, OCR-basierte Kassenbon-Verarbeitung mit Vision Framework, Echtzeit-Ablaufüberwachung mit Ampelsystem, KI-gestützte Rezeptvorschläge für bald ablaufende Zutaten, prädiktive Verbrauchsanalyse, automatische Einkaufslisten und Push-Benachrichtigungen.",
    "projects.noTime.description": "iOS-App zur Prüfungsvorbereitung, die Studenten hilft, ihre Prüfungen durch Fortschrittsverfolgung in jedem Fach vorzubereiten. Bietet KI-generierte personalisierte Lernpläne basierend auf dem persönlichen Kalender und nutzt freie Zeitfenster für optimale Lerneinheiten.",
    "projects.dogDetection.title": "Computer Vision Hundeerkennung",
    "projects.dogDetection.description": "Ein Spaßprojekt zur Erkennung eines Akita Inu Hundes mittels Deep Learning. Diese Web-App greift auf die Gerätekamera zu und analysiert das Bild live, um meinen Hund von anderen Objekten zu unterscheiden. Mit 3 FPS Live-Analyse, Kamerawechsel und Echtzeit-Konfidenzanzeige. Das neuronale Netz ist ein feinabgestimmtes ResNet50, trainiert mit über 1500 Bildern, um eine präzise Erkennung zu ermöglichen.",
    "projects.projectTracker.description": "Eine umfassende Projektmanagement-Webanwendung für Einzelpersonen und Teams. Funktionen umfassen ein Kanban-Board mit Drag-and-Drop-Aufgabenverwaltung, Ticket-Tracking zur Fortschrittsverfolgung, Schnellnotizen zum Festhalten von Ideen und ein intuitives Dashboard für die Projektübersicht. Entwickelt mit modernem React für nahtlose Zusammenarbeit und Produktivität.",
    "projects.viewProject": "Projekt ansehen",
    "projects.viewCode": "Code ansehen",

    // Tech Stack Marquee
    "techStack.title": "Technologien, mit denen ich arbeite",

    // Skills
    "skills.title": "Fähigkeiten & Technologien",
    "skills.subtitle": "Technologien, mit denen ich Ideen zum Leben erwecke",
    "skills.all": "Alle",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend",
    "skills.mobile": "Mobile",
    "skills.tools": "Tools & KI",
    "skills.noSkills": "Keine Fähigkeiten in dieser Kategorie gefunden.",

    // Experience
    "experience.title": "Berufserfahrung",
    "experience.subtitle": "Mein beruflicher Werdegang in der Softwareentwicklung",
    "experience.present": "Heute",
    "experience.elunic.title": "Softwareentwickler Computer Vision Prototyping",
    "experience.elunic.desc1": "Entwicklung innovativer Computer Vision Produkte und Prototypen für die AI.SEE-Plattform",
    "experience.elunic.desc2": "Entwicklung und Optimierung von Deep Learning Modellen für industrielle Bildinspektion und Qualitätskontrolle",
    "experience.elunic.desc3": "Zusammenarbeit mit funktionsübergreifenden Teams zur Integration von CV-Lösungen in Produktionsumgebungen",
    "experience.dataAnnotation.title": "Generative AI Engineer",
    "experience.dataAnnotation.desc1": "Arbeit an Generative AI und Softwareentwicklungsprojekten als freiberuflicher Entwickler",
    "experience.dataAnnotation.desc2": "Entwicklung und Training von KI-Modellen für verschiedene Anwendungen",
    "experience.dataAnnotation.desc3": "Beitrag zur KI-Forschung und -Implementierung",
    "experience.selfEmployed.title": "Software Engineer",
    "experience.selfEmployed.desc1": "Entwicklung verschiedener kleiner bis mittlerer Projekte von Websites bis Mobile Apps",
    "experience.selfEmployed.desc2": "Entwicklung von iOS-Anwendungen mit SwiftUI und modernen Apple Frameworks",
    "experience.selfEmployed.desc3": "Erstellung von Full-Stack-Webanwendungen für diverse Kunden",
    "experience.limbach.title": "Werkstudent für KI-Management & Plattform-Innovation",
    "experience.limbach.desc1": "Strukturierung, Validierung und Bereinigung von Rohdaten aus Laborinformationssystemen (LIS)",
    "experience.limbach.desc2": "Begleitung von Proof-of-Concepts inkl. Integration externer KI-Lösungen (z.B. miLab) in bestehende IT-Infrastrukturen",
    "experience.limbach.desc3": "Beitrag zu KI-Management und Plattform-Innovationsinitiativen",

    // About
    "about.title": "Über mich",
    "about.bio1": "Ich bin Jan – ein Entwickler mit Leidenschaft für modernste Technologie, derzeit Wirtschaftsinformatik-Student an der Technischen Universität München. In einer sich schnell entwickelnden Tech-Landschaft erforsche und integriere ich die neuesten KI-Modelle und Automatisierungstools, um Software zu entwickeln, die nicht nur funktioniert, sondern denkt.",
    "about.bio2": "Ich bin begeistert von KI-unterstützter Entwicklung und nutze innovative Tools wie Cursor, Replit und andere KI-gestützte Entwicklungsumgebungen, um Software schneller und intelligenter zu bauen. Mein Ziel ist es, komplexe Probleme durch intelligente, KI-gesteuerte Lösungen zu vereinfachen.",
    "about.bio3": "",
    "about.bio4": "In meiner Freizeit spiele ich gerne Padel Tennis 🎾, gehe ins Fitnessstudio 💪 oder fahre eine Runde mit meinem Rennrad 🚴.",
    "about.yearsExp": "Jahre Erfahrung",
    "about.projectsCompleted": "Projekte",
    "about.technologies": "Technologien",
    "about.whatIBring": "Was ich mitbringe",
    "about.skill.cleanCode": "Clean Code",
    "about.skill.cleanCodeDesc": "Wartbare, skalierbare Lösungen",
    "about.skill.uiux": "UI/UX Design",
    "about.skill.uiuxDesc": "Intuitive Benutzererfahrungen",
    "about.skill.performance": "Performance",
    "about.skill.performanceDesc": "Optimiert für Geschwindigkeit",
    "about.skill.collaboration": "Teamarbeit",
    "about.skill.collaborationDesc": "Effektive Zusammenarbeit",

    // Contact
    "contact.title": "Kontakt aufnehmen",
    "contact.subtitle": "Haben Sie ein Projekt im Kopf oder möchten mit mir zusammenarbeiten? Ich freue mich von Ihnen zu hören! Lassen Sie uns gemeinsam etwas Großartiges bauen.",
    "contact.sendMessage": "Nachricht senden",
    "contact.name": "Name",
    "contact.namePlaceholder": "Ihr Name",
    "contact.email": "E-Mail",
    "contact.emailPlaceholder": "ihre@email.de",
    "contact.subject": "Betreff",
    "contact.subjectPlaceholder": "Worum geht es?",
    "contact.message": "Nachricht",
    "contact.messagePlaceholder": "Erzählen Sie mir von Ihrem Projekt...",
    "contact.send": "Nachricht senden",
    "contact.sending": "Wird gesendet...",
    "contact.sent": "Nachricht gesendet!",
    "contact.sentDesc": "Vielen Dank für Ihre Nachricht. Ich melde mich innerhalb von 24 Stunden.",
    "contact.sendAnother": "Weitere Nachricht senden",
    "contact.emailLabel": "E-Mail",
    "contact.responseTime": "Antwort normalerweise innerhalb von 24 Stunden",
    "contact.location": "Standort",
    "contact.locationValue": "München, Deutschland",
    "contact.remoteAvailable": "Verfügbar für Remote-Arbeit weltweit",
    "contact.cta.title": "Lassen Sie uns etwas Großartiges bauen",
    "contact.cta.desc": "Ich bin derzeit verfügbar für Werkstudentenpositionen und Freelance-Arbeit. Ob iOS-App, Web-Plattform oder KI-Integration – ich helfe gerne, Ihre Vision zu verwirklichen.",
    "contact.cta.ios": "iOS Entwicklung",
    "contact.cta.web": "Web Apps",
    "contact.cta.ai": "KI Integration",
    "contact.success.title": "Nachricht gesendet!",
    "contact.success.desc": "Vielen Dank für Ihre Nachricht. Ich melde mich bald.",
    "contact.error.title": "Etwas ist schiefgelaufen",
    "contact.error.desc": "Bitte versuchen Sie es erneut oder kontaktieren Sie mich direkt per E-Mail.",

    // Footer
    "footer.rights": "Alle Rechte vorbehalten.",
    "footer.builtWith": "Erstellt mit",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !isInitialized) {
      const saved = localStorage.getItem("language");
      if (saved === "en" || saved === "de") {
        setLanguage(saved);
      }
      setIsInitialized(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("language", language);
    }
  }, [language, isInitialized]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
