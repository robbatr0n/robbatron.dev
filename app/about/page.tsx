import Link from "next/link";
import { GitHubIcon } from "@/components/icons";

export const metadata = { title: "about" };

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const EmailIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const stack = [
  { label: "languages", value: "TypeScript · SQL · Lua · C++ · Bash" },
  {
    label: "frameworks",
    value: "React · Next.js · Express · Fastify · Angular · Tailwind",
  },
  { label: "infrastructure", value: "PostgreSQL · MongoDB · Docker" },
  { label: "game dev", value: "Love2D · CUDA · OpenGL · Raylib" },
];

const links = [
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/robbatr0n",
    icon: <LinkedInIcon />,
    external: true,
  },
  {
    label: "github",
    href: "https://github.com/robbatr0n",
    icon: <GitHubIcon />,
    external: true,
  },
  {
    label: "robbarton8@proton.me",
    href: "mailto:robbarton8@proton.me",
    icon: <EmailIcon />,
  },
];

export default function About() {
  return (
    <div className="py-12">
      <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-8">
        about
      </p>

      {/* bio */}
      <div className="space-y-3 text-sm text-neutral-500 leading-relaxed mb-8 max-w-lg">
        <p>
          I&apos;m a full-stack developer based in London. I build web apps with
          TypeScript and Node, and on weekends I make games in Lua and write
          shaders for fun.
        </p>
        <p>Currently open to new roles in London or remote.</p>
      </div>

      {/* stack rows */}
      <div className="mb-8 max-w-lg">
        {stack.map(({ label, value }) => (
          <div
            key={label}
            className="flex items-baseline gap-6 py-2.5 border-b border-neutral-100 last:border-none"
          >
            <span className="font-mono text-xs text-neutral-400 w-28 shrink-0">
              {label}
            </span>
            <span className="font-mono text-xs text-neutral-500 leading-relaxed">
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* divider */}
      <div className="border-t border-neutral-100 mb-6 max-w-lg" />

      {/* links + cv */}
      <div className="flex flex-wrap items-center gap-3">
        {links.map(({ label, href, icon, external }) => (
          <Link
            key={href}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-2 font-mono text-xs text-neutral-500 border border-neutral-300 rounded-full px-3 py-1.5 hover:border-neutral-500 hover:text-neutral-900 transition-colors"
          >
            {icon}
            {label}
          </Link>
        ))}
        <div className="w-px h-3.5 bg-neutral-200" />
        <Link
          href="/rob-barton-cv.pdf"
          target="_blank"
          className="inline-flex items-center gap-2 font-mono text-xs text-neutral-500 border border-neutral-300 rounded-full px-3 py-1.5 hover:border-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <DownloadIcon />
          download cv
        </Link>
      </div>
    </div>
  );
}
