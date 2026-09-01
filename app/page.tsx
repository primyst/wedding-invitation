"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import CelebrationExperience from "@/components/CelebrationExperience";
import ClosingExperience from "@/components/ClosingExperience";
import Countdown from "@/components/Countdown";
import EventDetails from "@/components/EventDetails";
import ScratchReveal from "@/components/ScratchReveal";

type PuzzlePieceProps = { label: string; side: "left" | "right"; onSolved: () => void };
type MemoryCardProps = { image: string; alt: string; caption: string; className: string; rotate: number };

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

function MemoryCard({ image, alt, caption, className, rotate }: MemoryCardProps) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 80, rotate: rotate + 4 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`memory-card ${className}`}
    >
      <div className="memory-photo">
        <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
      </div>
      <figcaption>{caption}</figcaption>
    </motion.figure>
  );
}

export default function Home() {
  const [introOpen, setIntroOpen] = useState(true);
  const [piecesSolved, setPiecesSolved] = useState(0);
  const solved = piecesSolved >= 2;
  const solvePiece = () => setPiecesSolved((current) => Math.min(current + 1, 2));

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
              className="relative z-10 w-full max-w-xl text-center text-[#5b4a56]"
            >
              <p className="mb-5 text-[10px] uppercase tracking-[0.48em] text-[#9a5f70] sm:text-xs">Abdullah & Kabirah</p>
              <h1 className="intro-title">Before the story begins...</h1>
              <p className="mx-auto mt-6 max-w-sm text-sm leading-7 text-[#8a7488] sm:text-base">
                Every beautiful connection starts when two pieces find their way to each other.
              </p>
              <div className="relative mx-auto mt-12 h-44 w-full max-w-sm sm:h-52">
                <motion.div animate={solved ? { opacity: 0, scale: 0.5 } : { opacity: 1 }} className="absolute inset-0">
                  <PuzzlePiece label="A" side="left" onSolved={solvePiece} />
                  <PuzzlePiece label="K" side="right" onSolved={solvePiece} />
                  <motion.div
                    animate={{ opacity: [0.25, 0.75, 0.25] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="absolute left-1/2 top-[42%] -translate-x-1/2 text-[10px] uppercase tracking-[0.25em] text-[#9a5f70]/50"
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
                        className="text-8xl text-[#cf9fae] sm:text-9xl"
                      >
                        ♥
                      </motion.div>
                      <p className="mt-3 text-[10px] uppercase tracking-[0.4em] text-[#9a5f70]">A perfect fit</p>
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
                    className="group relative mt-8 inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#cf9fae]/60 px-6 py-3 text-xs uppercase tracking-[0.28em] transition hover:border-[#9a5f70]"
                  >
                    <span className="absolute inset-0 translate-y-full bg-[#f4d4dd] transition-transform duration-300 group-hover:translate-y-0" />
                    <Sparkles size={15} className="relative z-10" />
                    <span className="relative z-10 group-hover:text-[#5b4a56]">Open our invitation</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#3c2c3a] text-white">
        <motion.div initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease: "easeOut" }} className="absolute inset-0">
          <Image src="/images/image1.jpg" alt="Abdullah and Kabirah" fill priority sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#3c2c3a]/90 via-[#3c2c3a]/20 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 1.2, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-5xl px-6 pb-16 text-center sm:pb-24"
        >
          <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/80">Together with their families</p>
          <h2 className="font-display text-6xl font-medium leading-none tracking-tight sm:text-8xl">
            Abdullah <span className="font-script text-[#f6ddc4]">&amp;</span> Kabirah
          </h2>
          <p className="mx-auto mt-7 max-w-md text-base leading-relaxed text-white/85">
            With hearts full of gratitude, we invite you to celebrate the beginning of our forever.
          </p>
          <a href="#story" className="mt-10 inline-block border-b border-white/50 pb-2 text-xs uppercase tracking-[0.28em] transition hover:border-white">
            Discover our story
          </a>
        </motion.div>
      </section>

      <section id="story" className="memory-section relative overflow-hidden px-5 py-24 sm:px-8 sm:py-36">
        <div className="memory-orbit memory-orbit-one" />
        <div className="memory-orbit memory-orbit-two" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto max-w-2xl text-center"
        >
          <p className="text-xs uppercase tracking-[0.45em] text-[#9a5f70]">A few beautiful moments</p>
          <h2 className="memory-heading mt-5">Our story was never meant to fit inside a box.</h2>
          <p className="mx-auto mt-6 max-w-md leading-8 text-[#8a7488]">
            So we kept the little moments exactly how memories tend to live: scattered, imperfect and impossible to forget.
          </p>
        </motion.div>
        <div className="relative z-10 mx-auto mt-20 max-w-6xl lg:min-h-[1250px]">
          <MemoryCard
            image="/images/image2.jpg"
            alt="Abdullah and Kabirah at the beginning of their story"
            caption="Chapter I — it started quietly"
            rotate={-6}
            className="lg:absolute lg:left-[4%] lg:top-0 lg:w-[42%]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="memory-note mx-auto my-10 max-w-xs lg:absolute lg:right-[9%] lg:top-[9%] lg:my-0"
          >
            <span>01</span>
            <p>Somewhere between an ordinary day and an unexpected conversation, everything became a little more interesting.</p>
          </motion.div>
          <MemoryCard
            image="/images/image3.jpg"
            alt="Abdullah and Kabirah sharing a beautiful connection"
            caption="A moment worth keeping"
            rotate={5}
            className="lg:absolute lg:right-[2%] lg:top-[32%] lg:w-[40%]"
          />
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="memory-whisper mx-auto my-12 max-w-md text-center lg:absolute lg:left-[8%] lg:top-[46%] lg:my-0 lg:max-w-xs lg:text-left"
          >
            &ldquo;And somehow, without trying too hard, two separate stories began to feel like one.&rdquo;
          </motion.p>
          <MemoryCard
            image="/images/image4.jpg"
            alt="Abdullah and Kabirah beginning forever"
            caption="The part where forever began to sound right"
            rotate={-3}
            className="lg:absolute lg:left-[24%] lg:top-[64%] lg:w-[46%]"
          />
        </div>
      </section>

      <Countdown />

      <CelebrationExperience />

      <EventDetails />

      <ScratchReveal />

      <ClosingExperience />
    </main>
  );
}
