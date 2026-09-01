"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import CelebrationExperience from "@/components/CelebrationExperience";
import ClosingExperience from "@/components/ClosingExperience";
import ScratchReveal from "@/components/ScratchReveal";

type MemoryCardProps = { image: string; alt: string; caption: string; className: string; rotate: number };

function HeartIntro({ onOpen }: { onOpen: () => void }) {
  const [broken, setBroken] = useState(false);
  const [joined, setJoined] = useState(false);
  const [dragging, setDragging] = useState<"left" | "right" | null>(null);
  const [positions, setPositions] = useState({ left: -1, right: 1 });

  const joinThreshold = 0.38;

  const moveHeart = (side: "left" | "right", delta: number) => {
    setPositions((current) => {
      const next = { ...current, [side]: current[side] + delta };
      if (Math.abs(next.left - next.right) <= joinThreshold) {
        setJoined(true);
        setDragging(null);
      }
      return next;
    });
  };

  return (
    <motion.section
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08, filter: "blur(12px)" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className="intro fixed inset-0 z-50 flex min-h-[100svh] items-center justify-center overflow-hidden px-5"
    >
      <div className="intro-glow intro-glow-one" />
      <div className="intro-glow intro-glow-two" />
      <div className="intro-noise" />

      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 w-full max-w-xl text-center text-[#f9f2e8]">
        <p className="mb-5 text-[10px] uppercase tracking-[0.48em] text-[#d8b98f] sm:text-xs">Abdullah & Kabirah</p>
        <h1 className="intro-title">Before forever begins...</h1>
        <p className="mx-auto mt-6 max-w-sm text-sm leading-7 text-[#f7ede1]/65 sm:text-base">
          Some hearts are meant to be whole.
        </p>

        <div className="relative mx-auto mt-10 h-64 w-full max-w-sm sm:h-72">
          {!broken && (
            <motion.button
              type="button"
              aria-label="Break the heart"
              onClick={() => setBroken(true)}
              animate={{ scale: [1, 1.04, 1], y: [0, -5, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[7.5rem] leading-none text-[#d7a76d] drop-shadow-[0_0_28px_rgba(215,167,109,0.18)]"
            >
              ♥
            </motion.button>
          )}

          <AnimatePresence>
            {broken && !joined && (
              <>
                <motion.button
                  type="button"
                  aria-label="Drag the left half of the heart toward the other half"
                  drag="x"
                  dragConstraints={{ left: -120, right: 120 }}
                  dragElastic={0.12}
                  onDragStart={() => setDragging("left")}
                  onDrag={(_, info) => moveHeart("left", info.delta.x / 170)}
                  onDragEnd={() => setDragging(null)}
                  animate={{ x: positions.left * 70, rotate: -8, y: [0, -4, 0] }}
                  transition={{ y: { duration: 2, repeat: Infinity }, x: { type: "spring", stiffness: 180, damping: 18 } }}
                  className={`heart-half heart-half-left ${dragging === "left" ? "z-30" : "z-20"}`}
                >
                  <span>♥</span>
                </motion.button>
                <motion.button
                  type="button"
                  aria-label="Drag the right half of the heart toward the other half"
                  drag="x"
                  dragConstraints={{ left: -120, right: 120 }}
                  dragElastic={0.12}
                  onDragStart={() => setDragging("right")}
                  onDrag={(_, info) => moveHeart("right", info.delta.x / 170)}
                  onDragEnd={() => setDragging(null)}
                  animate={{ x: positions.right * 70, rotate: 8, y: [0, 4, 0] }}
                  transition={{ y: { duration: 2.2, repeat: Infinity }, x: { type: "spring", stiffness: 180, damping: 18 } }}
                  className={`heart-half heart-half-right ${dragging === "right" ? "z-30" : "z-20"}`}
                >
                  <span>♥</span>
                </motion.button>
                <motion.p animate={{ opacity: [0.35, 0.8, 0.35] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-[#f7ede1]/60">
                  Bring us back together
                </motion.p>
              </>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {joined && (
              <motion.div initial={{ opacity: 0, scale: 0.35 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 210, damping: 15 }} className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div animate={{ scale: [1, 1.18, 1], rotate: [0, 4, -4, 0] }} transition={{ duration: 1.1 }} className="text-8xl leading-none text-[#d7a76d]">♥</motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-4 text-3xl">🫶🏽</motion.div>
                <p className="mt-3 text-[10px] uppercase tracking-[0.4em] text-[#d8b98f]">Whole again</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!broken && <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">Tap the heart</p>}

        <AnimatePresence>
          {joined && (
            <motion.button type="button" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} onClick={onOpen} className="group relative mt-7 inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#d8b98f]/50 px-6 py-3 text-xs uppercase tracking-[0.28em] transition hover:border-[#f6dfbd]">
              <span className="absolute inset-0 translate-y-full bg-[#f6dfbd] transition-transform duration-300 group-hover:translate-y-0" />
              <Sparkles size={15} className="relative z-10" />
              <span className="relative z-10 group-hover:text-[#241b17]">Open our invitation</span>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}

function MemoryCard({ image, alt, caption, className, rotate }: MemoryCardProps) {
  return <motion.figure initial={{ opacity: 0, y: 80, rotate: rotate + 4 }} whileInView={{ opacity: 1, y: 0, rotate }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className={`memory-card ${className}`}><div className="memory-photo"><Image src={image} alt={alt} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" /></div><figcaption>{caption}</figcaption></motion.figure>;
}

export default function Home() {
  const [introOpen, setIntroOpen] = useState(true);

  return <main className="overflow-x-hidden">
    <AnimatePresence>{introOpen && <HeartIntro onOpen={() => setIntroOpen(false)} />}</AnimatePresence>
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#211814] text-white"><motion.div initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease: "easeOut" }} className="absolute inset-0"><Image src="/images/image1.jpg" alt="Abdullah and Kabirah" fill priority sizes="100vw" className="object-cover" /></motion.div><div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" /><motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 1.2, ease: "easeOut" }} className="relative mx-auto w-full max-w-5xl px-6 pb-16 text-center sm:pb-24"><p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/75">Together with their families</p><h2 className="text-6xl font-normal leading-none tracking-tight sm:text-8xl">Abdullah <span className="font-light italic text-[#e8caa4]">&</span> Kabirah</h2><p className="mx-auto mt-7 max-w-md text-base leading-relaxed text-white/80">With hearts full of gratitude, we invite you to celebrate the beginning of our forever.</p><a href="#story" className="mt-10 inline-block border-b border-white/50 pb-2 text-xs uppercase tracking-[0.28em] transition hover:border-white">Discover our story</a></motion.div></section>
    <section id="story" className="memory-section relative overflow-hidden px-5 py-24 sm:px-8 sm:py-36"><div className="memory-orbit memory-orbit-one" /><div className="memory-orbit memory-orbit-two" /><motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative z-10 mx-auto max-w-2xl text-center"><p className="text-xs uppercase tracking-[0.45em] text-[#8c6541]">A few beautiful moments</p><h2 className="memory-heading mt-5">Our story was never meant to fit inside a box.</h2><p className="mx-auto mt-6 max-w-md leading-8 text-[#66544a]">So we kept the little moments exactly how memories tend to live: scattered, imperfect and impossible to forget.</p></motion.div><div className="relative z-10 mx-auto mt-20 max-w-6xl lg:min-h-[1250px]"><MemoryCard image="/images/image2.jpg" alt="Abdullah and Kabirah at the beginning of their story" caption="Chapter I — it started quietly" rotate={-6} className="lg:absolute lg:left-[4%] lg:top-0 lg:w-[42%]" /><motion.div initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7, delay: 0.15 }} className="memory-note mx-auto my-10 max-w-xs lg:absolute lg:right-[9%] lg:top-[9%] lg:my-0"><span>01</span><p>Somewhere between an ordinary day and an unexpected conversation, everything became a little more interesting.</p></motion.div><MemoryCard image="/images/image3.jpg" alt="Abdullah and Kabirah sharing a beautiful connection" caption="A moment worth keeping" rotate={5} className="lg:absolute lg:right-[2%] lg:top-[32%] lg:w-[40%]" /><motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="memory-whisper mx-auto my-12 max-w-md text-center lg:absolute lg:left-[8%] lg:top-[46%] lg:my-0 lg:max-w-xs lg:text-left">"And somehow, without trying too hard, two separate stories began to feel like one."</motion.p><MemoryCard image="/images/image4.jpg" alt="Abdullah and Kabirah beginning forever" caption="The part where forever began to sound right" rotate={-3} className="lg:absolute lg:left-[24%] lg:top-[64%] lg:w-[46%]" /></div></section>
    <CelebrationExperience />
    <ScratchReveal />
    <ClosingExperience />
  </main>;
}
