"use client"

import { ArrowRight, BookOpen, Zap, Code2, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-12 md:py-6 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-bold">HumanoidRobotics</span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative w-full">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/3 left-10 w-72 h-72 bg-primary/3 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        {/* Main hero content */}
        <section className="relative z-10 px-6 md:px-12 py-10 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Next Generation Robotics</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-4xl leading-tight text-balance">
            Master the Future of{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Humanoid Robotics
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-full  mb-12 leading-loose text-balance">
            Comprehensive guide covering mechanics, AI integration, and real-world applications. From basics to advanced
            implementations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 h-auto text-base rounded-full shadow-lg shadow-primary/30 transition-all hover:shadow-primary/50"
              onClick={() => window.open("/docs/intro", "_blank")}
            >
              Get the Textbook <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-3 gap-6 md:gap-12 w-full max-w-2xl">
            <div className="space-y-2">
              <p className="text-2xl md:text-3xl font-bold text-primary">800+</p>
              <p className="text-xs md:text-sm text-muted-foreground font-medium">Pages of Content</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl md:text-3xl font-bold text-primary">50+</p>
              <p className="text-xs md:text-sm text-muted-foreground font-medium">Practical Projects</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl md:text-3xl font-bold text-primary">10K+</p>
              <p className="text-xs md:text-sm text-muted-foreground font-medium">Active Students</p>
            </div>
          </div>
        </section>

        {/* Feature cards section */}
        <section className="relative z-10 px-6 md:px-12 pb-20 md:pb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="group relative p-8 rounded-2xl border border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                  <Code2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Implementation Focus</h3>
                <p className="text-sm text-muted-foreground">
                  Code examples and practical walkthroughs for real-world robotics applications
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative p-8 rounded-2xl border border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">AI Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Deep dive into machine learning, neural networks, and intelligent decision-making systems
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative p-8 rounded-2xl border border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Advanced Topics</h3>
                <p className="text-sm text-muted-foreground">
                  Motion planning, computer vision, and autonomous navigation techniques
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}