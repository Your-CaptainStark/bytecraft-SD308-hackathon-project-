"use client";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  FileText,
  Target,
  Route,
  CheckCircle,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* NAVBAR */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Brain size={21} />
            </div>

            <span className="text-xl font-bold">
              SkillGap AI
            </span>
          </div>

          <div className="hidden items-center gap-8 md:flex">

            <a
              href="#how-it-works"
              className="text-sm text-slate-600 hover:text-indigo-600"
            >
              How it works
            </a>

            <a
              href="#features"
              className="text-sm text-slate-600 hover:text-indigo-600"
            >
              Features
            </a>

            <a
              href="/upload"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Get Started
            </a>

          </div>

        </div>
      </nav>


      {/* HERO */}
      <section className="overflow-hidden">

        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 md:grid-cols-2 md:py-28">

          {/* LEFT */}

          <div>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700">
              <Brain size={16} />
              AI-Powered Career Intelligence
            </div>

            <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-6xl">

              Find the gap between

              <span className="mt-2 block text-indigo-600">
                You → Your Dream Job
              </span>

            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Upload your resume, choose your target role, and discover
              exactly which skills you need to develop to become job-ready.
            </p>


            {/* BUTTONS */}

            <div className="mt-8 flex flex-wrap gap-4">

              <a
                href="/upload"
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
              >
                Analyze My Skills
                <ArrowRight size={18} />
              </a>

              <a
                href="#how-it-works"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 hover:bg-slate-100"
              >
                How It Works
              </a>

            </div>


            {/* TRUST POINTS */}

            <div className="mt-8 flex flex-wrap gap-5 text-sm text-slate-500">

              <span className="flex items-center gap-1">
                <CheckCircle size={15} />
                Resume analysis
              </span>

              <span className="flex items-center gap-1">
                <CheckCircle size={15} />
                Skill matching
              </span>

              <span className="flex items-center gap-1">
                <CheckCircle size={15} />
                Learning roadmap
              </span>

            </div>

          </div>


          {/* DASHBOARD PREVIEW */}

          <div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Target Role
                  </p>

                  <h2 className="mt-1 text-xl font-bold">
                    AI Engineer
                  </h2>
                </div>


                <div className="flex h-20 w-20 items-center justify-center rounded-full border-8 border-indigo-100 text-xl font-bold text-indigo-600">
                  62%
                </div>

              </div>


              <div className="mt-8">

                <div className="mb-5 flex items-center justify-between">
                  <h3 className="font-semibold">
                    Skill Analysis
                  </h3>

                  <span className="text-sm text-slate-400">
                    8 skills
                  </span>
                </div>


                <Skill
                  name="Python"
                  value={80}
                  status="strong"
                />

                <Skill
                  name="Git"
                  value={75}
                  status="strong"
                />

                <Skill
                  name="SQL"
                  value={45}
                  status="improve"
                />

                <Skill
                  name="Machine Learning"
                  value={20}
                  status="critical"
                />

                <Skill
                  name="Deep Learning"
                  value={10}
                  status="critical"
                />

              </div>


              <div className="mt-6 rounded-xl bg-indigo-50 p-4">

                <p className="font-semibold text-indigo-900">
                  3 critical skill gaps
                </p>

                <p className="mt-1 text-sm text-indigo-700">
                  Your roadmap is ready to build.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* FEATURES */}

      <section
        id="features"
        className="border-t border-slate-200 bg-white py-20"
      >

        <div className="mx-auto max-w-7xl px-6">

          <div className="mx-auto max-w-2xl text-center">

            <p className="font-semibold text-indigo-600">
              THE COMPLETE CAREER ANALYZER
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Know exactly what you need to learn
            </h2>

            <p className="mt-4 text-slate-600">
              Turn your current skills into a clear path toward your target
              career.
            </p>

          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-3">

            <Feature
              icon={<FileText size={22} />}
              title="Resume Analysis"
              text="Extract your current skills from your resume."
            />

            <Feature
              icon={<Target size={22} />}
              title="Skill Gap Detection"
              text="Compare your skills with real target-role requirements."
            />

            <Feature
              icon={<Route size={22} />}
              title="Learning Roadmap"
              text="Get a prioritized roadmap for closing your biggest gaps."
            />

          </div>

        </div>

      </section>


      {/* HOW IT WORKS */}

      <section
        id="how-it-works"
        className="bg-slate-50 py-20"
      >

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <p className="font-semibold text-indigo-600">
              HOW IT WORKS
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              From resume to job-ready
            </h2>

          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-4">

            <Step number="01" title="Upload Resume" text="Upload your PDF resume." />

            <Step number="02" title="Choose Role" text="Select your dream job." />

            <Step number="03" title="Analyze Gaps" text="Find your missing skills." />

            <Step number="04" title="Follow Roadmap" text="Learn what matters most." />

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="bg-indigo-600 py-20">

        <div className="mx-auto max-w-4xl px-6 text-center text-white">

          <h2 className="text-4xl font-bold md:text-5xl">
            Stop guessing. Start closing the gap.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-indigo-100">
            Discover the skills standing between you and your target career.
          </p>

          <a
            href="/upload"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-indigo-600 hover:bg-indigo-50"
          >
            Start Your Analysis
            <ArrowRight size={18} />
          </a>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="border-t border-slate-200 bg-white py-8">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">

          <p className="font-bold">
            SkillGap AI
          </p>

          <p className="text-sm text-slate-500">
            AI-powered career intelligence
          </p>

        </div>

      </footer>

    </main>
  );
}


/* SKILL */

function Skill({
  name,
  value,
  status,
}: {
  name: string;
  value: number;
  status: "strong" | "improve" | "critical";
}) {

  const colors = {
    strong: "bg-emerald-500",
    improve: "bg-amber-500",
    critical: "bg-red-500",
  };

  return (
    <div className="mb-5">

      <div className="mb-2 flex justify-between text-sm">

        <span className="font-medium">
          {name}
        </span>

        <span className="text-slate-500">
          {value}%
        </span>

      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">

        <div
          className={`h-full rounded-full ${colors[status]}`}
          style={{ width: `${value}%` }}
        />

      </div>

    </div>
  );
}


/* FEATURE */

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:shadow-lg">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-600">
        {text}
      </p>

    </div>
  );
}


/* STEP */

function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">

      <span className="font-bold text-indigo-600">
        {number}
      </span>

      <h3 className="mt-4 text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {text}
      </p>

    </div>
  );
}