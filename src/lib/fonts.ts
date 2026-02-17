import { GeistMono } from "geist/font/mono";
import {
  // IBM_Plex_Mono as FontMono,
  IBM_Plex_Sans as FontSans,
} from "next/font/google";
import localFont from "next/font/local";

export const fontSans = FontSans({
  weight: ["400", "500", "600"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-sans",
});

// export const fontMono = FontMono({
//   weight: ["400", "500", "600"],
//   display: "swap",
//   subsets: ["latin"],
//   variable: "--font-mono",
// });
export const fontMono = GeistMono;

export const fontDisplay = localFont({
  src: "../assets/fonts/Magistral-Medium.ttf",
  display: "swap",
  variable: "--font-display",
});
