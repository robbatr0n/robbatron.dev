import Link from "next/link";
import type { Project } from "@/lib/projects";

const dotColors: Record<string, string> = {
  live: "#22c55e",
  "in-progress": "#f59e0b",
  archived: "#94a3b8",
  active: "#f59e0b",
  shelved: "#94a3b8",
};

function StatusDot({ status }: { status: Project["status"] }) {
  return (
    <span
      className="shrink-0 rounded-full"
      style={{
        width: 6,
        height: 6,
        background: dotColors[status],
        display: "inline-block",
      }}
    />
  );
}

function ProjectRow({
  project,
  index,
  isLab,
}: {
  project: Project;
  index: number;
  isLab: boolean;
}) {
  return (
    <li>
      <Link
        href={`/projects/${project.slug}`}
        className="flex items-center gap-4 py-4 group"
      >
        {/* tertiary — index */}
        <span className="font-mono text-xs text-neutral-400 shrink-0 w-5">
          {isLab ? "—" : String(index + 1).padStart(2, "0")}
        </span>

        <StatusDot status={project.status} />

        <div className="flex-1 flex justify-between items-center gap-4 min-w-0">
          <div className="min-w-0 flex items-baseline gap-2">
            {/* primary — title */}
            <span className="font-mono text-sm font-medium text-neutral-900 group-hover:text-neutral-500 transition-colors">
              {project.title}
            </span>
            {/* separator */}
            <span className="font-mono text-xs text-neutral-400 hidden sm:inline">
              —
            </span>
            {/* secondary — stack */}
            <span className="font-mono text-xs text-neutral-500 hidden sm:inline">
              {project.stack.slice(0, 3).join(" · ")}
            </span>
          </div>
          {/* secondary — date */}
          <span className="font-mono text-xs text-neutral-500 shrink-0">
            {project.date}
          </span>
        </div>
      </Link>
    </li>
  );
}

export default function ProjectList({ projects }: { projects: Project[] }) {
  const mainProjects = projects.filter((p) => p.section === "projects");
  const labProjects = projects.filter((p) => p.section === "lab");

  return (
    <>
      {mainProjects.length > 0 && (
        <div>
          <div className="mt-6 mb-4">
            {/* label — section heading */}
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
              projects
            </span>
          </div>
          <ul>
            {mainProjects.map((project, i) => (
              <ProjectRow
                key={project.slug}
                project={project}
                index={i}
                isLab={false}
              />
            ))}
          </ul>
        </div>
      )}

      {labProjects.length > 0 && (
        <div>
          <div className="border-t border-dashed border-neutral-300 my-6" />
          <div className="flex items-center gap-2 mb-4">
            {/* label — section heading */}
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
              lab
            </span>
            {/* tertiary — lab badge */}
            <span className="font-mono text-xs text-neutral-400 border border-dashed border-neutral-300 rounded-full px-2 py-0.5">
              experiments & prototypes
            </span>
          </div>
          <ul>
            {labProjects.map((project, i) => (
              <ProjectRow
                key={project.slug}
                project={project}
                index={i}
                isLab={true}
              />
            ))}
          </ul>
        </div>
      )}

      {/* legend */}
      <div className="flex gap-8 mt-6 pt-4 border-t border-neutral-200 flex-wrap">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-sm text-neutral-500 uppercase tracking-widest">
            projects
          </span>
          {(["live", "in-progress", "archived"] as const).map((s) => (
            <span
              key={s}
              className="flex items-center gap-1.5 font-mono text-xs text-neutral-500"
            >
              <StatusDot status={s} />
              {s}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
            lab
          </span>
          {(["active", "shelved"] as const).map((s) => (
            <span
              key={s}
              className="flex items-center gap-1.5 font-mono text-xs text-neutral-500"
            >
              <StatusDot status={s} />
              {s}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
