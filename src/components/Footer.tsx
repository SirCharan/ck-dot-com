import { SITE } from "@/data/site";

export function Footer() {
  return (
    <footer className="py-10 md:py-12 rule">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-mute">
        <span className="display text-ink">{SITE.name}</span>
        <a
          href={SITE.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="link-ink"
        >
          LinkedIn
        </a>
        <a
          href={SITE.socials.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="link-ink"
        >
          Twitter
        </a>
        <a
          href={SITE.socials.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="link-ink"
        >
          Telegram
        </a>
        <a
          href={SITE.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="link-ink"
        >
          GitHub
        </a>
        <a
          href={SITE.socials.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="link-ink"
        >
          Book a call
        </a>
        <a href="/blog/feed.xml" className="link-ink">
          RSS
        </a>
        <span className="ml-auto text-xs">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
