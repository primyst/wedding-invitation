"use client";

import { motion } from "framer-motion";

const LINKS = [
  { label: "Email", value: "abdullateefqudusleeq@gmail.com", href: "mailto:abdullateefqudusleeq@gmail.com" },
  { label: "Phone", value: "+234 703 561 2652", href: "tel:+2347035612652" },
  { label: "GitHub", value: "github.com/primyst", href: "https://github.com/primyst" },
  { label: "LinkedIn", value: "linkedin.com/in/abdulqudus-primyst", href: "https://linkedin.com/in/abdulqudus-primyst" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="px-6 sm:px-10 lg:px-16 py-24 border-t border-zinc-900"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-xs tracking-[0.25em] uppercase text-zinc-500 mb-2">
          Get in touch
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium text-[#EDEDED] mb-4">
          Let&apos;s build something
        </h2>
        <p className="text-zinc-400 mb-10 max-w-lg leading-relaxed">
          Open to new client projects and full-stack roles. Reach out below —
          I usually reply within a day.
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          {LINKS.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="group flex flex-col gap-1 px-5 py-4 rounded-xl border border-zinc-800 bg-[#111113] hover:border-[#8B9BFF]/50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B9BFF]"
            >
              <span className="text-xs text-zinc-500">{l.label}</span>
              <span className="text-sm text-zinc-200 group-hover:text-[#8B9BFF] transition-colors break-all">
                {l.value}
              </span>
            </motion.a>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-900 text-xs text-zinc-600">
          © {new Date().getFullYear()} Abdullateef Abdulqudus. Built with Next.js.
        </div>
      </div>
    </section>
  );
}
