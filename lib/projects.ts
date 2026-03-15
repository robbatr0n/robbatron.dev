import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDir = path.join(process.cwd(), "content/projects");

export type Project = {
  slug: string;
  title: string;
  description: string;
  section: "projects" | "lab";
  status: "live" | "in-progress" | "archived" | "active" | "shelved";
  stack: string[];
  github?: string;
  live?: string;
  images?: string[];
  date: string;
  content: string;
};

export function getAllProjects(): Project[] {
  return fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(projectsDir, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(".mdx", ""),
        content,
        ...(data as Omit<Project, "slug" | "content">),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getProjectBySlug(slug: string): Project | undefined {
  const filePath = path.join(projectsDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { slug, content, ...(data as Omit<Project, "slug" | "content">) };
}
