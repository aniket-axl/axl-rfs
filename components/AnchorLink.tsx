"use client";

import { useState } from "react";

/** Link icon next to a request title: jumps to the anchor and copies its full URL. */
export default function AnchorLink({ id, title }: { id: string; title: string }) {
  const [copied, setCopied] = useState(false);

  async function onClick() {
    const url = `${location.origin}${location.pathname}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable: the link still updates the address bar.
    }
  }

  return (
    <>
      <a className={`anchor${copied ? " copied" : ""}`} href={`#${id}`} onClick={onClick} aria-label={`Copy link to “${title}”`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {copied ? (
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          ) : (
            <>
              <path d="M10 14a3.5 3.5 0 0 0 5 0l4-4a3.5 3.5 0 0 0-5-5l-.5.5" />
              <path d="M14 10a3.5 3.5 0 0 0-5 0l-4 4a3.5 3.5 0 0 0 5 5l.5-.5" />
            </>
          )}
        </svg>
      </a>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Link copied" : ""}
      </span>
    </>
  );
}
