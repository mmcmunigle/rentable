"use client";
import { Button, Group, Paper, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
// import { usePathname } from "next/navigation";
import logo from "./assets/logo.png";

const NavBar = () => {
  return (
    <nav>
      <Paper shadow="md" px="lg">
        <Group justify="space-between" align="center" px="xl" py="xs">
          <Group align="center" gap="lg">
            <Link href="/">
              <Image src={logo} width="50" height="50" alt="" />
            </Link>
            <NavLinks />
          </Group>
          <AuthStatus />
        </Group>
      </Paper>
    </nav>
  );
};

const NavLinks = () => {
  // const currentPath = usePathname();

  const links = [
    { label: "Calculator", href: "/calculator" },
    // { label: "About Us", href: "/about" },
  ];

  return (
    <Group>
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          <Text>{link.label}</Text>
        </Link>
      ))}
    </Group>
  );
};

const AuthStatus = () => {
  return <Button>Log In</Button>;
};

// const AuthStatus = () => {
//   const { status, data: session } = useSession();

//   if (status === "loading") return <Skeleton width="3rem" />;

//   if (status === "unauthenticated")
//     return (
//       <Link className="nav-link" href="/api/auth/signin">
//         Log in
//       </Link>
//     );

//   return (
//     <Box>
//       <DropdownMenu.Root>
//         <DropdownMenu.Trigger>
//           <Avatar
//             src={session!.user?.image!}
//             fallback="?"
//             size="2"
//             radius="full"
//             className="cursor-pointer"
//             referrerPolicy="no-referrer"
//           />
//         </DropdownMenu.Trigger>
//         <DropdownMenu.Content>
//           <DropdownMenu.Label>
//             <Text size="3">{session!.user?.email}</Text>
//           </DropdownMenu.Label>
//           <DropdownMenu.Item>
//             <Link href="/api/auth/signout">Log out</Link>
//           </DropdownMenu.Item>
//         </DropdownMenu.Content>
//       </DropdownMenu.Root>
//     </Box>
//   );
// };

export default NavBar;
