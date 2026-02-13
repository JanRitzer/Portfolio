import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { blogPosts, type BlogPost } from "@/constants";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Clock, ArrowRight, X } from "lucide-react";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.trim().split("\n");
  
  return (
    <div className="prose prose-invert prose-sm max-w-none">
      {lines.map((line, i) => {
        if (line.startsWith("# ")) {
          return <h1 key={i} className="text-2xl font-bold mt-6 mb-4 text-foreground">{line.slice(2)}</h1>;
        }
        if (line.startsWith("## ")) {
          return <h2 key={i} className="text-xl font-semibold mt-5 mb-3 text-foreground">{line.slice(3)}</h2>;
        }
        if (line.startsWith("### ")) {
          return <h3 key={i} className="text-lg font-semibold mt-4 mb-2 text-foreground">{line.slice(4)}</h3>;
        }
        if (line.startsWith("- **")) {
          const match = line.match(/- \*\*(.+?)\*\*: (.+)/);
          if (match) {
            return (
              <li key={i} className="ml-4 mb-1 text-muted-foreground list-disc">
                <strong className="text-foreground">{match[1]}</strong>: {match[2]}
              </li>
            );
          }
        }
        if (line.startsWith("- ")) {
          return <li key={i} className="ml-4 mb-1 text-muted-foreground list-disc">{line.slice(2)}</li>;
        }
        if (line.startsWith("1. ") || line.match(/^\d+\. /)) {
          const text = line.replace(/^\d+\. /, "");
          return <li key={i} className="ml-4 mb-1 text-muted-foreground list-decimal">{text}</li>;
        }
        if (line.startsWith("```")) {
          return null;
        }
        if (line.trim() === "") {
          return <div key={i} className="h-2" />;
        }
        return <p key={i} className="text-muted-foreground mb-2 leading-relaxed">{line}</p>;
      })}
    </div>
  );
}

function BlogCard({ post, index, onRead }: { post: BlogPost; index: number; onRead: (post: BlogPost) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card
        className="group overflow-visible bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-300 hover:border-primary/30 h-full flex flex-col"
        data-testid={`card-blog-${post.id}`}
      >
        <div className="relative overflow-hidden rounded-t-md">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="aspect-[2/1]"
          >
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
              loading="lazy"
              data-testid={`img-blog-cover-${post.id}`}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          <h3
            className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors"
            data-testid={`text-blog-title-${post.id}`}
          >
            {post.title}
          </h3>

          <p
            className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1"
            data-testid={`text-blog-excerpt-${post.id}`}
          >
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs bg-primary/10 text-primary border-primary/20"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="gap-1 self-start"
            onClick={() => onRead(post)}
            data-testid={`button-read-${post.id}`}
          >
            Read More
            <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

export function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-24 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" data-testid="text-blog-title">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Blog & Articles
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Thoughts on software development, best practices, and lessons learned.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <BlogCard
              key={post.id}
              post={post}
              index={index}
              onRead={setSelectedPost}
            />
          ))}
        </div>
      </div>

      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-3xl h-[80vh] p-0 gap-0 bg-card border-border/50">
          <DialogHeader className="p-6 pb-4 border-b border-border/50">
            <div className="flex items-start justify-between gap-4">
              <div>
                <DialogTitle className="text-xl font-bold mb-2" data-testid="text-modal-title">
                  {selectedPost?.title}
                </DialogTitle>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedPost && formatDate(selectedPost.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedPost?.readTime} min read</span>
                  </div>
                </div>
              </div>
            </div>
          </DialogHeader>
          <ScrollArea className="flex-1 p-6">
            {selectedPost && <MarkdownRenderer content={selectedPost.content} />}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </section>
  );
}
