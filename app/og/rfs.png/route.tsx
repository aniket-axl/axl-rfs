import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

// The site-wide 1200×630 share image, rendered at build time: /og/rfs.png
export const dynamic = "force-static";

const read = (...p: string[]) => fs.readFile(path.join(process.cwd(), ...p));

export async function GET() {

  const [archivo, mono, logo] = await Promise.all([
    read("assets/fonts/Archivo-Light.ttf"),
    read("assets/fonts/IBMPlexMono-Medium.ttf"),
    read("public/logos/axl-mark-on-dark-132h.png"),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#030031",
          padding: "72px 80px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={189} height={66} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div
            style={{
              fontFamily: "Plex Mono",
              fontSize: 26,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#02FFCE",
            }}
          >
            Requests for Startups
          </div>
          <div
            style={{
              fontFamily: "Archivo",
              fontWeight: 300,
              fontSize: 120,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              maxWidth: 1000,
            }}
          >
            RFS
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Archivo", data: archivo, weight: 300, style: "normal" },
        { name: "Plex Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
