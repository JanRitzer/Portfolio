import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/constants";
import { ProjectCard } from "./ProjectCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export default function ProjectShowcase() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  const projectsWithTranslations = useMemo(() => {
    return projects.map(project => {
      let description = project.description;
      if (project.id === "1") {
        description = t("projects.noWaste.description");
      } else if (project.id === "2") {
        description = t("projects.noTime.description");
      } else if (project.id === "3") {
        description = t("projects.dogDetection.description");
      } else if (project.id === "4") {
        description = t("projects.projectTracker.description");
      }
      return { ...project, description };
    });
  }, [language, t]);

  const allTechStacks = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(project => {
      project.techStack.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, []);

  const filteredProjects = useMemo(() => {
    return projectsWithTranslations.filter(project => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = searchQuery === "" ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.techStack.some(tech => {
          const techLower = tech.toLowerCase();
          return techLower === query || 
                 techLower.startsWith(query + " ") || 
                 techLower.startsWith(query) ||
                 techLower.includes(" " + query);
        });
      
      const matchesTech = selectedTechs.length === 0 ||
        selectedTechs.some(tech => project.techStack.includes(tech));
      
      return matchesSearch && matchesTech;
    });
  }, [searchQuery, selectedTechs, projectsWithTranslations]);

  const toggleTech = (tech: string) => {
    setSelectedTechs(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTechs([]);
  };

  const hasActiveFilters = searchQuery !== "" || selectedTechs.length > 0;

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" data-testid="text-projects-title">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t("projects.title")}
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t("projects.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50"
                data-testid="input-project-search"
              />
            </div>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="gap-1"
                data-testid="button-clear-filters"
              >
                <X className="w-3 h-3" />
                {t("projects.clearFilters")}
              </Button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {allTechStacks.map((tech) => (
              <Badge
                key={tech}
                variant={selectedTechs.includes(tech) ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  selectedTechs.includes(tech)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-primary/10"
                }`}
                onClick={() => toggleTech(tech)}
                data-testid={`filter-tech-${tech.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key="projects-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground text-lg mb-4" data-testid="text-no-results">
                {t("projects.noResults")}
              </p>
              <Button variant="outline" onClick={clearFilters} data-testid="button-reset-filters">
                {t("projects.resetFilters")}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
