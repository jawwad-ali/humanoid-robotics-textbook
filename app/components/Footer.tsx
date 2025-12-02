"use client"

import { Github, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 md:py-16 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Author Info */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-lg font-semibold text-white">Crafted by Ali Jawwad</p>
            <p className="text-sm text-gray-400 font-light italic">
              Building the future of humanoid robotics, one algorithm at a time
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            {/* LinkedIn Icon */}
            <a
              href="https://www.linkedin.com/in/ali-jawwad-webdeveloper-nextjs-typescript-tailwindcss-jamstack-expert/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              aria-label="LinkedIn"
            >
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
                <Linkedin className="w-6 h-6 text-white/70 group-hover:text-[#1cd98e] transition-colors duration-300" />
              </div>
            </a>

            {/* GitHub Icon */}
            <a
              href="https://github.com/ali-jawwad"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              aria-label="GitHub"
            >
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
                <Github className="w-6 h-6 text-white/70 group-hover:text-[#1cd98e] transition-colors duration-300" />
              </div>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-8 pt-8">
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Humanoid Robotics Textbook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}