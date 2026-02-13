import { motion } from "framer-motion";
import { SiGithub, SiLinkedin, SiInstagram } from "react-icons/si";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { socialLinks } from "@/constants";
import { useLanguage } from "@/hooks/use-language";

const iconMap: Record<string, typeof SiGithub> = {
  github: SiGithub,
  linkedin: SiLinkedin,
  instagram: SiInstagram,
};

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 border-t border-border/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <button
              onClick={scrollToTop}
              className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
              data-testid="button-scroll-to-top"
            >
              &lt;JR /&gt;
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            {socialLinks.map((link) => {
              const IconComponent = iconMap[link.icon];
              return (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="icon"
                  asChild
                  data-testid={`button-social-${link.icon}`}
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                  >
                    {IconComponent && <IconComponent className="w-5 h-5" />}
                  </a>
                </Button>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center gap-1 text-sm text-muted-foreground"
            data-testid="text-footer-copyright"
          >
            <span>{t("footer.builtWith")}</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>by Jan Ritzer</span>
            <span className="mx-2">|</span>
            <span>{currentYear}</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
