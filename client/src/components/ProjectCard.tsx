import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Project } from "@/constants";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTilt({
      x: ((y - centerY) / centerY) * -15,
      y: ((x - centerX) / centerX) * 15,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.15s ease-out",
        }}
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
