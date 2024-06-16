import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import {ClerkProvider} from "@clerk/nextjs";

export const metadata = {
  title: "Meow weight tracker",
  description: "web app to help manage and track your pet's weight",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <ClerkProvider>
        <html lang="en" className={`${GeistSans.variable}`}>
          <body>
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </body>
        </html>
      </ClerkProvider>
  );
}
