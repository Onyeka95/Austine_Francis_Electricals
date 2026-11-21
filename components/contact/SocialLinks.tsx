import { siteConfig } from "@/data/siteConfig";
import { SOCIAL_PLATFORMS } from "@/types";
import type { SocialPlatform } from "@/types";

const LABELS: Record<SocialPlatform, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  x: "X",
  youtube: "YouTube",
  linkedin: "LinkedIn",
};

/** Social links. Platforms left empty in siteConfig are not shown. */
export default function SocialLinks() {
  const active = SOCIAL_PLATFORMS.filter(
    (platform) => siteConfig.social[platform].trim() !== ""
  );

  if (active.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-muted">
        Follow us
      </h3>
      <ul className="mt-3 flex flex-wrap gap-2">
        {active.map((platform) => (
          <li key={platform}>
            <a
              href={siteConfig.social[platform]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border border-brand-navy/20 px-4 py-2 text-sm font-semibold text-brand-navy transition hover:border-brand-navy hover:bg-brand-navy hover:text-white"
            >
              {LABELS[platform]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}