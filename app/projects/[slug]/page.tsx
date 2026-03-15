import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Link from "next/link";
import ImageGallery from "@/components/ImageGallery";
import { GitHubIcon } from "@/components/icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return { title: project?.title ?? "project" };
}

const BackIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);

const ExternalIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article>
      {/* top bar */}
      <div className="flex items-center justify-between py-4 ">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <BackIcon />
          all projects
        </Link>
      </div>

      {/* content */}
      <div className="py-10">
        <h1 className="text-3xl font-medium leading-snug mb-3">
          {project.title}
        </h1>
        <p className="text-sm text-neutral-500 leading-relaxed mb-6 max-w-xl">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 pb-10 border-b border-neutral-100">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs text-neutral-500 border border-neutral-200 rounded-full px-2.5 py-1"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mdx">
          <MDXRemote source={project.content} />
          {(project.github || project.live) && (
            <div className="flex items-center gap-3 pt-6 ">
              {project.live && (
                <Link
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs text-neutral-500 border border-neutral-300 rounded-full px-3 py-1.5 hover:border-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  <ExternalIcon />
                  demo
                </Link>
              )}
              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs text-neutral-500 border border-neutral-300 rounded-full px-3 py-1.5 hover:border-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  <GitHubIcon />
                  github
                </Link>
              )}
            </div>
          )}
        </div>
        {project.images && project.images.length > 0 && (
          <ImageGallery images={project.images} title={project.title} />
        )}
      </div>
    </article>
  );
}
