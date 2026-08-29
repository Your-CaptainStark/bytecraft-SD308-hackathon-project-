"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Target,
  BookOpen,
} from "lucide-react";

type SkillStatus = "strong" | "improve" | "critical";

type Skill = {
  name: string;
  current: number;
  required: number;
  status: SkillStatus;
};

type AnalysisResult = {
  success: boolean;
  target_role: string;
  match_percentage: number;
  detected_skills?: string[];
  skills: Skill[];
  message?: string;
};

export default function AnalysisPage() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const savedResult = localStorage.getItem("analysisResult");

      if (!savedResult) {
        setError(
          "No analysis result found. Please upload your resume and analyze it first."
        );
        return;
      }

      const result: AnalysisResult = JSON.parse(savedResult);

      if (!result.success) {
        setError(result.message || "Analysis failed.");
        return;
      }

      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setError("Unable to load analysis results.");
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />

          <p className="mt-4 font-medium text-slate-600">
            Loading your analysis...
          </p>
        </div>
      </main>
    );
  }

  if (error || !analysis) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">

          <XCircle className="mx-auto text-red-500" size={45} />

          <h1 className="mt-4 text-xl font-bold text-slate-900">
            Analysis unavailable
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {error || "No analysis data found."}
          </p>

          <Link
            href="/upload"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Upload Resume
            <ArrowRight size={18} />
          </Link>

        </div>
      </main>
    );
  }

  const skills = analysis.skills || [];

  const strongSkills = skills.filter(
    (skill) => skill.status === "strong"
  );

  const improveSkills = skills.filter(
    (skill) => skill.status === "improve"
  );

  const criticalSkills = skills.filter(
    (skill) => skill.status === "critical"
  );

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

          <div className="text-sm text-slate-400">
            Skill Analysis
          </div>

        </div>

      </nav>


      {/* MAIN */}

      <div className="mx-auto max-w-7xl px-6 py-10">


        {/* BACK */}

        <Link
          href="/roles"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600"
        >
          <ArrowLeft size={16} />
          Change target role
        </Link>


        {/* HEADER */}

        <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>

            <div className="flex items-center gap-2">

              <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                TARGET ROLE
              </span>

            </div>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
  {analysis.target_role}
</h1>

            <p className="mt-2 text-slate-500">
              Here's how your current skills compare with the
              requirements for your target role.
            </p>

          </div>

          <Link
            href="/roadmap"
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700"
          >
            View My Roadmap
            <ArrowRight size={18} />
          </Link>

        </div>


        {/* SCORE CARDS */}

        <div className="mt-8 grid gap-5 md:grid-cols-4">

          {/* MATCH SCORE */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Overall Match
                </p>

<p className="mt-2 text-4xl font-bold text-indigo-600">
  {analysis.match_percentage}%
</p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                <Target size={25} />
              </div>

            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">

              <div
                className="h-full rounded-full bg-indigo-600"
                style={{ width: `${analysis.match_percentage}%` }}
              />

            </div>

            <p className="mt-3 text-xs text-slate-400">
              You're on your way — keep building.
            </p>

          </div>


          {/* STRONG */}

          <StatCard
            icon={<CheckCircle size={22} />}
            label="Strong Skills"
            value={strongSkills.length}
            description="Skills you're ready to use"
            type="strong"
          />


          {/* IMPROVE */}

          <StatCard
            icon={<AlertTriangle size={22} />}
            label="Needs Improvement"
            value={improveSkills.length}
            description="Skills to strengthen"
            type="improve"
          />


          {/* CRITICAL */}

          <StatCard
            icon={<XCircle size={22} />}
            label="Critical Gaps"
            value={criticalSkills.length}
            description="High-priority skills"
            type="critical"
          />

        </div>


        {/* SKILL COMPARISON */}

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white">

          <div className="border-b border-slate-200 p-6">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                <TrendingUp size={21} />
              </div>

              <div>

                <h2 className="text-xl font-bold">
                  Skill Gap Analysis
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your current proficiency compared with what's expected.
                </p>

              </div>

            </div>

          </div>


          {/* LEGEND */}

          <div className="flex flex-wrap gap-5 border-b border-slate-100 px-6 py-4 text-xs text-slate-500">

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-indigo-600" />
              Your Skill
            </div>

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-slate-300" />
              Required Level
            </div>

          </div>


          {/* SKILLS */}

          <div className="divide-y divide-slate-100">

            {skills.map((skill) => (

              <SkillRow
                key={skill.name}
                name={skill.name}
                current={skill.current}
                required={skill.required}
                status={skill.status}
              />

            ))}

          </div>

        </div>


        {/* CRITICAL GAPS */}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">


          {/* PRIORITY GAPS */}

          <div className="rounded-2xl border border-red-100 bg-white p-6">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <XCircle size={21} />
              </div>

              <div>

                <h2 className="font-bold">
                  Priority Skill Gaps
                </h2>

                <p className="text-sm text-slate-500">
                  Focus on these first.
                </p>

              </div>

            </div>


            <div className="mt-6 space-y-4">

              {criticalSkills.map((skill) => {

                const gap = skill.required - skill.current;

                return (

                  <div
                    key={skill.name}
                    className="flex items-center justify-between rounded-xl bg-red-50 p-4"
                  >

                    <div>

                      <p className="font-semibold text-slate-800">
                        {skill.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Current: {skill.current}% • Required:{" "}
                        {skill.required}%
                      </p>

                    </div>

                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
                      -{gap}%
                    </span>

                  </div>

                );

              })}

            </div>

          </div>


          {/* NEXT STEPS */}

          <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-indigo-600">
                <BookOpen size={21} />
              </div>

              <div>

                <h2 className="font-bold text-slate-900">
                  What should you learn?
                </h2>

                <p className="text-sm text-slate-600">
                  We'll prioritize your learning path.
                </p>

              </div>

            </div>


            <div className="mt-6 space-y-4">

              {[...skills]
  .filter((skill) => skill.status !== "strong")
  .sort(
    (a, b) =>
      (b.required - b.current) -
      (a.required - a.current)
  )
  .slice(0, 3)
  .map((skill, index) => (
    <LearningItem
      key={skill.name}
      number={String(index + 1)}
      title={skill.name}
      text={
        skill.status === "critical"
          ? "High priority"
          : "Needs improvement"
      }
    />
  ))}

            </div>


            <Link
              href="/roadmap"
              className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Build My Learning Roadmap
              <ArrowRight size={17} />
            </Link>

          </div>

        </div>


        {/* FOOTNOTE */}

      <p className="mt-8 text-center text-xs text-slate-400">
  Analysis generated from your uploaded resume and selected target role.
</p>

      </div>

    </main>
  );
}


