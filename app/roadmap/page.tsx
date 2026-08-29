"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle,
  Circle,
  Clock,
  BookOpen,
  Code2,
  Rocket,
  Trophy,
  ChevronDown,
} from "lucide-react";

const roadmap = [
  {
    phase: "01",
    title: "Strengthen Your Foundations",
    duration: "2–3 weeks",
    description:
      "Build the mathematical and programming foundations needed for AI engineering.",
    status: "current",
    skills: [
      {
        name: "Statistics",
        level: "Beginner → Intermediate",
        duration: "5 days",
        resources: 4,
      },
      {
        name: "SQL",
        level: "Beginner → Intermediate",
        duration: "5 days",
        resources: 5,
      },
      {
        name: "Python for Data Science",
        level: "Intermediate → Advanced",
        duration: "7 days",
        resources: 6,
      },
    ],
  },
  {
    phase: "02",
    title: "Master Machine Learning",
    duration: "3–4 weeks",
    description:
      "Learn the core machine learning concepts required for an AI Engineer.",
    status: "next",
    skills: [
      {
        name: "Supervised Learning",
        level: "Beginner → Advanced",
        duration: "7 days",
        resources: 5,
      },
      {
        name: "Unsupervised Learning",
        level: "Beginner → Intermediate",
        duration: "5 days",
        resources: 4,
      },
      {
        name: "Model Evaluation",
        level: "Beginner → Advanced",
        duration: "4 days",
        resources: 4,
      },
    ],
  },
  {
    phase: "03",
    title: "Deep Learning & PyTorch",
    duration: "4–5 weeks",
    description:
      "Develop practical deep learning skills and learn how to build neural networks.",
    status: "locked",
    skills: [
      {
        name: "Neural Networks",
        level: "Beginner → Advanced",
        duration: "7 days",
        resources: 5,
      },
      {
        name: "PyTorch",
        level: "Beginner → Advanced",
        duration: "10 days",
        resources: 7,
      },
      {
        name: "Computer Vision",
        level: "Beginner → Intermediate",
        duration: "7 days",
        resources: 5,
      },
    ],
  },
  {
    phase: "04",
    title: "Become Job Ready",
    duration: "3–4 weeks",
    description:
      "Turn your knowledge into projects and prepare for real AI engineering interviews.",
    status: "locked",
    skills: [
      {
        name: "AI Projects",
        level: "2–3 portfolio projects",
        duration: "14 days",
        resources: 6,
      },
      {
        name: "Model Deployment",
        level: "Beginner → Intermediate",
        duration: "5 days",
        resources: 5,
      },
      {
        name: "AI Engineering Interview",
        level: "Preparation",
        duration: "7 days",
        resources: 8,
      },
    ],
  },
];

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* NAVBAR */}

      <nav className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link
            href="/"
            className="flex items-center gap-3"
          >

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Brain size={19} />
            </div>

            <span className="text-xl font-bold">
              SkillGap AI
            </span>

          </Link>

          <span className="text-sm text-slate-400">
            Your Learning Roadmap
          </span>

        </div>

      </nav>


      {/* MAIN */}

      <div className="mx-auto max-w-5xl px-6 py-10">

        {/* BACK */}

        <Link
          href="/analysis"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600"
        >
          <ArrowLeft size={16} />
          Back to skill analysis
        </Link>


        {/* HEADER */}

        <div className="mt-8 rounded-3xl bg-indigo-600 p-8 text-white md:p-10">

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold">
                <Rocket size={14} />
                PERSONALIZED ROADMAP
              </div>

              <h1 className="mt-5 text-4xl font-bold md:text-5xl">
                Your AI Engineer Roadmap
              </h1>

              <p className="mt-4 max-w-2xl text-indigo-100">
                A prioritized learning path based on the skill gaps
                identified in your analysis.
              </p>

            </div>


            {/* SCORE */}

            <div className="shrink-0 rounded-2xl bg-white/10 p-5 text-center backdrop-blur">

              <p className="text-sm text-indigo-100">
                Current Match
              </p>

              <p className="mt-1 text-4xl font-bold">
                62%
              </p>

              <p className="mt-1 text-xs text-indigo-200">
                Target: 85%+
              </p>

            </div>

          </div>


          {/* PROGRESS */}

          <div className="mt-8">

            <div className="mb-2 flex justify-between text-sm">

              <span className="text-indigo-100">
                Roadmap Progress
              </span>

              <span className="font-semibold">
                0 / 4 phases
              </span>

            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/20">

              <div
                className="h-full rounded-full bg-white"
                style={{ width: "8%" }}
              />

            </div>

          </div>

        </div>


        {/* SUMMARY */}

        <div className="mt-8 grid gap-5 md:grid-cols-3">

          <Summary
            icon={<Clock size={21} />}
            title="12–16 weeks"
            text="Estimated learning time"
          />

          <Summary
            icon={<BookOpen size={21} />}
            title="12 skills"
            text="Skills in your roadmap"
          />

          <Summary
            icon={<Trophy size={21} />}
            title="85%+"
            text="Target job readiness"
          />

        </div>


        {/* ROADMAP */}

        <div className="mt-10">

          <div className="mb-6">

            <h2 className="text-2xl font-bold">
              Learning Path
            </h2>

            <p className="mt-2 text-slate-500">
              Complete each phase in order for the best results.
            </p>

          </div>


          <div className="space-y-6">

            {roadmap.map((phase) => (

              <Phase
                key={phase.phase}
                phase={phase}
              />

            ))}

          </div>

        </div>


        {/* FINAL CTA */}

        <div className="mt-10 rounded-3xl border border-indigo-100 bg-indigo-50 p-8 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm">
            <Rocket size={27} />
          </div>

          <h2 className="mt-5 text-2xl font-bold">
            Ready to close your skill gap?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Start with your highest-priority skill and work your way
            through the roadmap.
          </p>

          <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white hover:bg-indigo-700">
            Start Learning
            <ArrowRight size={18} />
          </button>

        </div>


        {/* FOOTER */}

        <p className="mt-8 text-center text-xs text-slate-400">
          Roadmap recommendations are demonstration data.
          AI-powered recommendations will be connected through the backend.
        </p>

      </div>

    </main>
  );
}


