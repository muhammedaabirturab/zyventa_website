import type { SiteConfig } from "@/config/site";

type Network = keyof SiteConfig["social"];

const paths: Record<Network, string> = {
  instagram:
    "M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 4 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 4.9a4.9 4.9 0 1 0 0 9.8 4.9 4.9 0 0 0 0-9.8zm0 8.1a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.1-9.4a1.1 1.1 0 1 0 0 2.3 1.1 1.1 0 0 0 0-2.3z",
  facebook:
    "M13.5 21.9v-7.7h2.6l.4-3h-3V9.3c0-.9.3-1.5 1.5-1.5h1.6V5.1c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6v7.7C5.6 21.2 2 17 2 12 2 6.5 6.5 2 12 2s10 4.5 10 10c0 5-3.6 9.2-8.5 9.9z",
  linkedin:
    "M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.6V9h3.5v11.5z",
  x: "M17.8 3h3.1l-6.8 7.7 8 10.3h-6.2l-4.9-6.3L5.4 21H2.3l7.2-8.3L1.8 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z",
};

const labels: Record<Network, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  x: "X (Twitter)",
};

/**
 * Social links from siteConfig.social. Networks without a URL are shown as
 * muted placeholders (not links) until the company provides its accounts.
 */
export function SocialIcons({ links }: { links: SiteConfig["social"] }) {
  return (
    <ul className="flex gap-2">
      {(Object.keys(paths) as Network[]).map((network) => {
        const icon = (
          <svg viewBox="0 0 24 24" className="size-[18px] fill-current" aria-hidden>
            <path d={paths[network]} />
          </svg>
        );
        const url = links[network];
        return (
          <li key={network}>
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={labels[network]}
                className="flex size-10 items-center justify-center rounded-md border border-white/20 text-white/80 hover:border-white hover:text-white"
              >
                {icon}
              </a>
            ) : (
              <span
                title={`${labels[network]} link to be added`}
                className="flex size-10 items-center justify-center rounded-md border border-white/10 text-white/35"
              >
                {icon}
                <span className="sr-only">{labels[network]} (link to be added)</span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
