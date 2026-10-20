export type Embed = { src: string; vertical: boolean; provider: "YouTube" | "Loom" };

/** Turns a YouTube (watch, youtu.be, Shorts, embed) or Loom share URL into an embeddable src. */
export function toEmbed(url: string): Embed | null {
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^(www\.|m\.)/, "");

  if (host === "youtube.com" || host === "youtube-nocookie.com" || host === "youtu.be") {
    let id: string | null = null;
    let vertical = false;
    if (host === "youtu.be") id = u.pathname.slice(1);
    else if (u.pathname.startsWith("/shorts/")) {
      id = u.pathname.split("/")[2];
      vertical = true;
    } else if (u.pathname.startsWith("/embed/")) id = u.pathname.split("/")[2];
    else id = u.searchParams.get("v");
    if (!id || !/^[\w-]{6,}$/.test(id)) return null;
    return { src: `https://www.youtube-nocookie.com/embed/${id}?rel=0`, vertical, provider: "YouTube" };
  }

  if (host === "loom.com") {
    const m = u.pathname.match(/^\/(?:share|embed)\/([a-f0-9]+)/i);
    if (!m) return null;
    return { src: `https://www.loom.com/embed/${m[1]}`, vertical: false, provider: "Loom" };
  }

  return null;
}
