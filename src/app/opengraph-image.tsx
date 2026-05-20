import { ImageResponse } from "next/og";

import { defaultBusiness } from "@/content/site";
import { getBusinessSettings } from "@/lib/settings-store";

export const alt = `${defaultBusiness.name} social preview`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const business = await getBusinessSettings();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: 42,
          background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
          color: "#0f172a",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            borderRadius: 40,
            border: "1px solid rgba(15, 23, 42, 0.08)",
            background: "#ffffff",
            padding: 44,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 76,
                height: 76,
                borderRadius: 24,
                background: "#0f172a",
                color: "white",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: 900,
                letterSpacing: "0.18em",
              }}
            >
              AZ
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontSize: 22,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "#475569",
                }}
              >
                Vashi computer support
              </span>
              <span
                style={{
                  fontSize: 38,
                  fontWeight: 700,
                }}
              >
                {business.name}
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              maxWidth: 900,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 70,
                lineHeight: 1.03,
                fontWeight: 700,
              }}
            >
              Repair, installation, networking, and printer support.
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 28,
                lineHeight: 1.35,
                color: "#475569",
              }}
            >
              Call, WhatsApp, or book support in minutes.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 16,
              }}
            >
              {["Laptop repair", "Installation help", "Networking"].map(
                (chip) => (
                  <div
                    key={chip}
                    style={{
                      display: "flex",
                      padding: "12px 18px",
                      borderRadius: 999,
                      border: "1px solid rgba(15, 23, 42, 0.08)",
                      background: "#f8fafc",
                      fontSize: 22,
                      color: "#334155",
                    }}
                  >
                    {chip}
                  </div>
                ),
              )}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 24,
                color: "#475569",
              }}
            >
              {business.primaryPhoneDisplay}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
