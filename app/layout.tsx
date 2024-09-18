import { ColorSchemeScript, Container, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import React from "react";
import { theme } from "../theme";
import "./globals.css";
import NavBar from "./NavBar";

export const metadata = {
  title: "Mantine Next.js template",
  description: "I am using Mantine with Next.js!",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
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
