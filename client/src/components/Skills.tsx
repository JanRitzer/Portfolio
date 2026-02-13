import { useState } from "react";
import { motion } from "framer-motion";
import { skills, type Skill } from "@/constants";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiSwift,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiFigma,
  SiOpenjdk,
} from "react-icons/si";
import { Smartphone } from "lucide-react";
import { ClaudeIcon, CursorIcon, ReplitIcon, N8nIcon } from "./BrandIcons";
import { useLanguage } from "@/hooks/use-language";

const skillIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "React": SiReact,
  "TypeScript": SiTypescript,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  "SwiftUI": SiSwift,
  "React Native": Smartphone,
  "Node.js": SiNodedotjs,
  "Python": SiPython,
  "Java": SiOpenjdk,
  "PostgreSQL": SiPostgresql,
  "Docker": SiDocker,
  "Git": SiGit,
  "Figma": SiFigma,
  "Claude": ClaudeIcon,
  "Cursor": CursorIcon,
  "Replit": ReplitIcon,
  "n8n": N8nIcon,
};

type CategoryId = "all" | "frontend" | "backend" | "mobile" | "tools";

function SkillItem({ skill, index }: { skill: Skill; index: number }) {
  const IconComponent = skillIconMap[skill.name];
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 p-3 rounded-md bg-muted/30"
      data-testid={`skill-item-${skill.name.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {IconComponent && <IconComponent className="w-5 h-5 text-primary" />}
      <span className="font-medium">{skill.name}</span>
    </motion.div>
  );
}

export function Skills() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");

  const categories = [
    { id: "all" as const, labelKey: t("skills.all") },
    { id: "frontend" as const, labelKey: t("skills.frontend") },
    { id: "backend" as const, labelKey: t("skills.backend") },
    { id: "mobile" as const, labelKey: t("skills.mobile") },
    { id: "tools" as const, labelKey: t("skills.tools") },
  ];

  const filteredSkills = activeCategory === "all"
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" data-testid="text-skills-title">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t("skills.title")}
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("skills.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className="toggle-elevate"
              data-testid={`button-category-${category.id}`}
            >
              {category.labelKey}
            </Button>
          ))}
        </motion.div>

        <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredSkills.map((skill, index) => (
              <SkillItem key={skill.name} skill={skill} index={index} />
            ))}
          </div>

          {filteredSkills.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              {t("skills.noSkills")}
            </p>
          )}
        </Card>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {skills.slice(0, 8).map((skill) => (
            <Badge
              key={skill.name}
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20"
              data-testid={`badge-skill-${skill.name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {skill.name}
            </Badge>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
