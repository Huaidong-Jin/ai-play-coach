"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ALL_ACTIVITIES } from "@/lib/activities";
import { useFavorites } from "@/lib/favorites";
import { ActivityCard } from "./ActivityCard";

export function FavoritesPageClient() {
  const { favorites, clearFavorites } = useFavorites();

  const favoriteActivities = useMemo(
    () => ALL_ACTIVITIES.filter((activity) =>
      favorites.includes(activity.id),
    ),
    [favorites],
  );

  const hasFavorites = favoriteActivities.length > 0;

  return (
    <div
      className="space-y-4"
      data-testid="favorites-page"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-sm font-semibold tracking-tight text-apc-text">
          我的收藏
        </h1>
        {hasFavorites && (
          <button
            type="button"
            onClick={clearFavorites}
            data-testid="clear-favorites"
            aria-label="清空所有已收藏玩法"
            className="rounded-full border border-red-200 bg-apc-surface px-3 py-1 text-xs font-medium text-red-500 shadow-sm transition-colors hover:border-red-300 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200 focus-visible:ring-offset-1 focus-visible:ring-offset-apc-surface"
          >
            清空收藏
          </button>
        )}
      </div>

      {!hasFavorites ? (
        <div
          className="flex flex-col items-center justify-center rounded-2xl border border-apc-border/70 bg-apc-surface2 p-6 text-center text-sm text-apc-text2 shadow-apc-soft-1"
          data-testid="favorites-empty"
        >
          <p className="mb-2">还没有收藏玩法，可以先去逛逛活动库。</p>
          <Link
            href="/activities"
            className="inline-flex items-center rounded-full bg-apc-accent px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-apc-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apc-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-apc-surface2"
          >
            去活动库看看
          </Link>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          data-testid="favorites-grid"
        >
          {favoriteActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
}

