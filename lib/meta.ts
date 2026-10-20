import type { Metadata } from "next";
import { getRequests, monthLabel } from "./content";
import { SITE_DESCRIPTION, SITE_NAME } from "./site";

/** Metadata for a month page. The OG image is the month's first request (the one a share most likely points at). */
export async function monthMetadata(month: string): Promise<Metadata> {
  const requests = await getRequests(month);
  const lead = requests[0];
  const title = lead ? `${lead.title} · ${SITE_NAME}` : `${monthLabel(month)} · ${SITE_NAME}`;
  const description = lead?.summary || SITE_DESCRIPTION;
  const image = lead
    ? { url: `/og/${month}/${lead.slug}.png`, width: 1200, height: 630, alt: `${lead.title}, AXL Requests for Startups` }
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: `/${month}` },
    openGraph: { title, description, url: `/${month}`, images: image ? [image] : undefined },
    twitter: { title, description, images: image ? [image.url] : undefined },
  };
}
