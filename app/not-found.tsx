import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Page not found - ${SITE_NAME}`,
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="notfound" id="main">
      <p className="eyebrow">Error 404</p>
      <h1>
        Page not found<span className="dot">.</span>
      </h1>
      <p className="intro">That page doesn’t exist, or it’s moved. The latest requests are on the main page.</p>
      <Link className="btn btn-solid" href="/">
        See the latest requests
      </Link>
    </main>
  );
}
