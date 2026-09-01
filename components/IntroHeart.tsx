"use client";

import { AnimatePresence, motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { useState } from "react";

const LEFT_HALF_PATH = "M50,88 C15,65 0,40 0,22 C0,8 12,0 24,0 C36,0 46,8 50,20 Z";
const RIGHT_HALF_PATH = "M50,88 C85,65 100,40 100,22 C100,8 88,0 76,0 C64,0 54,8 50,20 Z";

type HeartHalfProps = { side: "left" | "right"; joined: boolean; onJoin: () => void };

function HeartHalf({ side, joined, onJoin }: HeartHalfProps) {
  const [dragging, setDragging] = useState(false);
  const isLeft = side === "left";
  const restOffset = isLeft ? -16 : 16;

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`Drag to join the ${side} half of the heart`}
      drag={joined ? false : "x"}
      dragMomentum={false}
      dragElastic={0.15}
      dragConstraints={{ left: -60, right: 60 }}
      onDragStart={() => setDragging(true)}
      onDragEnd={(_, info) => {
        setDragging(false);
        const pulledToCenter = isLeft ? info.offset.x > 34 : info.offset.x < -34;
        if (pulledToCenter) onJoin();
      }}
      animate={joined ? { x: 0, scale: 1.06 } : { x: restOffset, scale: dragging ? 1.05 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      whileTap={joined ? undefined : { scale: 1.08 }}
      className="absolute top-0 h-full w-1/2"
      style={{ [isLeft ? "left" : "right"]: 0, cursor: joined ? "default" : "grab" }}
    >
      <svg viewBox="0 0 100 90" className="h-full w-full overflow-visible">
        <path
          d={isLeft ? LEFT_HALF_PATH : RIGHT_HALF_PATH}
          fill={joined ? "#cf9fae" : "#f4d4dd"}
          stroke="#9a5f70"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}

export default function IntroHeart({ onComplete }: { onComplete: () => void }) {
  const [joined, setJoined] = useState(false);

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

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-xl text-center text-[#5b4a56]"
      >
        <p className="mb-5 text-[10px] uppercase tracking-[0.48em] text-[#9a5f70] sm:text-xs">Abdullah & Kabirah</p>
        <h1 className="intro-title">Before the story begins...</h1>
        <p className="mx-auto mt-6 max-w-sm text-sm leading-7 text-[#8a7488] sm:text-base">
          Two halves, drifting apart, until they find their way back to one another. Drag them together.
        </p>

        <div className="relative mx-auto mt-12 h-32 w-full max-w-[13rem] sm:h-36 sm:max-w-[15rem]">
          <motion.div animate={joined ? { opacity: 0, scale: 0.6 } : { opacity: 1 }} className="absolute inset-0">
            <HeartHalf side="left" joined={joined} onJoin={() => setJoined(true)} />
            <HeartHalf side="right" joined={joined} onJoin={() => setJoined(true)} />
          </motion.div>

          <AnimatePresence>
            {joined && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 240, damping: 16 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.22, 1] }}
                  transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 0.6 }}
                  className="text-7xl text-[#cf9fae] sm:text-8xl"
                >
                  ❤
                </motion.div>
                <p className="mt-3 text-[10px] uppercase tracking-[0.4em] text-[#9a5f70]">Whole again</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {joined && (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              onClick={onComplete}
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
  );
}
