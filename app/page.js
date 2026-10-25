
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./globals.css"

export default function Home() {
  const pageRef = useRef(null);
  const stageRef = useRef(null);
  const carRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const stage = stageRef.current;
      const car = carRef.current;

      // Intro animation
      gsap.from(".hero-kicker", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".hero-title", {
        y: 60,
        opacity: 0,
        duration: 1,
        delay: 0.15,
        ease: "power3.out",
      });

      gsap.from(".hero-description", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.35,
      });


      const carTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: "+=1600",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      carTimeline
        .fromTo(
          car,
          {
            x: () => -window.innerWidth - 200,
          },
          {
            x: () => window.innerWidth,
            ease: "none",
          },
          0
        )
        .to(
          ".hero-copy",
          {
            y: -100,
            opacity: 0,
            ease: "none",
          },
          0.15
        )
        .to(
          ".scroll-cue",
          {
            opacity: 0,
            ease: "none",
          },
          0
        )
        .fromTo(
          ".scroll-progress",
          {
            scaleX: 0,
          },
          {
            scaleX: 1,
            ease: "none",
          },
          0
        );


      gsap.utils.toArray(".stat-number").forEach((element) => {
        const target = Number(element.dataset.value);

        gsap.fromTo(
          element,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              once: true,
            },
          }
        );
      });


      gsap.from(".closing-content", {
        y: 60,
        opacity: 0,
        scale: 0.98,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".closing-section",
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".stats-section h2", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 70%",
          once: true,
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="min-h-screen overflow-x-clip bg-[#070707] text-white">
      <section
        ref={stageRef}
        className="hero-stage relative flex min-h[100svh] flex-col items-center justify-center overflow-hidden px-5 text-center"
      >
        <div className="scroll-progress absolute left-0 top-0 z-30 h-1 w-full origin-left bg-lime-300" />

        <div className="hero-copy relative z-10 mx-auto max-w-5xl">
          <p className="hero-kicker mb-6 text-xs font-semibold uppercase tracking-[0.45em] text-lime-300 sm:text-sm">
            Creative Digital Experiences
          </p>

          <h1 className="hero-title text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            WELCOME
            <span className="mt-2 block text-lime-300">ITZFIZZ</span>
          </h1>

          <p className="hero-description mx-auto mt-7 max-w-xl text-sm leading-7 text-neutral-400 sm:text-base">
            We turn bold ideas into digital experiences that move people
            forward.
          </p>

          <div className="mt-9 inline-flex items-center gap-3 rounded-full border border-white/15 px-5 py-3 text-xs uppercase tracking-[0.2em] text-neutral-300">
            <span className="h-2 w-2 rounded-full bg-lime-300" />
            Scroll to explore
          </div>
        </div>

        <div className="car-track pointer-events-none absolute inset-x-0 bottom-[9%] z-20">
          <img
            ref={carRef}
            className="car-image block w-[65vw] max-w[50px] object-contain sm:w-[55vw]"
            src="https://png.pngtree.com/png-clipart/20230408/ourmid/pngtree-car-top-view-black-png-image_6679292.png"
            alt="Sports car"
          />
        </div>

        <div className="road-line absolute bottom-[8%] left-0 h-px w-full" />

        <div className="scroll-cue absolute bottom-5 left-0 right-0 z-20 text-[10px] uppercase tracking-[0.4em] text-neutral-500">
          Keep scrolling ↓
        </div>

        <span className="absolute right-5 top-7 text-xs font-semibold tracking-[0.3em] text-neutral-500">
          IF / 01
        </span>
      </section>

      {/* STATISTICS */}
      <section className="stats-section relative px-5 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-lime-300">
            Numbers that matter
          </p>

          <h2 className="max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
            Ideas become impact when creativity meets execution.
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <StatCard
              value="98"
              suffix="%"
              label="Commitment to quality"
            />
            <StatCard
              value="24"
              suffix="/7"
              label="Always moving forward"
            />
            <StatCard
              value="3"
              suffix="x"
              label="Think beyond ordinary"
            />
          </div>
        </div>
      </section>

      <section className="closing-section border-t border-white/10 px-5 py-24 sm:px-10 sm:py-32">
        <div className="closing-content mx-auto max-w-6xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-lime-300">
            The next move is yours
          </p>

          <h2 className="max-w-4xl text-4xl font-black uppercase leading-tight sm:text-6xl md:text-7xl">
            Make your next idea
            <span className="block text-lime-300">impossible to ignore.</span>
          </h2>

          <p className="mt-7 max-w-xl text-sm leading-7 text-neutral-400 sm:text-base">
            Great digital experiences combine thoughtful design, purposeful
            motion, and details that make every interaction count.
          </p>

          <a
            href="#"
            onClick={(event) => event.preventDefault()}
            className="mt-9 inline-flex rounded-full bg-lime-300 px-7 py-4 text-sm font-bold text-black transition duration-300 hover:scale-105 hover:bg-lime-200"
          >
            Explore the experience ↗
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-6 text-center text-xs tracking-wide text-neutral-500">
        ITZFIZZ — Creative digital experiences
      </footer>
    </main>
  );
}

function StatCard({ value, suffix, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white[0.03] p-7 transition duration-300 hover:-translate-y-2 hover:border-lime-300/50 sm:p-8">
      <div className="flex items-baseline gap-1">
        <span
          className="stat-number text-5xl font-black tracking-tight sm:text-6xl"
          data-value={value}
        >
          0
        </span>
        <span className="text-3xl font-bold text-lime-300">{suffix}</span>
      </div>

      <p className="mt-5 text-sm text-neutral-400">{label}</p>
    </div>
  );
}
