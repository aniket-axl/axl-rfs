import { toEmbed } from "@/lib/video";

export default function VideoCard({ url, title }: { url: string; title: string }) {
  const embed = url ? toEmbed(url) : null;
  if (url && !embed) console.warn(`[video] Unsupported videoUrl for "${title}": ${url}`);

  if (embed) {
    return (
      <div className={`video video-embed${embed.vertical ? "" : " video-wide"}`}>
        <iframe
          src={embed.src}
          title={`${title} (${embed.provider} video)`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  return (
    <div className="video" role="img" aria-label="Video coming soon">
      <div className="play">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#030031" aria-hidden="true">
          <path d="M8 5.5v13l10.5-6.5z" />
        </svg>
      </div>
      <div className="label" aria-hidden="true">Video coming soon</div>
    </div>
  );
}
