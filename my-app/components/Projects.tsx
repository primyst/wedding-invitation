"use client";

import { motion } from "framer-motion";

const PROJECTS = [
  {
    name: "taskforge-ai",
    title: "TaskForge AI",
    desc: "AI-powered project management platform with interactive dashboards and AI-assisted productivity workflows.",
    stack: ["Next.js", "TypeScript", "AI Integration"],
    href: "https://taskforgeai.vercel.app",
  },
  {
    name: "wabilahi-travels",
    title: "Wabilahi Taofiq Travels & Tours",
    desc: "Production travel agency platform with package management, booking automation, and WhatsApp lead workflows.",
    stack: ["Next.js", "Email Automation", "Admin CMS"],
    href: "https://wabilahitaofiqmoboluwadurotravelsandtoursnigltd.com",
  },
  {
    name: "qvend",
    title: "QVend",
    desc: "Business management and digital storefront platform with authentication and storefront workflows.",
    stack: ["Next.js", "Auth", "Business Logic"],
    href: "https://qvend.vercel.app",
  },
  {
    name: "aureline-clinic",
    title: "Aureline Clinic",
    desc: "Healthcare business site built for premium UX, accessibility, and conversion-focused layout.",
    stack: ["Next.js", "Tailwind", "SEO"],
    href: "https://aureline-chi.vercel.app",
  },
  {
    name: "nexus-corporate",
    title: "Nexus Corporate",
    desc: "Multi-page corporate site with reusable component architecture and case study presentation.",
    stack: ["Next.js", "Component Architecture"],
    href: "https://nexus-corporate.vercel.app",
  },
  {
    name: "haven-realty",
    title: "Haven Realty",
    desc: "Real estate landing experience with reusable UI components and mobile-first performance tuning.",
    stack: ["Next.js", "Tailwind CSS"],
    href: "https://primyst-estate.vercel.app",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="px-6 sm:px-10 lg:px-16 py-24 border-t border-zinc-900"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-xs tracking-[0.25em] uppercase text-zinc-500 mb-2">
          Selected work
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium text-[#EDEDED] mb-12">
          Projects
        </h2>

        <div className="grid sm:grid-cols-2 gap-px bg-zinc-900 rounded-lg overflow-hidden">
          {PROJECTS.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 2) * 0.06 }}
              className="group bg-[#0A0A0B] p-6 sm:p-7 hover:bg-[#111113] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-base sm:text-lg font-medium text-zinc-100 group-hover:text-[#8B9BFF] transition-colors">
                  {p.title}
                </h3>
                <span className="text-zinc-600 group-hover:text-[#8B9BFF] transition-colors">
                  ↗
                </span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="text-[11px] px-2 py-0.5 rounded border border-zinc-800 text-zinc-500"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
