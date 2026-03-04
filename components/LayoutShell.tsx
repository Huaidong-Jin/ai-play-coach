"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface LayoutShellProps {
  children: ReactNode;
}

function navIsActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function LayoutShell({ children }: LayoutShellProps) {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 sm:px-6">
      <header
        className="sticky top-0 z-50 mb-4 border-b border-apc-border/60 bg-apc-bg/80 backdrop-blur"
        aria-label="主导航"
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between py-3">
          <Link
            href="/"
            className="text-base font-semibold tracking-tight text-apc-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apc-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-apc-bg"
          >
            AI Play Coach
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            {[
              { href: "/", label: "Home" },
              { href: "/activities", label: "Activities" },
              { href: "/favorites", label: "Favorites" },
            ].map((item) => {
              const active = navIsActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    active
                      ? "bg-apc-accent/10 text-apc-text underline decoration-apc-accent decoration-2 underline-offset-4"
                      : "text-apc-muted hover:bg-apc-surface2 hover:text-apc-text"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="flex-1 pb-10 pt-2">{children}</main>
    </div>
  );
}

