"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function ClosingExperience() {
  const [letterOpen, setLetterOpen] = useState(false);

  return (
    <section className="closing-experience relative min-h-[100svh] overflow-hidden text-white">
      <Image src="/images/image10.jpg" alt="Abdullah and Kabirah beginning their next chapter" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#3c2c3a]/95 via-[#3c2c3a]/25 to-black/15" />
      <div className="absolute inset-0 closing-vignette" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-end px-6 pb-16 text-center sm:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] uppercase tracking-[0.42em] text-[#f6ddc4]/75"
        >
          One last thing
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.9 }}
          className="font-display mt-5 max-w-3xl text-5xl leading-[0.96] sm:text-8xl"
        >
          And so, our next chapter begins.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="mt-6 max-w-md text-base leading-7 text-white/70"
        >
          Before you leave, there&apos;s a small note waiting for you.
        </motion.p>

        <motion.button
          type="button"
          onClick={() => setLetterOpen(true)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="wax-seal group mt-9 grid h-20 w-20 place-items-center rounded-full border border-[#f6ddc4]/35 text-xl text-[#fdf7f6] shadow-2xl"
          aria-label="Open Abdullah and Kabirah's final note"
        >
          <span className="relative z-10">A&K</span>
        </motion.button>
        <p className="mt-3 text-[9px] uppercase tracking-[0.3em] text-white/45">Tap the seal</p>
      </div>

      <AnimatePresence>
        {letterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#3c2c3a]/85 p-5 backdrop-blur-sm"
            onClick={() => setLetterOpen(false)}
          >
            <motion.article
              initial={{ opacity: 0, y: 45, rotateX: -12, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              onClick={(event) => event.stopPropagation()}
              className="closing-letter relative w-full max-w-xl overflow-hidden px-7 py-12 text-center text-[#5b4a56] shadow-2xl sm:px-14 sm:py-16"
            >
              <div className="closing-letter-line absolute left-6 right-6 top-6 sm:left-10 sm:right-10 sm:top-10" />
              <p className="text-[10px] uppercase tracking-[0.42em] text-[#9a5f70]">With love</p>
              <h3 className="font-display mt-6 text-4xl leading-tight sm:text-6xl">Thank you for being part of our story.</h3>
              <p className="mx-auto mt-7 max-w-md text-base leading-8 text-[#8a7488] sm:text-lg">
                Every chapter becomes more beautiful because of the people who share it with us. We are grateful that you took this little journey with us.
              </p>
              <p className="font-script mt-9 text-3xl text-[#9a5f70]">Abdullah & Kabirah</p>
              <button
                type="button"
                onClick={() => setLetterOpen(false)}
                className="mt-10 text-[10px] uppercase tracking-[0.32em] text-[#9a5f70] underline decoration-[#cf9fae]/60 underline-offset-8"
              >
                Close the letter
              </button>
              <p className="mt-14 text-[9px] uppercase tracking-[0.28em] text-[#9a5f70]/55">Crafted by Primyst</p>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
