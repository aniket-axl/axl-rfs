import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "./site";

const SHARE_IMAGE = { url: "/og/rfs.png", width: 1200, height: 630, alt: "RFS, AXL Requests for Startups" };

/** Metadata for a month page. Every page shares the same title, description and share image. */
export function monthMetadata(month: string): Metadata {
  return {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    alternates: { canonical: `/${month}` },
    openGraph: { title: SITE_NAME, description: SITE_DESCRIPTION, url: `/${month}`, images: [SHARE_IMAGE] },
    twitter: { title: SITE_NAME, description: SITE_DESCRIPTION, images: [SHARE_IMAGE.url] },
  };
}
