import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useLanguage } from "@/hooks/use-language";

export function Contact() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: t("contact.success.title"),
        description: t("contact.success.desc"),
      });
    },
    onError: () => {
      toast({
        title: t("contact.error.title"),
        description: t("contact.error.desc"),
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" data-testid="text-contact-title">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t("contact.title")}
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 h-full">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{t("contact.sent")}</h3>
                  <p className="text-muted-foreground mb-6">
                    {t("contact.sentDesc")}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                    data-testid="button-send-another"
                  >
                    {t("contact.sendAnother")}
                  </Button>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-6">{t("contact.sendMessage")}</h3>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel data-testid="label-name">{t("contact.name")}</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder={t("contact.namePlaceholder")}
                                  className="bg-background/50"
                                  data-testid="input-name"
                                />
                              </FormControl>
                              <FormMessage data-testid="error-name" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel data-testid="label-email">{t("contact.email")}</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder={t("contact.emailPlaceholder")}
                                  className="bg-background/50"
                                  data-testid="input-email"
                                />
                              </FormControl>
                              <FormMessage data-testid="error-email" />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel data-testid="label-subject">{t("contact.subject")}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder={t("contact.subjectPlaceholder")}
                                className="bg-background/50"
                                data-testid="input-subject"
                              />
                            </FormControl>
                            <FormMessage data-testid="error-subject" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel data-testid="label-message">{t("contact.message")}</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder={t("contact.messagePlaceholder")}
                                rows={5}
                                className="bg-background/50 resize-none"
                                data-testid="input-message"
                              />
                            </FormControl>
                            <FormMessage data-testid="error-message" />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full gap-2"
                        disabled={contactMutation.isPending}
                        data-testid="button-send"
                      >
                        {contactMutation.isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                        {contactMutation.isPending ? t("contact.sending") : t("contact.send")}
                      </Button>
                    </form>
                  </Form>
                </>
              )}
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50" data-testid="card-contact-email">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{t("contact.emailLabel")}</h4>
                  <p className="text-muted-foreground text-sm" data-testid="text-email">jan.ritzer@tum.de</p>
                  <p className="text-muted-foreground text-sm">{t("contact.responseTime")}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50" data-testid="card-contact-location">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{t("contact.location")}</h4>
                  <p className="text-muted-foreground text-sm" data-testid="text-location">{t("contact.locationValue")}</p>
                  <p className="text-muted-foreground text-sm">{t("contact.remoteAvailable")}</p>
                </div>
              </div>
            </Card>

            <div className="p-8 rounded-md bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20">
              <h4 className="text-xl font-bold mb-3">{t("contact.cta.title")}</h4>
              <p className="text-muted-foreground mb-4">
                {t("contact.cta.desc")}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">
                  {t("contact.cta.ios")}
                </span>
                <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm">
                  {t("contact.cta.web")}
                </span>
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">
                  {t("contact.cta.ai")}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
