import React from "react";
import { Container, Title, Text, Button, Center, Stack } from "@mantine/core";
import Link from "next/link";

const HomePage = () => {
  return (
    <Container>
      {/* Hero Section */}
      <Center style={{ height: "80vh" }}>
        <Stack align="center" gap="md">
          <Title order={1}>Welcome to Golden Summit Investment Analyzer</Title>
          <Text size="lg">
            Simplify your property investment decisions with our easy-to-use
            calculator.
          </Text>
          <Link href="/calculator">
            <Button
              size="lg"
              variant="gradient"
              gradient={{ from: "teal", to: "blue" }}
            >
              Go to Calculator
            </Button>
          </Link>
        </Stack>
      </Center>
    </Container>
  );
};

export default HomePage;
