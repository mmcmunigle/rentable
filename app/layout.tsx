import "@mantine/core/styles.css";
import "./globals.css";
import React from "react";
import { MantineProvider, ColorSchemeScript, Container } from "@mantine/core";
import { theme } from "../theme";
import NavBar from "./NavBar";

export const metadata = {
  title: "Mantine Next.js template",
  description: "I am using Mantine with Next.js!",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <NavBar />
          <Container size="xl" mt="xl">
            {children}
          </Container>
        </MantineProvider>
      </body>
    </html>
  );
}
