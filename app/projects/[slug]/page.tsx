import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Link from "next/link";
import ImageGallery from "@/components/ImageGallery";

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

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z" />
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
          <div>
            {project.images && project.images.length > 0 && (
              <ImageGallery images={project.images} title={project.title} />
            )}
          </div>
        )}
      </div>
    </article>
  );
}
