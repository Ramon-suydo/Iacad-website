import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const runtime = "edge";
export const alt = "iACADEMY Library";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0a1128",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              background: "#d4af37",
              color: "#0a1128",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            i
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "white", fontSize: 26, fontWeight: 600 }}>
              iACADEMY
            </span>
            <span
              style={{
                color: "#e8c874",
                fontSize: 14,
                textTransform: "uppercase",
                letterSpacing: 3,
              }}
            >
              Library
            </span>
          </div>
        </div>
        <div
          style={{
            color: "white",
            fontSize: 52,
            fontWeight: 600,
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          A modern space for focused learning and discovery.
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 20,
            marginTop: 24,
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}