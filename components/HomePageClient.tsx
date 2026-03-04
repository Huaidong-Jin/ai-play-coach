"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ALL_ACTIVITIES,
  DEFAULT_FILTERS,
  filterActivities,
  type ActivityFilters,
} from "@/lib/activities";
import { ActivityCard } from "./ActivityCard";
import { FiltersBar } from "./FiltersBar";

export function HomePageClient() {
  const [filters, setFilters] = useState<ActivityFilters>(DEFAULT_FILTERS);
  const [shuffleSeed, setShuffleSeed] = useState(0);

  const filtered = useMemo(
    () => filterActivities(ALL_ACTIVITIES, filters),
    [filters],
  );

  const recommended = useMemo(() => {
    const count = Math.min(3, filtered.length);
    if (!count) {
      return [];
    }

    // 初次渲染使用稳定顺序，避免 SSR / 客户端不一致导致 hydration 报错。
    if (shuffleSeed === 0) {
      return filtered.slice(0, count);
    }

    // 仅在点击“换一批”后在客户端打乱顺序。
    const shuffled = [...filtered];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  }, [filtered, shuffleSeed]);

  const handleShuffle = () => {
    setShuffleSeed((prev) => prev + 1);
  };

  const quickFiltered = filtered;

  return (
    <div className="flex flex-col gap-6">
      <section
        data-testid="hero"
        className="rounded-3xl border border-apc-border/70 bg-apc-surface p-6 shadow-apc-soft-1"
      >
        <h1 className="mb-3 text-2xl font-semibold tracking-tight text-apc-text">
          AI Play Coach
        </h1>
        <p className="max-w-xl text-sm text-apc-text2">
          为 3–5 岁孩子和父母准备的安静陪玩时间，用 5–15 分钟的小玩法，在日常生活里自然聊起
          AI 的直觉，而不是多一块屏幕。
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-apc-muted">
          <span className="inline-flex items-center rounded-full bg-apc-surface2 px-2.5 py-1">
            无屏幕 · 亲子共玩
          </span>
          <span className="inline-flex items-center rounded-full bg-apc-surface2 px-2.5 py-1">
            5–15 分钟一局
          </span>
        </div>
      </section>

      <section
        className="space-y-3"
        data-testid="today-recommendations"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-tight text-apc-text">
            今日推荐玩法
          </h2>
          <button
            type="button"
            onClick={handleShuffle}
            aria-label="重新随机推荐玩法"
            data-testid="shuffle-recommendations"
            className="rounded-full border border-apc-border/80 bg-apc-surface2 px-3 py-1 text-xs font-medium text-apc-muted transition-colors hover:border-apc-accent/40 hover:text-apc-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apc-accent/40 focus-visible:ring-offset-1 focus-visible:ring-offset-apc-surface"
          >
            换一批
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {recommended.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-tight text-apc-text">
            快速找玩法
          </h2>
          <Link
            href="/activities"
            data-testid="go-to-activities"
            className="rounded-full bg-apc-accent px-3 py-1 text-xs font-medium text-white shadow-sm transition hover:bg-apc-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apc-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-apc-bg"
          >
            去全部玩法
          </Link>
        </div>
        <FiltersBar
          value={filters}
          onChange={setFilters}
          compact
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {quickFiltered.slice(0, 4).map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </section>
    </div>
  );
}

