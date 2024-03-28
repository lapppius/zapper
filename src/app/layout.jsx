import Header from "../components/Header";
import Player from "../components/Player/Player";
import "./globals.scss";

import { Manrope } from "next/font/google";

export const metadata = {
  metadataBase: process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : new URL(`http://localhost:${process.env.PORT || 3000}`),
  title: {
    template: "%s | Zapper Music",
    default: "Zapper Music", // a default is required when creating a template
  },
};

const manrope = Manrope({
  weight: "300",
  subsets: ["latin", "greek"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.className}>
      <body>
        <Header />
        <div className="rootLayout">{children}</div>
        <Player />
      </body>
    </html>
  );
}
