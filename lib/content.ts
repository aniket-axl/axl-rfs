import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const CONTENT_DIR = path.join(process.cwd(), "content");
const MONTH_RE = /^\d{4}-(0[1-9]|1[0-2])$/;

export type Request = {
  slug: string;
  month: string;
  title: string;
  order: number;
  briefUrl: string;
  videoUrl: string;
  /** Body rendered to HTML. The first paragraph carries class="lede". */
  html: string;
  /** Plain-text first paragraph, used for meta descriptions. */
  summary: string;
};

/** Month folders that contain at least one request, newest first. */
export function getMonths(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && MONTH_RE.test(d.name))
    .map((d) => d.name)
    .filter((m) => mdFiles(m).length > 0)
    .sort()
    .reverse();
}

export function getLatestMonth(): string | undefined {
  return getMonths()[0];
}

function mdFiles(month: string): string[] {
  return fs
    .readdirSync(path.join(CONTENT_DIR, month))
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"));
}

const cache = new Map<string, Request[]>();

/** Requests for a month, sorted by `order` then title. */
export async function getRequests(month: string): Promise<Request[]> {
  const hit = cache.get(month);
  if (hit) return hit;

  const requests = await Promise.all(
    mdFiles(month).map(async (file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, month, file), "utf8");
      const { data, content } = matter(raw);
      const slug = String(data.slug || file.replace(/\.md$/, ""));
      if (!data.title) throw new Error(`content/${month}/${file}: missing "title" in frontmatter`);

      const rendered = String(await remark().use(html).process(content.trim()));
      const firstPara = content.trim().split(/\n\s*\n/)[0] ?? "";

      return {
        slug,
        month,
        title: String(data.title),
        order: Number(data.order ?? 999),
        briefUrl: String(data.briefUrl ?? "").trim(),
        videoUrl: String(data.videoUrl ?? "").trim(),
        html: rendered.replace("<p>", '<p class="lede">'),
        summary: stripMarkdown(firstPara),
      } satisfies Request;
    }),
  );

  requests.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
  cache.set(month, requests);
  return requests;
}

/** "2026-10" → "October 2026" */
export function monthLabel(month: string): string {
  const [y, m] = month.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function stripMarkdown(s: string): string {
  return s
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
