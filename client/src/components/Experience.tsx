import { motion } from "framer-motion";
import { experiences, type Experience as ExperienceType } from "@/constants";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useTilt } from "@/hooks/use-tilt";

function ExperienceCard({ experience, index }: { experience: ExperienceType; index: number }) {
  const { t, language } = useLanguage();
  const isLeft = index % 2 === 0;
  const { ref, style, handleMouseMove, handleMouseLeave } = useTilt();

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === "de" ? "de-DE" : "en-US", { month: "short", year: "numeric" });
  };

  const getTranslatedDescription = () => {
    if (experience.company === "elunic AG (AI.SEE)") {
      return [
        t("experience.elunic.desc1"),
        t("experience.elunic.desc2"),
        t("experience.elunic.desc3"),
      ];
    } else if (experience.company === "DataAnnotation") {
      return [
        t("experience.dataAnnotation.desc1"),
        t("experience.dataAnnotation.desc2"),
        t("experience.dataAnnotation.desc3"),
      ];
    } else if (experience.company === "Self-employed") {
      return [
        t("experience.selfEmployed.desc1"),
        t("experience.selfEmployed.desc2"),
        t("experience.selfEmployed.desc3"),
      ];
    } else if (experience.company === "Limbach Gruppe SE") {
      return [
        t("experience.limbach.desc1"),
        t("experience.limbach.desc2"),
        t("experience.limbach.desc3"),
      ];
    }
    return experience.description;
  };

  const getTranslatedTitle = () => {
    if (experience.company === "elunic AG (AI.SEE)") {
      return t("experience.elunic.title");
    } else if (experience.company === "DataAnnotation") {
      return t("experience.dataAnnotation.title");
    } else if (experience.company === "Self-employed") {
      return t("experience.selfEmployed.title");
    } else if (experience.company === "Limbach Gruppe SE") {
      return t("experience.limbach.title");
    }
    return experience.title;
  };

  const getTranslatedCompany = () => {
    if (experience.company === "Self-employed" && language === "de") {
      return "Selbstständig";
    }
    return experience.company;
  };

  const getTranslatedLocation = () => {
    if (experience.location === "Munich" && language === "de") {
      return "München";
    } else if (experience.location === "Munich, Germany" && language === "de") {
      return "München, Deutschland";
    }
    if (experience.location === "Hybrid" && language === "de") {
      return "Hybrid";
    }
    return experience.location;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`flex items-center gap-4 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      <div className="hidden md:block flex-1" />

      <div className="relative z-10">
        {experience.logo ? (
          <div className="w-14 h-14 rounded-full bg-background border-2 border-primary/50 flex items-center justify-center overflow-hidden shadow-lg shadow-primary/10">
            <img
              src={experience.logo}
              alt={`${experience.company} logo`}
              className="w-9 h-9 object-contain"
            />
          </div>
        ) : (
          <div className="w-14 h-14 rounded-full bg-background border-2 border-primary/50 flex items-center justify-center shadow-lg shadow-primary/10">
            <Briefcase className="w-6 h-6 text-primary" />
          </div>
        )}
      </div>

      <div className="flex-1">
        <div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={style}
          data-testid={`card-experience-${experience.id}`}
        >
        <Card
          className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors"
        >
          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
            <div>
              <h3 className="text-lg font-bold" data-testid={`text-title-${experience.id}`}>
                {getTranslatedTitle()}
              </h3>
              <div className="flex items-center gap-2 text-primary">
                <Briefcase className="w-4 h-4" />
                <span className="font-medium">{getTranslatedCompany()}</span>
              </div>
            </div>
            <Badge variant="outline" className="text-xs shrink-0">
              {experience.endDate ? (language === "de" ? "Beendet" : "Past") : (language === "de" ? "Aktuell" : "Current")}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{getTranslatedLocation()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>
                {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : t("experience.present")}
              </span>
            </div>
          </div>

          <ul className="space-y-2 mb-4">
            {getTranslatedDescription().map((item, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {experience.techStack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-xs bg-primary/10 text-primary border-primary/20"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </Card>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-24 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" data-testid="text-experience-title">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t("experience.title")}
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("experience.subtitle")}
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[27px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20" />
          
          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <ExperienceCard key={experience.id} experience={experience} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
