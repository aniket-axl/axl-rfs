"use client";

import { useEffect, useState } from "react";

type Item = { id: string; title: string };

/** Left-edge tick marks, one per request; the one in view is longer and navy. Desktop only (CSS). */
export default function Toc({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    if (els.length < 2) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      // A request counts as "in view" when it crosses the middle band of the viewport.
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <nav className="toc" aria-label="Requests on this page">
      {items.map((i) => (
        <a
          key={i.id}
          href={`#${i.id}`}
          className={i.id === active ? "on" : undefined}
          aria-current={i.id === active ? "location" : undefined}
          aria-label={i.title}
        />
      ))}
    </nav>
  );
}
