import type { Metadata } from "next";
import Nav from "@/components/Nav";
import "./globals.css";
import { Inter, Fraunces } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const fraunces = Fraunces({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: {
    template: "%s | robbatron.dev",
    default: "robbatron.dev",
  },
  description: "Full-stack developer based in London.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="font-sans bg-white text-neutral-900 antialiased"
      >
        <header className="border-b border-neutral-200">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <Nav />
          </div>
        </header>
        <main className="mx-auto max-w-3xl px-4 sm:px-6 pb-16">
          {children}
        </main>
      </body>
    </html>
  );
}
