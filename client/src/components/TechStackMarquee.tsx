import { motion } from "framer-motion";
import {
  SiSwift,
  SiPython,
  SiTypescript,
  SiOpenai,
  SiReplit,
} from "react-icons/si";
import { techStack } from "@/constants";
import { N8nIcon, ClaudeIcon, CursorIcon } from "./BrandIcons";
import { useLanguage } from "@/hooks/use-language";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  swift: SiSwift,
  python: SiPython,
  typescript: SiTypescript,
  cursor: CursorIcon,
  replit: SiReplit,
  openai: SiOpenai,
  anthropic: ClaudeIcon,
  n8n: N8nIcon,
};

export function TechStackMarquee() {
  const { t } = useLanguage();
  const duplicatedTechStack = [...techStack, ...techStack];

  return (
    <section className="py-16 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h3 className="text-muted-foreground text-sm uppercase tracking-widest mb-2">
          {t("techStack.title")}
        </h3>
      </motion.div>

      <div className="relative">
        <div className="flex animate-marquee">
          {duplicatedTechStack.map((tech, index) => {
            const IconComponent = iconMap[tech.icon];
            return (
              <div
                key={`${tech.name}-${index}`}
                className="flex items-center gap-3 mx-8 px-6 py-4 rounded-md bg-card/50 border border-border/50 backdrop-blur-sm shrink-0"
              >
                {IconComponent && (
                  <IconComponent className="w-6 h-6 text-primary" />
                )}
                <span className="text-foreground font-medium whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />
    </section>
  );
}