/* SUMMARY CARD */

function Summary({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {

  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-5">

      <div className="flex items-center gap-4">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
          {icon}
        </div>

        <div>

          <p className="font-bold text-slate-900">
            {title}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {text}
          </p>

        </div>

      </div>

    </div>

  );
}


/* PHASE */

function Phase({
  phase,
}: {
  phase: {
    phase: string;
    title: string;
    duration: string;
    description: string;
    status: string;
    skills: {
      name: string;
      level: string;
      duration: string;
      resources: number;
    }[];
  };
}) {

  const isLocked = phase.status === "locked";
  const isCurrent = phase.status === "current";

  return (

    <div
      className={`overflow-hidden rounded-2xl border bg-white ${
        isCurrent
          ? "border-indigo-300 shadow-lg shadow-indigo-100"
          : "border-slate-200"
      }`}
    >

      {/* PHASE HEADER */}

      <div className="border-b border-slate-100 p-6">

        <div className="flex items-start gap-4">

          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
              isCurrent
                ? "bg-indigo-600 text-white"
                : isLocked
                ? "bg-slate-100 text-slate-400"
                : "bg-emerald-100 text-emerald-600"
            }`}
          >

            {isLocked ? (
              <Circle size={21} />
            ) : (
              phase.phase
            )}

          </div>


          <div className="flex-1">

            <div className="flex flex-col justify-between gap-2 md:flex-row">

              <div>

                <div className="flex flex-wrap items-center gap-2">

                  <h3 className="text-xl font-bold text-slate-900">
                    {phase.title}
                  </h3>

                  {isCurrent && (
                    <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                      START HERE
                    </span>
                  )}

                </div>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {phase.description}
                </p>

              </div>


              <div className="shrink-0">

                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                  <Clock size={13} />
                  {phase.duration}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* SKILLS */}

      <div className="divide-y divide-slate-100">

        {phase.skills.map((skill, index) => (

          <div
            key={skill.name}
            className={`flex items-center gap-4 p-5 ${
              isLocked ? "opacity-60" : ""
            }`}
          >

            {/* STATUS */}

            <div className="shrink-0">

              {isCurrent && index === 0 ? (

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle size={19} />
                </div>

              ) : (

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <Circle size={18} />
                </div>

              )}

            </div>


            {/* INFO */}

            <div className="min-w-0 flex-1">

              <p className="font-semibold text-slate-800">
                {skill.name}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {skill.level}
              </p>

            </div>


            {/* DURATION */}

            <div className="hidden items-center gap-1 text-xs text-slate-400 sm:flex">
              <Clock size={13} />
              {skill.duration}
            </div>


            {/* RESOURCES */}

            <div className="hidden items-center gap-1 text-xs text-slate-400 md:flex">
              <BookOpen size={13} />
              {skill.resources} resources
            </div>


            <ChevronDown
              size={17}
              className="text-slate-300"
            />

          </div>

        ))}

      </div>

    </div>

  );
}