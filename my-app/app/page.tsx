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
  const [joined, setJoined] = useState(false);
  const [curtainOpen, setCurtainOpen] = useState(false);

  const join = () => {
    if (joined) return;
    setJoined(true);
    window.setTimeout(() => setCurtainOpen(true), 1000);
    window.setTimeout(onOpen, 1900);
  };

  return (
    <motion.section initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="intro fixed inset-0 z-50 flex min-h-[100svh] items-center justify-center overflow-hidden px-5">
      <div className="intro-glow intro-glow-one" /><div className="intro-glow intro-glow-two" /><div className="intro-noise" />
      <div className="relative z-10 w-full max-w-xl text-center text-[#f9f2e8]">
        <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="mb-5 text-[10px] uppercase tracking-[0.48em] text-[#d8b98f] sm:text-xs">Abdullah & Kabirah</p>
          <h1 className="intro-title">Two stories.<br /><em>One beginning.</em></h1>
          <p className="mx-auto mt-6 max-w-sm text-sm leading-7 text-[#f7ede1]/65 sm:text-base">Tap our initials to bring us together.</p>
        </motion.div>

        <div className="heart-join-stage relative mx-auto mt-10 h-64 w-full max-w-sm sm:h-72">
          <AnimatePresence mode="wait">
            {!joined ? (
              <motion.div key="pieces" className="absolute inset-0 flex items-center justify-center gap-8">
                <motion.button type="button" onClick={join} whileHover={{ y: -7, scale: 1.05 }} whileTap={{ scale: 0.92 }} animate={{ y: [0, -6, 0], rotate: [-3, -1, -3] }} transition={{ y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } }} className="intro-initial"><span>A</span></motion.button>
                <motion.div animate={{ opacity: [0.2, 0.75, 0.2], scale: [0.95, 1.05, 0.95] }} transition={{ duration: 2, repeat: Infinity }} className="text-2xl text-[#d8b98f]">&amp;</motion.div>
                <motion.button type="button" onClick={join} whileHover={{ y: -7, scale: 1.05 }} whileTap={{ scale: 0.92 }} animate={{ y: [0, 6, 0], rotate: [3, 1, 3] }} transition={{ y: { duration: 2.6, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 2.6, repeat: Infinity, ease: "easeInOut" } }} className="intro-initial"><span>K</span></motion.button>
                <motion.div animate={{ opacity: [0.25, 0.7, 0.25] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.34em] text-white/45">Tap to join us</motion.div>
              </motion.div>
            ) : (
              <motion.div key="joined" className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div initial={{ scale: 0.45, opacity: 0 }} animate={{ scale: [0.45, 1.18, 1], opacity: 1 }} transition={{ duration: 0.85 }} className="complete-heart">♥</motion.div>
                <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: [0, 1.2, 1], opacity: 1 }} transition={{ delay: 0.25, duration: 0.55 }} className="mt-3 text-3xl">🫶🏽</motion.div>
                <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-3 text-[10px] uppercase tracking-[0.4em] text-[#d8b98f]">Together, at last</motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {joined && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[9px] uppercase tracking-[0.3em] text-white/35">Our story begins here</motion.p>}
      </div>

      <AnimatePresence>
        {curtainOpen && <>
          <motion.div initial={{ x: 0 }} animate={{ x: "-101%" }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }} className="intro-curtain intro-curtain-left" />
          <motion.div initial={{ x: 0 }} animate={{ x: "101%" }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }} className="intro-curtain intro-curtain-right" />
        </>}
      </AnimatePresence>
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
    <CelebrationExperience /><ScratchReveal /><ClosingExperience />
  </main>;
}
