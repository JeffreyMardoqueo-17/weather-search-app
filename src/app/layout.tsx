import type { Metadata } from "next"
import { Figtree, Geist_Mono } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

import "./globals.css"

const siteName = "Weather Search App"
const siteTitle = "Aplicación de clima en tiempo real"
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
const socialImage = "/portada/portada.png"
const siteDescription =
  "Prueba tecnica para SDK JDK Outstanding Technologies: app de clima en Next.js que consulta temperatura, humedad y descripcion meteorologica por ciudad en tiempo real con OpenWeatherMap."

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" })

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: `${siteTitle} | ${siteName}`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  authors: [{ name: "SDK JDK Outstanding Technologies" }],
  creator: "SDK JDK Outstanding Technologies",
  publisher: "SDK JDK Outstanding Technologies",
  keywords: [
    "prueba tecnica",
    "sdk jdk outstanding technologies",
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
    url: "/",
    type: "website",
    locale: "es_ES",
    siteName,
    countryName: "Global",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "Weather Search App - Prueba tecnica para SDK JDK Outstanding Technologies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteTitle} | ${siteName}`,
    description: siteDescription,
    images: [socialImage],
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
