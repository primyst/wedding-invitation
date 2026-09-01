"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

// TODO: replace with the real date, time and timezone offset.
const WEDDING_DATE_ISO = "2026-12-14T16:00:00+01:00";

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, new Date(WEDDING_DATE_ISO).getTime() - Date.now());
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="countdown-unit">
        <span className="countdown-number">{String(value).padStart(2, "0")}</span>
      </div>
      <span className="countdown-label">{label}</span>
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const displayDate = new Date(WEDDING_DATE_ISO).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="countdown-section relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <p className="text-xs uppercase tracking-[0.45em] text-[#9a5f70]">Mark the date</p>
        <h2 className="countdown-heading mt-5">We&apos;re counting down to forever.</h2>
        <p className="mx-auto mt-4 max-w-md text-[#8a7488]">{displayDate}</p>

        <div className="mx-auto mt-12 flex max-w-xl items-center justify-center gap-3 sm:gap-6">
          {timeLeft ? (
            <>
              <Unit value={timeLeft.days} label="Days" />
              <Unit value={timeLeft.hours} label="Hours" />
              <Unit value={timeLeft.minutes} label="Mins" />
              <Unit value={timeLeft.seconds} label="Secs" />
            </>
          ) : (
            <>
              <Unit value={0} label="Days" />
              <Unit value={0} label="Hours" />
              <Unit value={0} label="Mins" />
              <Unit value={0} label="Secs" />
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}
