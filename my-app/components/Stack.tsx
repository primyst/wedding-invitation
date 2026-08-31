"use client";

import { motion } from "framer-motion";

const GROUPS = [
  {
    key: "frontend",
    label: "Frontend",
    color: "#8B9BFF",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    key: "backend",
    label: "Backend",
    color: "#6C7BDB",
    items: ["Node.js", "Express", "REST APIs", "Auth & RBAC"],
  },
  {
    key: "data",
    label: "Data",
    color: "#4E5AA8",
    items: ["MongoDB", "PostgreSQL", "SQLite"],
  },
  {
    key: "ai",
    label: "AI & tooling",
    color: "#F0B65C",
    items: ["OpenAI API", "Git", "Vercel", "Postman"],
  },
];

export default function Stack() {
  return (
    <section
      id="stack"
      className="px-6 sm:px-10 lg:px-16 py-24 border-t border-zinc-900"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-xs tracking-[0.25em] uppercase text-zinc-500 mb-2">
          Technical stack
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium text-[#EDEDED] mb-12">
          What it&apos;s built with
        </h2>

        <div className="grid sm:grid-cols-2 gap-5">
          {GROUPS.map((g, gi) => (
            <motion.div
              key={g.key}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: gi * 0.06 }}
              className="rounded-xl border border-zinc-800 bg-[#111113] p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: g.color }}
                />
                <h3 className="text-sm font-medium text-zinc-200">
                  {g.label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1 rounded-full border border-zinc-800 text-zinc-400"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
