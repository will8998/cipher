import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";

import { TeamProvider } from "@/context/team-context";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import PlausibleProvider from "next-plausible";
import { NuqsAdapter } from "nuqs/adapters/next/pages";

import { EXCLUDED_PATHS } from "@/lib/constants";

import { PostHogCustomProvider } from "@/components/providers/posthog-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps<{ session: Session }>) {
  return (
    <>
      <Head>
        <title>Classified | Secure Document Sharing Platform</title>
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Classified is a secure document sharing platform with built-in analytics and advanced tracking."
          key="description"
        />
        <meta
          property="og:title"
          content="Classified | Secure Document Sharing Platform"
          key="og-title"
        />
        <meta
          property="og:description"
          content="Classified is a secure document sharing platform with built-in analytics and advanced tracking."
          key="og-description"
        />
        <meta
          property="og:image"
          content="https://securemi.xyz/_static/meta-image.png"
          key="og-image"
        />
        <meta
          property="og:url"
          content="https://securemi.xyz"
          key="og-url"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@securemiapp" />
        <meta name="twitter:creator" content="@securemiapp" />
        <meta name="twitter:title" content="Classified" key="tw-title" />
        <meta
          name="twitter:description"
          content="Classified is a secure document sharing platform with built-in analytics and advanced tracking."
          key="tw-description"
        />
        <meta
          name="twitter:image"
          content="https://securemi.xyz/_static/meta-image.png"
          key="tw-image"
        />
        <link rel="icon" href="/favicon.ico" key="favicon" />
      </Head>
      <SessionProvider session={session}>
        <PostHogCustomProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <PlausibleProvider
              domain="securemi.xyz"
              enabled={process.env.NEXT_PUBLIC_VERCEL_ENV === "production"}
            >
              <NuqsAdapter>
                <main className={inter.className}>
                  <Toaster closeButton />
                  <TooltipProvider delayDuration={100}>
                    {EXCLUDED_PATHS.includes(router.pathname) ? (
                      <Component {...pageProps} />
                    ) : (
                      <TeamProvider>
                        <Component {...pageProps} />
                      </TeamProvider>
                    )}
                  </TooltipProvider>
                </main>
              </NuqsAdapter>
            </PlausibleProvider>
          </ThemeProvider>
        </PostHogCustomProvider>
      </SessionProvider>
    </>
  );
}
