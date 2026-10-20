import Link from "next/link";
import { getMonths, getRequests, monthLabel } from "@/lib/content";
import { SITE_DESCRIPTION } from "@/lib/site";
import Toc from "./Toc";
import VideoCard from "./VideoCard";

export default async function MonthPage({ month }: { month: string }) {
  const months = getMonths();
  const requests = await getRequests(month);

  return (
    <>
      <section className="hero">
        <p className="eyebrow">AXL Foundry</p>
        <h1>
          Requests for Startups<span className="dot">.</span>
        </h1>
        <p className="intro">{SITE_DESCRIPTION}</p>
      </section>

      <nav className="months" aria-label="Months">
        {months.map((m) =>
          m === month ? (
            <span key={m} className="month month-on" aria-current="page">
              {monthLabel(m)}
            </span>
          ) : (
            <Link key={m} className="month" href={`/${m}`}>
              {monthLabel(m)}
            </Link>
          ),
        )}
      </nav>

      <Toc items={requests.map((r) => ({ id: r.slug, title: r.title }))} />

      <main className="wrap" id="main">
        {requests.map((r) => (
          <article className="entry" id={r.slug} key={r.slug} aria-labelledby={`${r.slug}-title`}>
            <div>
              <h2 id={`${r.slug}-title`}>
                {r.title}
              </h2>
              <div className="body" dangerouslySetInnerHTML={{ __html: r.html }} />
              {r.briefUrl && (
                <a className="btn btn-line cta" href={r.briefUrl} target="_blank" rel="noopener noreferrer">
                  Read our full brief
                  <span className="sr-only"> (opens in a new tab)</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              )}
            </div>
            <VideoCard url={r.videoUrl} title={r.title} />
          </article>
        ))}
      </main>
    </>
  );
}
