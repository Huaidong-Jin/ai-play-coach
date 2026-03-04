"use client";

import { useMemo, useState } from "react";
import {
  ALL_ACTIVITIES,
  DEFAULT_FILTERS,
  filterActivities,
  type ActivityFilters,
} from "@/lib/activities";
import { ActivityCard } from "./ActivityCard";
import { FiltersBar } from "./FiltersBar";

export function ActivitiesPageClient() {
  const [filters, setFilters] = useState<ActivityFilters>(DEFAULT_FILTERS);

  const filtered = useMemo(
    () => filterActivities(ALL_ACTIVITIES, filters),
    [filters],
  );

  return (
    <div className="space-y-4">
      <div className="sticky top-[3.25rem] z-40 bg-apc-bg/90 pb-2 pt-1 backdrop-blur">
        <FiltersBar value={filters} onChange={setFilters} />
      </div>

      <p
        className="inline-flex items-center rounded-full bg-apc-surface2 px-3 py-1 text-xs text-apc-muted"
        data-testid="results-count"
      >
        共 {filtered.length} 个玩法
      </p>

      <div
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
        data-testid="activities-grid"
      >
        {filtered.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}

