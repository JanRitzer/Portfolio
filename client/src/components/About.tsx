import { motion } from "framer-motion";
import { Code2, Palette, Zap, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import { useTilt } from "@/hooks/use-tilt";
import profileImage from "@assets/IMG_4617_1765566574844.webp";
import tumLogo from "@assets/tum-logo.svg";

export default function About() {
  const { t } = useLanguage();
  const { ref, style, handleMouseMove, handleMouseLeave } = useTilt();

  const skills = [
    { icon: Code2, label: t("about.skill.cleanCode"), description: t("about.skill.cleanCodeDesc") },
    { icon: Palette, label: t("about.skill.uiux"), description: t("about.skill.uiuxDesc") },
    { icon: Zap, label: t("about.skill.performance"), description: t("about.skill.performanceDesc") },
    { icon: Users, label: t("about.skill.collaboration"), description: t("about.skill.collaborationDesc") },
  ];

  const stats = [
    { value: "4+", label: t("about.yearsExp") },
    { value: "20+", label: t("about.projectsCompleted") },
    { value: "15+", label: t("about.technologies") },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" data-testid="text-about-title">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t("about.title")}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-muted-foreground leading-relaxed" data-testid="text-bio-0">
              {t("about.bio1")}
            </p>
            <p className="text-muted-foreground leading-relaxed" data-testid="text-bio-1">
              {t("about.bio2")}
            </p>
            <p className="text-muted-foreground leading-relaxed" data-testid="text-bio-2">
              {t("about.bio4")}
            </p>

            <div className="flex flex-wrap justify-center gap-8 pt-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div
                    className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                    data-testid={`text-stat-value-${index}`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div
              ref={ref}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={style}
              className="relative"
            >
              <div className="aspect-square max-w-md mx-auto rounded-md overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 p-1">
                <div className="w-full h-full rounded-md bg-card flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
                  <div className="absolute inset-0 backdrop-blur-sm" />

                  <div className="relative z-10 text-center p-8">
                    <div className="w-56 h-56 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent p-1 overflow-hidden" data-testid="img-profile-avatar">
                      <img 
                        src={profileImage} 
                        alt="Jan Ritzer" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2" data-testid="text-profile-name">Jan Ritzer</h3>
                    <p className="text-muted-foreground text-sm mb-4" data-testid="text-profile-role">Software Developer</p>
                    <img 
                      src={tumLogo} 
                      alt="Technical University of Munich" 
                      className="h-8 mx-auto object-contain"
                      data-testid="img-tum-logo"
                    />
                  </div>

                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/30 rounded-full blur-3xl" />
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/30 rounded-full blur-3xl" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center mb-10" data-testid="text-skills-title">
            {t("about.whatIBring")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 text-center h-full">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-md bg-primary/10 flex items-center justify-center">
                    <skill.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">{skill.label}</h4>
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
