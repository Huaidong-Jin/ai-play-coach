"use client";

import type { ButtonHTMLAttributes } from "react";
import { useFavorites } from "@/lib/favorites";

interface FavoriteButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick"> {
  activityId: string;
  testId?: string;
}

export function FavoriteButton({
  activityId,
  testId,
  className,
  ...rest
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(activityId);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(activityId)}
      aria-label={active ? "取消收藏该玩法" : "收藏该玩法"}
      data-testid={testId ?? `favorite-btn-${activityId}`}
      className={`inline-flex items-center justify-center rounded-full border border-apc-border/70 bg-apc-surface px-2.5 py-1 text-[11px] font-medium text-apc-muted shadow-sm transition-transform transition-colors duration-150 hover:border-apc-accent/40 hover:text-apc-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apc-accent/40 focus-visible:ring-offset-1 focus-visible:ring-offset-apc-surface ${
        active
          ? "scale-95 border-apc-accent/40 bg-apc-accent/5 text-apc-accent"
          : ""
      } ${className ?? ""}`}
      aria-pressed={active}
      {...rest}
    >
      <span aria-hidden="true" className="mr-1">
        {active ? "♥" : "♡"}
      </span>
      <span>{active ? "已收藏" : "收藏"}</span>
    </button>
  );
}

