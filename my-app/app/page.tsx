"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { CalendarDays, MapPin, Sparkles } from "lucide-react";
import { useState } from "react";

const story = [
  { image: "/images/image2.jpg", title: "The beginning", text: "Every beautiful story begins with a moment no one expects to change everything." },
  { image: "/images/image3.jpg", title: "A beautiful connection", text: "Somewhere between laughter, conversation and time, two hearts found a reason to stay." },
  { image: "/images/image4.jpg", title: "Forever", text: "And now, with gratitude in our hearts, we begin our next chapter together." },
];

type PuzzlePieceProps = {
  label: string;
  side: "left" | "right";
  onSolved: () => void;
};

function PuzzlePiece({ label, side, onSolved }: PuzzlePieceProps) {
  const [dragged, setDragged] = useState(false);

  return (
    <motion.button
      type="button"
      aria-label={`Move ${label} heart piece`}
      drag
      dragMomentum={false}
      onDragStart={() => setDragged(true)}
      onDragEnd={(_, info) => {
        setDragged(false);
        if (Math.abs(info.offset.x) > 70) onSolved();
      }}
      animate={{ rotate: dragged ? (side === "left" ? -6 : 6) : 0, scale: dragged ? 1.08 : 1 }}
      className={`puzzle-piece puzzle-piece-${side}`}
      whileTap={{ scale: 1.04 }}
    >
      <span>{label}</span>
    </motion.button>
  );
}

