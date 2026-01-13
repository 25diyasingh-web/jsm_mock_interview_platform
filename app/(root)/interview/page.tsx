"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const InterviewFormPage = () => {
  const router = useRouter();

  // TEMP valid ObjectId (replace later with auth)
  const userId = "656a9f8b9c1e8a0012a3b456";

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const [answers, setAnswers] = useState({
    role: "",
    level: "",
    type: "",
    techstack: [] as string[],
    amount: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const isEmpty = (value: string | string[]) =>
    Array.isArray(value) ? value.length === 0 : !value;

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const { role, level, type, amount, techstack } = answers;
    if (!role || !level || !type || !amount || techstack.length === 0) return;

    setLoading(true);
    setLoadingStep(0);

    const animationFlow = async () => {
        await sleep(1200);
        setLoadingStep(1);

        await sleep(1600);
        setLoadingStep(2);

        await sleep(1200);
};


    const apiCall = fetch("/api/interview/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role,
        level,
        type,
        techstack: techstack.join(", "),
        amount,
        userId,
      }),
    }).then((res) => res.json());

    try {
      const [, apiResult] = await Promise.all([
        animationFlow(),
        apiCall,
      ]);

      if (apiResult.success) {
        router.push("/");
      } else {
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen step={loadingStep} />;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-4">
        <h2 className="text-white text-2xl font-bold mb-10 tracking-wide">
          <span className="border-b-2 border-white pb-1">
            Configure Your Interview
          </span>
        </h2>

        <QuestionBox
          title="What role are you preparing for?"
          showError={submitted && isEmpty(answers.role)}
        >
          {["Frontend", "Backend", "Full Stack", "Design", "UX"].map((opt) => (
            <OptionButton
              key={opt}
              label={opt}
              selected={answers.role === opt}
              onClick={() => setAnswers((p) => ({ ...p, role: opt }))}
            />
          ))}
        </QuestionBox>

        <QuestionBox
          title="Experience level"
          showError={submitted && isEmpty(answers.level)}
        >
          {["Beginner", "Intermediate", "Advanced"].map((opt) => (
            <OptionButton
              key={opt}
              label={opt}
              selected={answers.level === opt}
              onClick={() => setAnswers((p) => ({ ...p, level: opt }))}
            />
          ))}
        </QuestionBox>

        <QuestionBox
          title="Interview type"
          showError={submitted && isEmpty(answers.type)}
        >
          {["Technical", "Behavioral", "Mixed"].map((opt) => (
            <OptionButton
              key={opt}
              label={opt}
              selected={answers.type === opt}
              onClick={() => setAnswers((p) => ({ ...p, type: opt }))}
            />
          ))}
        </QuestionBox>

        <QuestionBox title="Tech stack (multiple selections allowed)">
          {[
            "React",
            "Next.js",
            "Node.js",
            "MongoDB",
            "JavaScript",
            "TypeScript",
            "Python",
            "Java",
          ].map((tech) => {
            const selected = answers.techstack.includes(tech);
            return (
              <OptionButton
                key={tech}
                label={tech}
                selected={selected}
                onClick={() =>
                  setAnswers((p) => ({
                    ...p,
                    techstack: selected
                      ? p.techstack.filter((t) => t !== tech)
                      : [...p.techstack, tech],
                  }))
                }
              />
            );
          })}
        </QuestionBox>

        <QuestionBox
          title="How many questions should the interview have?"
          showError={submitted && isEmpty(answers.amount)}
        >
          <input
            type="number"
            min={1}
            max={20}
            value={answers.amount}
            onChange={(e) =>
              setAnswers((p) => ({ ...p, amount: e.target.value }))
            }
            className="w-32 bg-transparent border border-white/40 rounded-lg px-3 py-2 text-white"
          />
        </QuestionBox>

        <button
          type="submit"
          className="w-full mt-4 py-3 rounded-xl bg-white/20 text-white font-semibold hover:bg-white/30"
        >
          ✨ Start Interview ✨
        </button>
      </form>
    </div>
  );
};

export default InterviewFormPage;

/* ---------------- COMPONENTS ---------------- */

const QuestionBox = ({
  title,
  children,
  showError,
}: {
  title: string;
  children: React.ReactNode;
  showError?: boolean;
}) => (
  <div className="relative border border-white/30 rounded-xl p-4">
    {showError && (
      <span className="absolute top-2 right-3 text-red-500">*</span>
    )}
    <p className="text-white text-sm mb-3">{title}</p>
    <div className="flex flex-wrap gap-3">{children}</div>
  </div>
);

const OptionButton = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2 rounded-lg border ${
      selected
        ? "border-white bg-white/20"
        : "border-white/40 hover:bg-white/10"
    }`}
  >
    {selected && "✔ "} {label}
  </button>
);

const LoadingScreen = ({ step }: { step: number }) => {
  const messages = [
    "Capturing your preferences...",
    "Generating a customized interview...",
    "Loading your home page...",
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-white">
      <div className="hourglass text-6xl">⏳</div>

      <p className="text-lg font-medium tracking-wide text-white/80 text-center">
        {messages[step]}
      </p>

      <style jsx>{`
        .hourglass {
          display: inline-block;
          transform-origin: center;
          animation: swing 1.6s ease-in-out infinite;
        }

        @keyframes swing {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-20deg);
          }
          50% {
            transform: rotate(0deg);
          }
          75% {
            transform: rotate(20deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
};
