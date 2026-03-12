import type { NextConfig } from "next"

const iconBaseUrl =
  process.env.NEXT_PUBLIC_OPENWEATHER_ICON_BASE_URL ??
  "https://openweathermap.org/img/wn"
const parsedIconBaseUrl = new URL(iconBaseUrl)

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: parsedIconBaseUrl.hostname,
        pathname: `${parsedIconBaseUrl.pathname.replace(/\/$/, "")}/**`,
      },
    ],
  },
}

export default nextConfig
