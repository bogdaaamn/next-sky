import { Inter } from "next/font/google";

import "~/styles/globals.css";

type PropsType = {
  children: React.ReactNode;
};

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextSky",
  description: "Hey is this the sky",
};

export default function RootLayout({ children }: PropsType) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
