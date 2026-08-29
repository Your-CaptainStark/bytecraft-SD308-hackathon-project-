"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Code2,
  Database,
  Shield,
  Cloud,
  Cpu,
  Eye,
  Bot,
  Search,
  Check,
} from "lucide-react";

const roles = [
  {
    id: "ai-engineer",
    name: "AI Engineer",
    description: "Build and deploy intelligent AI-powered applications.",
    icon: Brain,
    skills: ["Python", "Machine Learning", "Deep Learning"],
  },
  {
    id: "ml-engineer",
    name: "Machine Learning Engineer",
    description: "Develop, train and deploy machine learning models.",
    icon: Bot,
    skills: ["Python", "ML", "TensorFlow", "PyTorch"],
  },
  {
    id: "software-engineer",
    name: "Software Engineer",
    description: "Design and develop scalable software applications.",
    icon: Code2,
    skills: ["Programming", "DSA", "Git", "System Design"],
  },
  {
    id: "data-scientist",
    name: "Data Scientist",
    description: "Turn data into insights and predictive models.",
    icon: Database,
    skills: ["Python", "Statistics", "SQL", "ML"],
  },
  {
    id: "robotics-engineer",
    name: "Robotics Engineer",
    description: "Design intelligent robotic systems and automation.",
    icon: Cpu,
    skills: ["C++", "Python", "ROS", "Robotics"],
  },
  {
    id: "computer-vision",
    name: "Computer Vision Engineer",
    description: "Build systems that understand images and video.",
    icon: Eye,
    skills: ["Python", "OpenCV", "Deep Learning", "YOLO"],
  },
  {
    id: "full-stack",
    name: "Full Stack Developer",
    description: "Build complete modern web applications.",
    icon: Code2,
    skills: ["React", "Node.js", "SQL", "APIs"],
  },
  {
    id: "cloud-engineer",
    name: "Cloud Engineer",
    description: "Build and manage scalable cloud infrastructure.",
    icon: Cloud,
    skills: ["AWS", "Linux", "Docker", "Networking"],
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity Analyst",
    description: "Protect systems, networks and applications.",
    icon: Shield,
    skills: ["Networking", "Linux", "Security", "SIEM"],
  },
];

export default function RolesPage() {
  const router = useRouter();

  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");

    async function analyzeSkills() {
    if (!selectedRole) {
      setError("Please select a target role.");
      return;
    }

    setAnalyzing(true);
    setError("");

    try {
      // Get resume data saved during upload
      const savedResume = localStorage.getItem("resumeData");

      if (!savedResume) {
        throw new Error(
          "Resume data not found. Please upload your resume again."
        );
      }

      const resumeData = JSON.parse(savedResume);

      if (!resumeData.text) {
        throw new Error(
          "Resume text was not found. Please upload your resume again."
        );
      }

      // Find the selected role
      const role = roles.find(
        (item) => item.id === selectedRole
      );

      if (!role) {
        throw new Error("Selected role was not found.");
      }

      // Send resume + role to FastAPI
      const response = await fetch(
        "http://127.0.0.1:8000/analyze-text",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resume_text: resumeData.text,
            target_role: role.name,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Backend error: ${response.status}`
        );
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(
          result.message || "Skill analysis failed."
        );
      }

      // Save analysis result
      localStorage.setItem(
        "analysisResult",
        JSON.stringify(result)
      );

      // Save selected role
      localStorage.setItem(
        "targetRole",
        role.name
      );

      // Go to analysis page
      router.push("/analysis");

    } catch (err) {
      console.error("Analysis error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while analyzing your skills."
      );

    } finally {
      setAnalyzing(false);
    }
  }

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(search.toLowerCase())
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

          <span className="hidden text-sm text-slate-400 md:block">
            Step 2 of 3
          </span>

        </div>
      </nav>


      {/* MAIN */}

      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">

        {/* BACK */}

        <Link
          href="/upload"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600"
        >
          <ArrowLeft size={16} />
          Back to resume
        </Link>


        {/* HEADER */}

        <div className="text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
            <Brain size={27} />
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Choose your target role
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            What career are you preparing for? We'll compare your
            current skills against the requirements of that role.
          </p>

        </div>


        {/* SEARCH */}

        <div className="mx-auto mt-10 max-w-2xl">

          <div className="relative">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search for a job role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-5 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />

          </div>

        </div>


        {/* ROLE GRID */}

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {filteredRoles.map((role) => {

            const Icon = role.icon;
            const selected = selectedRole === role.id;

            return (

              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`relative text-left rounded-2xl border p-6 transition-all ${
                  selected
                    ? "border-indigo-500 bg-indigo-50 shadow-lg shadow-indigo-100"
                    : "border-slate-200 bg-white hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg"
                }`}
              >

                {/* SELECTED */}

                {selected && (
                  <div className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white">
                    <Check size={16} />
                  </div>
                )}


                {/* ICON */}

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    selected
                      ? "bg-indigo-600 text-white"
                      : "bg-indigo-100 text-indigo-600"
                  }`}
                >
                  <Icon size={23} />
                </div>


                {/* TITLE */}

                <h2 className="mt-5 text-lg font-bold text-slate-900">
                  {role.name}
                </h2>


                {/* DESCRIPTION */}

                <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">
                  {role.description}
                </p>


                {/* SKILLS */}

                <div className="mt-4 flex flex-wrap gap-2">

                  {role.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                    >
                      {skill}
                    </span>
                  ))}

                </div>

              </button>

            );
          })}

        </div>


        {/* NO RESULTS */}

        {filteredRoles.length === 0 && (

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-12 text-center">

            <Search className="mx-auto text-slate-400" size={35} />

            <h3 className="mt-4 text-lg font-semibold">
              No roles found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try searching for another job role.
            </p>

          </div>

        )}
        {error && (
  <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm font-medium text-red-600">
    {error}
  </div>
)}


        {/* BOTTOM ACTION */}

        <div className="sticky bottom-5 mt-10">

          <div className="mx-auto flex max-w-2xl items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">

            <div className="hidden sm:block">

              {selectedRole ? (

                <>

                  <p className="text-xs text-slate-400">
                    Target role
                  </p>

                  <p className="font-semibold">
                    {
                      roles.find(
                        (role) => role.id === selectedRole
                      )?.name
                    }
                  </p>

                </>

              ) : (

                <p className="text-sm text-slate-500">
                  Select a role to continue
                </p>

              )}

            </div>


            {selectedRole ? (
<button
  onClick={analyzeSkills}
  disabled={analyzing}
  className="ml-auto flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
>
  {analyzing ? (
    <>
      Analyzing...
    </>
  ) : (
    <>
      Analyze Skill Gap
      <ArrowRight size={18} />
    </>
  )}
</button>

            ) : (

              <button
                disabled
                className="ml-auto flex cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-200 px-6 py-3.5 font-semibold text-slate-400"
              >
                Select a Role
                <ArrowRight size={18} />
              </button>

            )}

          </div>

        </div>

      </div>

    </main>
  );
}