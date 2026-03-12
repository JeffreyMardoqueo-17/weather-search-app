import type { Metadata } from "next"
import { Figtree, Geist_Mono } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

import "./globals.css"

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" })

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Weather Search App",
    template: "%s | Weather Search App",
  },
  description:
    "Aplicacion base para buscar el clima por ciudad con Next.js App Router y Shadcn UI.",
  keywords: [
    "weather",
    "clima",
    "next.js",
    "shadcn ui",
    "typescript",
    "tailwind",
  ],
  openGraph: {
    title: "Weather Search App",
    description:
      "Interfaz inicial para consultas meteorologicas, optimizada para escalar.",
    type: "website",
    locale: "es_ES",
    siteName: "Weather Search App",
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
