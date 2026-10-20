import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { CONTACT_HREF, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  openGraph: { siteName: "AXL", type: "website", locale: "en_GB" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#030031",
  colorScheme: "only light",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <header className="nav">
          <a className="brand" href="https://axl.vc" aria-label="AXL home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/axl-mark-on-dark-90h.png" alt="AXL" width={86} height={30} />
          </a>
          <a className="btn btn-solid contact" href={CONTACT_HREF}>
            Contact
          </a>
        </header>

        {children}

        <footer>
          <div className="foot">
            <div className="tag">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/axl-mark-on-dark-90h.png" alt="AXL" width={92} height={32} loading="lazy" />
              <span>Human Potential, AI Superpowered</span>
            </div>
            <div className="legal">© {new Date().getFullYear()} AXL Venture Studio</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
