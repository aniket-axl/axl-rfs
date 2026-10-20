export const SITE_NAME = "RFS · AXL";

/** Hero intro on the page; also the meta / link-preview description. */
export const SITE_DESCRIPTION =
  "Requests for Startups is where AXL shares the problems we think deserve a company. Each month, our Foundry sessions bring corporate partners, researchers and operators together to pressure-test ideas, and these are the ones that held up. If one fits something you want to build, we’d love to hear from you.";

export const CONTACT_HREF =
  "mailto:daniel@axl.vc?cc=founders@axl.vc&subject=Requests%20for%20Startups";

/** Absolute site URL for Open Graph tags. Set NEXT_PUBLIC_SITE_URL once a custom domain exists. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
