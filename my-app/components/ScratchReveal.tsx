"use client";

import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };

export default function ScratchReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scratched, setScratched] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.globalCompositeOperation = "source-over";
      context.fillStyle = "#9b7654";
      context.fillRect(0, 0, rect.width, rect.height);
      context.fillStyle = "rgba(255,255,255,0.1)";
      for (let i = 0; i < 140; i += 1) {
        context.fillRect(Math.random() * rect.width, Math.random() * rect.height, 1, 1);
      }
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  const getPoint = (event: React.PointerEvent<HTMLCanvasElement>): Point => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const scratch = (from: Point, to: Point) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    context.globalCompositeOperation = "destination-out";
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = 42;
    context.beginPath();
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.stroke();
  };

  return (
    <section className="scratch-section relative overflow-hidden px-5 py-28 sm:py-36">
      <div className="scratch-card relative mx-auto max-w-2xl overflow-hidden border border-[#c8ad8c] bg-[#f8f1e8] px-6 py-16 text-center shadow-2xl sm:px-16">
        <div className="absolute inset-0 opacity-[0.12]" />
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.42em] text-[#8c6541]">A little secret awaits</p>
          <h2 className="mt-5 text-4xl sm:text-6xl">Scratch to reveal</h2>
          <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-[#66544a]">Some things are simply more exciting when they are discovered by hand.</p>

          <div className="relative mx-auto mt-12 aspect-[5/3] w-full max-w-xl select-none overflow-hidden rounded-[2px] border border-[#d4b995] bg-[#eadcc9]">
            <div className="absolute inset-0 flex flex-col items-center justify-center px-5">
              <p className="text-[10px] uppercase tracking-[0.42em] text-[#8c6541]">Save the date</p>
              <h3 className="mt-4 text-4xl sm:text-6xl">14 · 12 · 2026</h3>
              <div className="mx-auto my-6 h-px w-16 bg-[#c8ad8c]" />
              <div className="flex flex-col items-center gap-1 text-sm text-[#66544a] sm:flex-row sm:gap-5">
                <span>4:00 PM</span><span className="hidden sm:inline">·</span><span>Lagos, Nigeria</span>
              </div>
            </div>

            <canvas
              ref={canvasRef}
              className="absolute inset-0 z-20 h-full w-full touch-none cursor-crosshair"
              aria-label="Scratch the card to reveal the wedding date"
              onPointerDown={(event) => {
                event.currentTarget.setPointerCapture(event.pointerId);
                const point = getPoint(event);
                event.currentTarget.dataset.lastX = String(point.x);
                event.currentTarget.dataset.lastY = String(point.y);
                scratch(point, { x: point.x + 0.01, y: point.y + 0.01 });
              }}
              onPointerMove={(event) => {
                if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
                const point = getPoint(event);
                const from = {
                  x: Number(event.currentTarget.dataset.lastX ?? point.x),
                  y: Number(event.currentTarget.dataset.lastY ?? point.y),
                };
                scratch(from, point);
                event.currentTarget.dataset.lastX = String(point.x);
                event.currentTarget.dataset.lastY = String(point.y);
              }}
              onPointerUp={(event) => {
                event.currentTarget.releasePointerCapture(event.pointerId);
                setScratched(true);
              }}
            />
            {!scratched && <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center text-xs uppercase tracking-[0.3em] text-[#fff7ed]/80">Use your finger</div>}
          </div>

          {scratched && <p className="mt-8 text-xs uppercase tracking-[0.3em] text-[#8c6541]">Now you know our little secret ✦</p>}
        </div>
      </div>
    </section>
  );
}