export default function Home() {
  const [introOpen, setIntroOpen] = useState(true);
  const [piecesSolved, setPiecesSolved] = useState(0);
  const solved = piecesSolved >= 2;

  function solvePiece() {
    setPiecesSolved((current) => Math.min(current + 1, 2));
  }

  return (
    <main className="overflow-x-hidden">
      <AnimatePresence>
        {introOpen && (
          <motion.section
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.08, filter: "blur(12px)" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="intro fixed inset-0 z-50 flex min-h-[100svh] items-center justify-center overflow-hidden px-5"
          >
            <div className="intro-glow intro-glow-one" />
            <div className="intro-glow intro-glow-two" />
            <div className="intro-noise" />

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 w-full max-w-xl text-center text-[#f9f2e8]"
            >
              <p className="mb-5 text-[10px] uppercase tracking-[0.48em] text-[#d8b98f] sm:text-xs">Abdullah & Kabirah</p>
              <h1 className="intro-title">Before the story begins...</h1>
              <p className="mx-auto mt-6 max-w-sm text-sm leading-7 text-[#f7ede1]/65 sm:text-base">
                Every beautiful connection starts when two pieces find their way to each other.
              </p>

              <div className="relative mx-auto mt-12 h-44 w-full max-w-sm sm:h-52">
                <motion.div
                  animate={solved ? { opacity: 0, scale: 0.5 } : { opacity: 1 }}
                  className="absolute inset-0"
                >
                  <PuzzlePiece label="A" side="left" onSolved={solvePiece} />
                  <PuzzlePiece label="K" side="right" onSolved={solvePiece} />
                  <motion.div
                    animate={{ opacity: [0.25, 0.75, 0.25] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="absolute left-1/2 top-[42%] -translate-x-1/2 text-[10px] uppercase tracking-[0.25em] text-white/35"
                  >
                    Connect
                  </motion.div>
                </motion.div>

                <AnimatePresence>
                  {solved && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 240, damping: 16 }}
                      className="absolute inset-0 flex flex-col items-center justify-center"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.18, 1], rotate: [0, 3, -3, 0] }}
                        transition={{ duration: 1.1 }}
                        className="text-8xl text-[#d7a76d] sm:text-9xl"
                      >
                        ♥
                      </motion.div>
                      <p className="mt-3 text-[10px] uppercase tracking-[0.4em] text-[#d8b98f]">A perfect fit</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {solved && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    onClick={() => setIntroOpen(false)}
                    className="group relative mt-8 inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#d8b98f]/50 px-6 py-3 text-xs uppercase tracking-[0.28em] transition hover:border-[#f6dfbd]"
                  >
                    <span className="absolute inset-0 translate-y-full bg-[#f6dfbd] transition-transform duration-300 group-hover:translate-y-0" />
                    <Sparkles size={15} className="relative z-10" />
                    <span className="relative z-10 group-hover:text-[#241b17]">Open our invitation</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#211814] text-white">
        <motion.div initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease: "easeOut" }} className="absolute inset-0">
          <Image src="/images/image1.jpg" alt="Abdullah and Kabirah" fill priority sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 1.2, ease: "easeOut" }} className="relative mx-auto w-full max-w-5xl px-6 pb-16 text-center sm:pb-24">
          <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/75">Together with their families</p>
          <h2 className="text-6xl font-normal leading-none tracking-tight sm:text-8xl">Abdullah <span className="font-light italic text-[#e8caa4]">&</span> Kabirah</h2>
          <p className="mx-auto mt-7 max-w-md text-base leading-relaxed text-white/80">With hearts full of gratitude, we invite you to celebrate the beginning of our forever.</p>
          <a href="#story" className="mt-10 inline-block border-b border-white/50 pb-2 text-xs uppercase tracking-[0.28em] transition hover:border-white">Discover our story</a>
        </motion.div>
      </section>

      <section id="story" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto mb-20 max-w-xl text-center"><p className="text-xs uppercase tracking-[0.35em] text-[#8c6541]">Our story</p><h2 className="mt-5 text-4xl sm:text-6xl">A little journey of two hearts</h2></div>
        <div className="space-y-24 sm:space-y-32">
          {story.map((item, index) => <motion.article key={item.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }} className={`grid items-center gap-10 md:grid-cols-2 ${index % 2 ? "md:[&>div:first-child]:order-2" : ""}`}><div className="relative aspect-[4/5] overflow-hidden bg-[#ded0bf] shadow-2xl"><Image src={item.image} alt={item.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div><div className="px-3 sm:px-10"><p className="text-xs uppercase tracking-[0.28em] text-[#8c6541]">Chapter 0{index + 1}</p><h3 className="mt-4 text-4xl sm:text-5xl">{item.title}</h3><p className="mt-6 max-w-md text-lg leading-8 text-[#66544a]">{item.text}</p></div></motion.article>)}
        </div>
      </section>

      <section className="relative min-h-[80svh] overflow-hidden text-white"><Image src="/images/image5.jpg" alt="Abdullah and Kabirah celebrating their culture" fill sizes="100vw" className="object-cover" /><div className="absolute inset-0 bg-black/45" /><div className="relative flex min-h-[80svh] items-center justify-center px-6 text-center"><div className="max-w-2xl"><p className="text-xs uppercase tracking-[0.35em] text-white/70">A celebration of love & heritage</p><h2 className="mt-6 text-5xl sm:text-7xl">One love.<br />One beautiful beginning.</h2></div></div></section>

      <section className="bg-[#211814] px-5 py-24 text-[#f5eee4] sm:py-32"><div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center"><div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden border-[10px] border-[#d7c0a3] bg-[#d7c0a3] shadow-2xl"><Image src="/images/image9.jpg" alt="Illustration of Abdullah and Kabirah" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div><div className="text-center md:text-left"><p className="text-xs uppercase tracking-[0.35em] text-[#cba87a]">A little moment</p><h2 className="mt-5 text-5xl">The best part is that you&apos;re invited.</h2><p className="mt-6 max-w-lg text-lg leading-8 text-[#d9cec2]">Our story would not feel complete without the people who have been part of our journey.</p></div></div></section>

      <section className="relative overflow-hidden px-5 py-24 sm:py-32"><div className="absolute inset-0 opacity-25"><Image src="/images/image8.jpg" alt="Wedding stationery" fill sizes="100vw" className="object-cover" /></div><div className="relative mx-auto max-w-2xl border border-[#c8ad8c] bg-[#f8f1e8]/95 px-7 py-14 text-center shadow-2xl sm:px-16"><p className="text-xs uppercase tracking-[0.35em] text-[#8c6541]">Save the date</p><h2 className="mt-6 text-5xl sm:text-7xl">14 · 12 · 2026</h2><div className="mx-auto my-10 h-px w-20 bg-[#c8ad8c]" /><div className="grid gap-6 sm:grid-cols-2"><div className="flex items-center justify-center gap-3"><CalendarDays size={19} /><span>4:00 PM</span></div><div className="flex items-center justify-center gap-3"><MapPin size={19} /><span>Lagos, Nigeria</span></div></div><p className="mt-10 text-sm leading-7 text-[#66544a]">The full celebration details will be revealed as our special day draws closer.</p></div></section>

      <section className="relative flex min-h-[100svh] items-end overflow-hidden text-white"><Image src="/images/image10.jpg" alt="Abdullah and Kabirah beginning their next chapter" fill sizes="100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" /><div className="relative mx-auto w-full max-w-4xl px-6 pb-20 text-center sm:pb-28"><p className="text-xs uppercase tracking-[0.35em] text-white/70">The beginning of forever</p><h2 className="mt-6 text-5xl sm:text-8xl">And so, our next chapter begins.</h2><p className="mt-8 text-lg text-white/80">With love, Abdullah & Kabirah</p><p className="mt-16 text-[10px] uppercase tracking-[0.3em] text-white/50">Crafted by Primyst</p></div></section>
    </main>
  );
}
