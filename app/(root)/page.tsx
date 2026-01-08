"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { dummyInterviews } from "@/constants";
import InterviewCard from "@/components/InterviewCard";
import { motion } from "framer-motion";
import { Brain, TrendingUp, Target } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Page = () => {
  return (
    <>
      {/* ================= HERO / CTA ================= */}
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice on real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        {/* FLOATING ROBOT */}
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="max-sm:hidden"
        >
          <Image
            src="/robot.png"
            alt="robo-dude"
            width={400}
            height={400}
            className="pointer-events-none select-none"
          />
        </motion.div>
      </section>

     {/* ================= WHY SECTION ================= */}
<motion.section
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  variants={fadeUp}
  className="relative flex flex-col gap-14 mt-4 py-20 overflow-hidden"
>
  {/* WAVY ROCKET BACKGROUND */}
  <motion.div
    className="absolute left-0 bottom-0 pointer-events-none select-none opacity-30 z-0 text-[90px]"
    animate={{
      x: [0, 120, 260, 420, 650, 720, 800],
      y: [0, -60, -140, -100, -200, -120, -350],
      rotate: [-10, 5, -5, 10, -5, 5, -20],
      scale: [0.8, 0.9, 1.0, 1.05, 1.1, 1.02, 1.15],
}}

    transition={{
      duration: 15,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    }}
  >
    🚀
  </motion.div>

  {/* TITLE */}
  <h2 className="text-4xl font-bold text-center tracking-tight relative z-10">
    Smarter Practice, Faster Growth
  </h2>

  {/* CARDS */}
  <div className="grid md:grid-cols-3 gap-10 text-center relative z-10">
    {/* CARD 1 */}
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="p-6 md:ml-4 rounded-2xl bg-grey shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group cursor-pointer max-w-sm mx-auto"
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-50 mb-5 group-hover:scale-110 transition-transform duration-300">
        <Brain className="w-7 h-7 text-blue-600" />
      </div>
      <h3 className="font-semibold text-xl mb-3">AI-Driven Interviewing</h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        Adaptive questions, instant analysis, and realistic simulation built to
        mirror top-tier company interviews.
      </p>
    </motion.div>

    {/* CARD 2 */}
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="p-6 rounded-2xl bg-grey shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group cursor-pointer max-w-sm mx-auto"
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-green-50 mb-5 group-hover:scale-110 transition-transform duration-300">
        <TrendingUp className="w-7 h-7 text-green-600" />
      </div>
      <h3 className="font-semibold text-xl mb-3">Accelerated Skill Growth</h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        Progress faster with targeted feedback designed to eliminate
        weaknesses and reinforce strengths.
      </p>
    </motion.div>

    {/* CARD 3 */}
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="p-6 md:mr-4 rounded-2xl bg-grey shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group cursor-pointer max-w-sm mx-auto"
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-purple-50 mb-5 group-hover:scale-110 transition-transform duration-300">
        <Target className="w-7 h-7 text-purple-600" />
      </div>
      <h3 className="font-semibold text-xl mb-3">Built for Real Interviews</h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        Every session mimics real interview pressure, pacing, and
        decision-making — so you&apos;re never caught off-guard.
      </p>
    </motion.div>
  </div>
</motion.section>


      {/* ================= YOUR INTERVIEWS ================= */}
      <section className="flex flex-col gap-6 mt-10">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id} />
          ))}
        </div>
      </section>

      {/* ================= TAKE AN INTERVIEW ================= */}
      <section className="flex flex-col gap-6 mt-12">
        <h2>Take an Interview</h2>

        <div className="interviews-section">
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Page;
