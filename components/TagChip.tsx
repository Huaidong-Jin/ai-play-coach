import type { ReactNode } from "react";

interface TagChipProps {
  children: ReactNode;
}

export function TagChip({ children }: TagChipProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-apc-surface2 px-2.5 py-0.5 text-[11px] font-medium text-apc-muted">
      {children}
    </span>
  );
}

