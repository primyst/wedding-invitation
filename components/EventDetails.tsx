"use client";

import { motion } from "motion/react";
import { Calendar, Clock, MapPin } from "lucide-react";

// TODO: replace with the real venue name, address and Google Maps share link.
const VENUE_NAME = "The Grand Terrace";
const VENUE_ADDRESS = "Eko Hotels & Suites, Plot 1415 Adetokunbo Ademola Street, Victoria Island, Lagos";
const MAPS_URL = "https://maps.google.com/?q=Eko+Hotels+and+Suites+Lagos";

const DETAILS = [
  { icon: Calendar, label: "Date", value: "Saturday, 14 December 2026" },
  { icon: Clock, label: "Time", value: "4:00 PM — reception follows" },
  { icon: MapPin, label: "Venue", value: `${VENUE_NAME}, ${VENUE_ADDRESS}` },
];

export default function EventDetails() {
  return (
    <section className="details-section relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-2xl text-center"
      >
        <p className="text-xs uppercase tracking-[0.45em] text-[#9a5f70]">Join us</p>
        <h2 className="memory-heading mt-5">Where to find us</h2>
        <p className="mx-auto mt-5 max-w-md leading-8 text-[#8a7488]">
          All the little details you need to be there with us, on the day our story turns a page.
        </p>
      </motion.div>

      <div className="relative z-10 mx-auto mt-14 flex max-w-xl flex-col gap-5">
        {DETAILS.map(({ icon: Icon, label, value }, index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="details-card flex items-center gap-4 rounded-[6px] px-6 py-5 text-left"
          >
            <span className="details-icon">
              <Icon size={18} />
            </span>
            <div>
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#9a5f70]">{label}</p>
              <p className="mt-1 leading-6 text-[#5b4a56]">{value}</p>
            </div>
          </motion.div>
        ))}

        <motion.a
          href={MAPS_URL}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mx-auto mt-3 inline-flex items-center gap-2 rounded-full border border-[#cf9fae]/60 bg-white px-6 py-3 text-xs uppercase tracking-[0.28em] text-[#9a5f70] shadow-sm transition hover:border-[#9a5f70]"
        >
          <MapPin size={14} />
          Open in Google Maps
        </motion.a>
      </div>
    </section>
  );
}
