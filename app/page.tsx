import { getAllProjects } from "@/lib/projects";
import ProjectList from "@/components/ProjectList";
import Link from "next/link";

export default function Home() {
  const projects = getAllProjects();
  return (
    <>
      <section className="py-12 border-b border-neutral-200">
        <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-4">
          Full-stack Developer · London
        </p>
        <h1 className="text-3xl sm:text-5xl font-semibold leading-snug mb-3 tracking-wider">
          ROB BARTON
        </h1>
        <p className="text-sm text-neutral-500 leading-relaxed max-w-md">
          I am a full stack software engineer who specialises in the MERN stack.
          On weekends I make games. Below is a collection of projects and
          experiments.
        </p>
        <Link
          href="/about"
          className="inline-block mt-4 font-mono text-xs text-neutral-500 border border-neutral-300 rounded-full px-3 py-1.5 hover:border-neutral-500 hover:text-neutral-900 transition-colors"
        >
          about me →
        </Link>
      </section>
      <ProjectList projects={projects} />
    </>
  );
}
