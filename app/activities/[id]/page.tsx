import Link from "next/link";
import { ALL_ACTIVITIES } from "@/lib/activities";
import type { Activity } from "@/lib/types";
import { FavoriteButton } from "@/components/FavoriteButton";
import { TagChip } from "@/components/TagChip";

interface ActivityDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

function formatLocation(location: Activity["location"]): string {
  if (location === "indoor") return "室内";
  if (location === "outdoor") return "户外";
  return "室内/户外都可";
}

export default async function ActivityDetailPage({
  params,
}: ActivityDetailPageProps) {
  const { id } = await params;
  const activity = ALL_ACTIVITIES.find((item) => item.id === id);

  if (!activity) {
    return (
      <div className="space-y-3" data-testid="not-found">
        <p className="text-sm text-apc-text2">
          没有找到这个玩法，也许它还在路上。
        </p>
        <Link
          href="/activities"
          data-testid="back-to-activities"
          className="inline-flex items-center rounded-full bg-apc-accent px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-apc-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apc-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-apc-bg"
        >
          返回活动库
        </Link>
      </div>
    );
  }

  return (
    <article
      className="space-y-6"
      data-testid="activity-detail"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link
            href="/activities"
            data-testid="back-to-activities"
            className="mb-3 inline-flex items-center text-xs text-apc-muted underline-offset-4 hover:underline"
          >
            ← Back
          </Link>
          <h1
            className="text-xl font-semibold tracking-tight text-apc-text"
            data-testid="detail-title"
          >
            {activity.title}
          </h1>
          <div
            className="mt-2 flex flex-wrap gap-1.5"
            data-testid="detail-meta-chips"
          >
            <TagChip>{`${activity.minutes} 分钟`}</TagChip>
            <TagChip>{formatLocation(activity.location)}</TagChip>
            {activity.age_range && (
              <TagChip>{`${activity.age_range} 岁`}</TagChip>
            )}
            {activity.themes.map((theme) => (
              <TagChip key={theme}>{theme}</TagChip>
            ))}
          </div>
        </div>
        <FavoriteButton
          activityId={activity.id}
          testId="detail-favorite-btn"
          className="shrink-0"
        />
      </div>

      <section data-testid="detail-ai-concepts">
        <h2 className="mb-2 text-sm font-semibold tracking-tight text-apc-text">
          这次在玩什么样的「AI 直觉」？
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-apc-text2">
          {activity.ai_concepts.map((concept) => (
            <li key={concept}>{concept}</li>
          ))}
        </ul>
      </section>

      <section data-testid="detail-materials">
        <h2 className="mb-2 text-sm font-semibold tracking-tight text-apc-text">
          需要准备
        </h2>
        {activity.materials.length ? (
          <ul className="list-disc space-y-1 pl-5 text-sm text-apc-text2">
            {activity.materials.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-apc-text2">
            不需要额外材料，只需要你和孩子。
          </p>
        )}
      </section>

      <section data-testid="detail-steps">
        <h2 className="mb-2 text-sm font-semibold tracking-tight text-apc-text">
          怎么玩（步骤建议）
        </h2>
        <ol className="space-y-3 text-sm text-apc-text2">
          {activity.steps.map((step, index) => (
            <li key={step} className="flex gap-3">
              <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-apc-surface2 text-[11px] font-medium text-apc-muted">
                {index + 1}
              </div>
              <p className="leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section data-testid="detail-adult-script">
        <h2 className="mb-2 text-sm font-semibold tracking-tight text-apc-text">
          家长可以直接照读的小句子
        </h2>
        <div className="rounded-2xl border border-apc-border/70 bg-apc-surface2/60 px-4 py-3">
          <ul className="space-y-1 text-sm text-apc-text2">
            {activity.adult_script.map((line) => (
              <li key={line} className="leading-relaxed">
                “{line}”
              </li>
            ))}
          </ul>
        </div>
      </section>

      {activity.variations && (
        <section data-testid="detail-variations">
          <h2 className="mb-2 text-sm font-semibold tracking-tight text-apc-text">
            可以这样变一变
          </h2>
          <div className="space-y-2 text-sm text-apc-text2">
            {activity.variations.easier && (
              <div>
                <p className="font-medium text-slate-800">更简单一点：</p>
                <ul className="list-disc space-y-1 pl-5">
                  {activity.variations.easier.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {activity.variations.harder && (
              <div>
                <p className="font-medium text-slate-800">更有挑战：</p>
                <ul className="list-disc space-y-1 pl-5">
                  {activity.variations.harder.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {activity.variations.outdoor && (
              <div>
                <p className="font-medium text-slate-800">户外版本：</p>
                <ul className="list-disc space-y-1 pl-5">
                  {activity.variations.outdoor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      <section data-testid="detail-safety">
        <h2 className="mb-2 text-sm font-semibold tracking-tight text-apc-text">
          安全小提醒
        </h2>
        <div className="rounded-2xl bg-apc-accent2/10 p-4">
          <ul className="list-disc space-y-1 pl-5 text-sm text-apc-text2">
            {activity.safety.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}