/* STAT CARD */

function StatCard({
  icon,
  label,
  value,
  description,
  type,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  description: string;
  type: "strong" | "improve" | "critical";
}) {

  const styles = {
    strong: {
      box: "bg-emerald-50",
      icon: "text-emerald-600",
      number: "text-emerald-600",
    },

    improve: {
      box: "bg-amber-50",
      icon: "text-amber-600",
      number: "text-amber-600",
    },

    critical: {
      box: "bg-red-50",
      icon: "text-red-600",
      number: "text-red-600",
    },
  };

  const style = styles[type];

  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {label}
          </p>

          <p className={`mt-2 text-4xl font-bold ${style.number}`}>
            {value}
          </p>

        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${style.box} ${style.icon}`}
        >
          {icon}
        </div>

      </div>

      <p className="mt-3 text-xs text-slate-400">
        {description}
      </p>

    </div>
  );
}


/* SKILL ROW */

function SkillRow({
  name,
  current,
  required,
  status,
}: {
  name: string;
  current: number;
  required: number;
  status: "strong" | "improve" | "critical";
}) {

  const statusInfo = {
    strong: {
      label: "Strong",
      style: "bg-emerald-50 text-emerald-700",
      bar: "bg-emerald-500",
    },

    improve: {
      label: "Improve",
      style: "bg-amber-50 text-amber-700",
      bar: "bg-amber-500",
    },

    critical: {
      label: "Critical Gap",
      style: "bg-red-50 text-red-700",
      bar: "bg-red-500",
    },
  };

  const info = statusInfo[status];

  return (

    <div className="p-6">

      <div className="flex flex-col gap-4 md:flex-row md:items-center">

        {/* NAME */}

        <div className="w-full md:w-40">

          <p className="font-semibold text-slate-800">
            {name}
          </p>

          <span
            className={`mt-2 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${info.style}`}
          >
            {info.label}
          </span>

        </div>


        {/* BARS */}

        <div className="flex-1">

          {/* CURRENT */}

          <div className="mb-2 flex items-center gap-3">

            <span className="w-16 text-xs text-slate-500">
              You
            </span>

            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">

              <div
                className={`h-full rounded-full ${info.bar}`}
                style={{ width: `${current}%` }}
              />

            </div>

            <span className="w-10 text-right text-xs font-semibold">
              {current}%
            </span>

          </div>


          {/* REQUIRED */}

          <div className="flex items-center gap-3">

            <span className="w-16 text-xs text-slate-500">
              Required
            </span>

            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">

              <div
                className="h-full rounded-full bg-slate-300"
                style={{ width: `${required}%` }}
              />

            </div>

            <span className="w-10 text-right text-xs font-semibold text-slate-500">
              {required}%
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}


/* LEARNING ITEM */

function LearningItem({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {

  return (

    <div className="flex items-center gap-4 rounded-xl bg-white p-4">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
        {number}
      </div>

      <div>

        <p className="font-semibold text-slate-800">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {text}
        </p>

      </div>

    </div>
  );
}