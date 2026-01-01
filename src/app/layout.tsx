import type React from "react"
import type { Metadata } from "next"
import { Outfit, Instrument_Serif } from "next/font/google"
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/providers/theme-provider"
import { Toaster } from "sonner"
import ReactQueryProvider from "@/providers/react-query-provider"
import ReduxProvider from "@/providers/redux-provider"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: "400",
})

export const metadata: Metadata = {
  title: "Leeds AI - Turn Conversations into Customers",
  description:
    "Automate your social media outreach and lead qualification with AI-powered flows for Instagram, WhatsApp, and TikTok.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className={cn(outfit.variable, instrumentSerif.variable)}>
        <body className="min-h-screen bg-background text-foreground font-sans antialiased overflow-x-hidden">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <ReduxProvider>
              <ReactQueryProvider>
                {children}
              </ReactQueryProvider>
            </ReduxProvider>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
