import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Project } from "@/constants";
import { useTilt } from "@/hooks/use-tilt";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { ref, style, handleMouseMove, handleMouseLeave } = useTilt();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={style}
        data-testid={`card-project-${project.id}`}
      >
        <Card
          className="group overflow-visible bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-300 hover:border-primary/30"
        >
        <div className="relative overflow-hidden rounded-t-md">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="aspect-video flex items-center justify-center bg-muted/30"
          >
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-2/3 h-2/3 object-contain"
              loading="lazy"
              data-testid={`img-project-thumbnail-${project.id}`}
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-5">
          <h3
            className="text-xl font-bold mb-2 group-hover:text-primary transition-colors"
            data-testid={`text-project-title-${project.id}`}
          >
            {project.title}
          </h3>

          <p
            className="text-muted-foreground text-sm mb-4"
            data-testid={`text-project-description-${project.id}`}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4" data-testid={`tech-stack-${project.id}`}>
            {project.techStack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-xs bg-primary/10 text-primary border-primary/20"
                data-testid={`badge-tech-${tech.toLowerCase().replace(/\s+/g, "-")}`}
              >
                #{tech}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              asChild
              data-testid={`button-github-${project.id}`}
            >
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
              </a>
            </Button>

            {project.liveUrl && (
              <Button
                variant="ghost"
                size="icon"
                asChild
                data-testid={`button-live-${project.id}`}
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </Card>
      </div>
    </motion.div>
  );
}
