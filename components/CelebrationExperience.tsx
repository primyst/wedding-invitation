"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function CelebrationExperience() {
  return (
    <>
      <section className="heritage-section relative min-h-[100svh] overflow-hidden text-white">
        <Image src="/images/image5.jpg" alt="Abdullah and Kabirah celebrating their heritage" fill sizes="100vw" className="object-cover" />
        <div className="heritage-overlay" />
        <div className="heritage-line heritage-line-one" />
        <div className="heritage-line heritage-line-two" />
        <motion.div
          initial={{ opacity: 0, y: 42 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex min-h-[100svh] items-end px-6 pb-16 sm:items-center sm:justify-center sm:pb-0"
        >
          <div className="max-w-3xl text-left sm:text-center">
            <p className="text-[10px] uppercase tracking-[0.52em] text-[#f6ddc4] sm:text-xs">Love, roots & celebration</p>
            <h2 className="heritage-title mt-6">One love.<br /><span>Many beautiful traditions.</span></h2>
            <p className="mt-8 max-w-xl text-base leading-8 text-white/75 sm:mx-auto sm:text-lg">
              A celebration of where we come from, the people who raised us, and the future we are about to build together.
            </p>
          </div>
        </motion.div>
        <div className="absolute bottom-6 right-6 z-10 text-[9px] uppercase tracking-[0.35em] text-white/45 sm:bottom-10 sm:right-10">Abdullah & Kabirah · 2026</div>
      </section>

      <section className="frame-section relative overflow-hidden px-5 py-28 text-[#5b4a56] sm:py-40">
        <div className="frame-blob frame-blob-one" />
        <div className="frame-blob frame-blob-two" />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-16 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <motion.div
            initial={{ opacity: 0, x: -40, rotate: -3 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="ornate-frame mx-auto w-full max-w-md"
          >
            <div className="ornate-frame-inner">
              <div className="relative aspect-square overflow-hidden bg-[#d7c0a3]">
                <Image src="/images/image9.jpg" alt="Illustration of Abdullah and Kabirah" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
            </div>
            <span className="frame-corner frame-corner-tl" />
            <span className="frame-corner frame-corner-tr" />
            <span className="frame-corner frame-corner-bl" />
            <span className="frame-corner frame-corner-br" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.12 }}
            className="text-center md:text-left"
          >
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#9a5f70]">One more thing</p>
            <h2 className="frame-title mt-6">The best part is that <em>you&apos;re</em> invited.</h2>
            <div className="mx-auto mt-7 h-px w-16 bg-[#cf9fae]/60 md:mx-0" />
            <p className="mx-auto mt-8 max-w-lg text-lg leading-8 text-[#7c6779] md:mx-0">
              Every memory becomes a little warmer when shared with the people who matter. We would be honoured to have you there as our next chapter begins.
            </p>
            <motion.p
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              className="font-script mt-10 text-3xl text-[#9a5f70]"
            >
              We saved you a place. ♡
            </motion.p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
