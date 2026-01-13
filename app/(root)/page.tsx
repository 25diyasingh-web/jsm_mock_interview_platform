"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import { motion } from "framer-motion";
import { Brain, TrendingUp, Target } from "lucide-react";
import { dummyInterviews } from "@/constants";

/* ---------------- TYPES ---------------- */

type UserInterview = {
  _id: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt: string;
};

/* ---------------- ANIMATIONS ---------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/* ---------------- PAGE ---------------- */

const Page = () => {
  const [yourInterviews, setYourInterviews] = useState<UserInterview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await fetch("/api/interview");
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setYourInterviews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Failed to fetch interviews", err);
        setYourInterviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice on real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="max-sm:hidden"
        >
          <Image
            src="/robot.png"
            alt="robot"
            width={400}
            height={400}
            className="pointer-events-none select-none"
          />
        </motion.div>
      </section>

      {/* ================= WHY ================= */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="flex flex-col gap-12 py-10"
      >
        <h2 className="text-4xl font-bold text-center">
          Smarter Practice, Faster Growth
        </h2>

        <div className="grid md:grid-cols-3 gap-10 text-center">
          <WhyCard
            icon={<Brain className="w-7 h-7 text-blue-600" />}
            title="AI-Driven Interviewing"
            desc="Interviews driven by AI that adjust question difficulty, follow-ups, and direction based on your responses."
          />
          <WhyCard
            icon={<TrendingUp className="w-7 h-7 text-green-600" />}
            title="Accelerated Skill Growth"
            desc="Convert every interview effort into measured, quantitative skill development."
          />
          <WhyCard
            icon={<Target className="w-7 h-7 text-purple-600" />}
            title="Built for Real Interviews"
            desc="Designed to replicate the organization, time, and decision-making pressure of a genuine interview."
          />
        </div>
      </motion.section>

      {/* ================= YOUR INTERVIEWS ================= */}
      <section className="flex flex-col gap-6 mt-10">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {loading ? (
            <p>Loading...</p>
          ) : yourInterviews.length === 0 ? (
            <p className="text-gray-500">
              No interviews yet. Start one to see it here.
            </p>
          ) : (
            yourInterviews.slice(0, 2).map((interview) => (
              <InterviewCard
                key={interview._id}
                interviewId={interview._id}
                role={interview.role}
                type={interview.type}
                techStack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          )}
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

/* ---------------- COMPONENTS ---------------- */

const WhyCard = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <motion.div
    whileHover={{ y: -6, scale: 1.04 }}
    transition={{ type: "spring", stiffness: 260, damping: 18 }}
    className="p-7 rounded-2xl bg-grey border border-white/10 shadow-sm hover:border-white/20 cursor-pointer"
  >
    <div className="flex justify-center mb-5">{icon}</div>

    <h3 className="font-semibold text-xl text-white mb-3">
      {title}
    </h3>

    <p className="text-gray-400 text-base leading-relaxed">
      {desc}
    </p>
  </motion.div>
);
