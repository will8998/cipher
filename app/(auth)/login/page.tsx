import { Metadata } from "next";

import LoginClient from "./page-client";

const data = {
  description: "Login to Papermark",
  title: "Login | Papermark",
  url: "/login",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://classified.securemi.xyz"),
  title: data.title,
  description: data.description,
  openGraph: {
    title: data.title,
    description: data.description,
    url: data.url,
    siteName: "Classified",
    images: [
      {
        url: "/_static/meta-image.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: data.title,
    description: data.description,
    creator: "@papermarkio",
    images: ["/_static/meta-image.png"],
  },
};

export default function LoginPage() {
  return <LoginClient />;
}
