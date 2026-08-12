import { Manrope, Pinyon_Script, Prata } from "next/font/google";

export const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
export const display = Prata({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  display: "swap",
  weight: "400",
});
export const navbarScript = Pinyon_Script({
  subsets: ["latin"],
  variable: "--font-navbar-script",
  display: "swap",
  weight: "400",
});
