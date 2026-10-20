export const SITE_NAME = "Requests for Startups · AXL";

export const SITE_DESCRIPTION =
  "Requests for Startups is where AXL shares the problems we think deserve a company.";

export const CONTACT_HREF =
  "mailto:daniel@axl.vc?cc=founders@axl.vc&subject=Requests%20for%20Startups";

/** Absolute site URL for Open Graph tags. Set NEXT_PUBLIC_SITE_URL once a custom domain exists. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
