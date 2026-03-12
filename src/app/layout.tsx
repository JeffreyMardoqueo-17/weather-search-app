import type { Metadata } from "next"
import { Figtree, Geist_Mono } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

import "./globals.css"

const siteName = "Weather Search App"
const siteTitle = "Aplicación de clima en tiempo real"
const siteDescription =
  "Consulta el clima actual de cualquier ciudad del mundo con temperatura, humedad y descripción meteorológica en tiempo real usando Next.js y OpenWeatherMap."

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" })

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  applicationName: siteName,
  title: {
    default: `${siteTitle} | ${siteName}`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "aplicacion del clima",
    "clima actual",
    "clima por ciudad",
    "consultar clima",
    "temperatura actual",
    "humedad actual",
    "pronostico del tiempo",
    "weather app",
    "current weather",
    "openweathermap",
    "next.js",
    "typescript",
    "tailwind",
    "shadcn ui",
  ],
  category: "weather",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: `${siteTitle} | ${siteName}`,
    description: siteDescription,
    type: "website",
    locale: "es_ES",
    siteName,
    countryName: "Global",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteTitle} | ${siteName}`,
    description: siteDescription,
  },
}

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" suppressHydrationWarning className={cn("font-sans", figtree.variable)}>
      <body className={`${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
