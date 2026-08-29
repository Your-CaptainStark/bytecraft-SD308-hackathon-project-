"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  FileText,
  Upload as UploadIcon,
  X,
  ShieldCheck,
} from "lucide-react";

export default function UploadPage() {
  
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  function handleFile(selectedFile: File) {
    setError("");

    // Check file type
    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }

    // Check file size — 10 MB maximum
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10 MB.");
      return;
    }

    setFile(selectedFile);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);

    const droppedFile = event.dataTransfer.files[0];

    if (droppedFile) {
      handleFile(droppedFile);
    }
  }

  function removeFile() {
    setFile(null);
    setError("");
  }
  async function uploadResume() {
  if (!file) {
    setError("Please select a resume first.");
    return;
  }

  setUploading(true);
  setError("");

  try {
    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(
      "http://127.0.0.1:8000/upload-resume",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Backend request failed.");
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(
        data.message || "Resume upload failed."
      );
    }

    // Save resume analysis data
    localStorage.setItem(
      "resumeData",
      JSON.stringify(data)
    );

    // Save original file name
    localStorage.setItem(
      "resumeFileName",
      file.name
    );

    // Go to target role page
    router.push("/roles");

  } catch (error) {

    console.error("Upload error:", error);

    setError(
      "Could not connect to the backend. Make sure the Python server is running."
    );

  } finally {

    setUploading(false);

  }
}

  return (
    <main className="min-h-screen bg-slate-50">

      {/* NAVBAR */}

      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center px-6 py-5">

          <a
            href="/"
            className="flex items-center gap-3"
          >

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <FileText size={19} />
            </div>

            <span className="text-xl font-bold text-slate-900">
              SkillGap AI
            </span>

          </a>

        </div>
      </nav>


      {/* MAIN */}

      <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">

        {/* BACK */}

        <a
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600"
        >
          <ArrowLeft size={16} />
          Back to home
        </a>


        {/* HEADER */}

        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
            <UploadIcon size={30} />
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900">
            Upload your resume
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-lg leading-7 text-slate-600">
            We'll analyze your resume to understand your current
            skills and identify your career gaps.
          </p>

        </div>


        {/* UPLOAD AREA */}

        {!file ? (

          <div
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}

            onDragLeave={() => {
              setDragging(false);
            }}

            onDrop={handleDrop}

            className={`mt-10 rounded-3xl border-2 border-dashed p-10 text-center transition md:p-14 ${
              dragging
                ? "border-indigo-500 bg-indigo-50"
                : "border-slate-300 bg-white hover:border-indigo-400"
            }`}
          >

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
              <UploadIcon size={30} />
            </div>

            <h2 className="mt-6 text-xl font-semibold text-slate-900">
              Drag & drop your resume here
            </h2>

            <p className="mt-2 text-slate-500">
              or select a PDF from your computer
            </p>


            {/* FILE INPUT */}

            <label className="mt-7 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700">

              <UploadIcon size={18} />

              Browse Resume

              <input
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(event) => {
                  const selectedFile = event.target.files?.[0];

                  if (selectedFile) {
                    handleFile(selectedFile);
                  }
                }}
              />

            </label>


            <p className="mt-5 text-xs text-slate-400">
              PDF only • Maximum file size 10 MB
            </p>

          </div>

        ) : (

          /* FILE PREVIEW */

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

            <div className="flex items-center justify-between gap-4">

              <div className="flex min-w-0 items-center gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                  <FileText size={27} />
                </div>

                <div className="min-w-0">

                  <p className="truncate font-semibold text-slate-900">
                    {file.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>

                </div>

              </div>


              <button
                onClick={removeFile}
                className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-red-500"
                aria-label="Remove resume"
              >
                <X size={20} />
              </button>

            </div>


            {/* SUCCESS */}

            <div className="mt-6 flex items-center gap-3 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700">

              <CheckCircle size={19} />

              Resume successfully added.

            </div>


            {/* CONTINUE */}

           <button
  onClick={uploadResume}
  disabled={uploading}
  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 font-semibold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
>
  {uploading ? (
    <>
      Analyzing Resume...
    </>
  ) : (
    <>
      Continue to Target Role
      <ArrowRight size={18} />
    </>
  )}
</button>
          </div>

        )}


        {/* ERROR */}

        {error && (

          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
            {error}
          </div>

        )}


        {/* PRIVACY */}

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5">

          <ShieldCheck
            size={21}
            className="mt-0.5 shrink-0 text-emerald-600"
          />

          <div>

            <p className="font-semibold text-slate-800">
              Your resume is secure
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Your resume is used only for skill analysis.
              We'll connect secure storage when the backend is added.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}