"use client";

import { Triangle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function RedditArrow({ direction }: { direction: "up" | "down" }) {
  return (
    <Triangle
      className={cn(
        "size-[18px] transition-colors duration-100",
        direction === "down" && "rotate-180"
      )}
    />
  );
}

const STORAGE_KEY = "blog-votes";

type Vote = "up" | "down" | null;

function getStoredVote(slug: string): Vote {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as Record<string, Vote>;
    return parsed[slug] ?? null;
  } catch {
    return null;
  }
}

function setStoredVote(slug: string, vote: Vote) {
  if (typeof window === "undefined") return;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? (JSON.parse(stored) as Record<string, Vote>) : {};
    if (vote) {
      parsed[slug] = vote;
    } else {
      delete parsed[slug];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  } catch {
    // ignore
  }
}

interface BlogVoteProps {
  slug: string;
  className?: string;
}

export function BlogVote({ slug, className }: BlogVoteProps) {
  const [vote, setVote] = useState<Vote>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setVote(getStoredVote(slug));
    setMounted(true);
  }, [slug]);

  const handleVote = useCallback(
    (newVote: "up" | "down") => {
      const next = vote === newVote ? null : newVote;
      setVote(next);
      setStoredVote(slug, next);
    },
    [slug, vote]
  );

  if (!mounted) {
    return (
      <div
        className={cn(
          "inline-flex flex-col items-center rounded-md border border-gray-200 bg-gray-50/80 p-0.5",
          className
        )}
        aria-hidden
      >
        <span className="h-6 w-7 rounded-sm bg-gray-200/60" />
        <span className="h-px w-5 bg-gray-200" />
        <span className="h-6 w-7 rounded-sm bg-gray-200/60" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex flex-col items-center rounded-md border border-gray-200 bg-gray-50/80 p-0.5",
        "dark:border-gray-700 dark:bg-gray-900/50",
        className
      )}
      role="group"
      aria-label="Vote on this post"
    >
      <button
        type="button"
        onClick={() => handleVote("up")}
        className={cn(
          "group/up inline-flex items-center justify-center w-7 h-6 rounded-sm transition-all duration-100",
          "text-gray-400 hover:text-[#ff4500] hover:bg-[#ff4500]/10",
          "focus:outline-none focus-visible:ring-1 focus-visible:ring-[#ff4500]/60 focus-visible:ring-offset-0",
          "active:scale-90",
          vote === "up" && "text-[#ff4500] fill-[#ff4500] hover:bg-[#ff4500]/15"
        )}
        aria-pressed={vote === "up"}
        aria-label="Upvote"
      >
        <RedditArrow direction="up" />
      </button>
      <div className="h-px w-5 bg-gray-200 dark:bg-gray-700" />
      <button
        type="button"
        onClick={() => handleVote("down")}
        className={cn(
          "group/down inline-flex items-center justify-center w-7 h-6 rounded-sm transition-all duration-100",
          "text-gray-400 hover:text-[#7193ff] hover:bg-[#7193ff]/10",
          "focus:outline-none focus-visible:ring-1 focus-visible:ring-[#7193ff]/60 focus-visible:ring-offset-0",
          "active:scale-90",
          vote === "down" && "text-[#7193ff] fill-[#7193ff] hover:bg-[#7193ff]/15"
        )}
        aria-pressed={vote === "down"}
        aria-label="Downvote"
      >
        <RedditArrow direction="down" />
      </button>
    </div>
  );
}
