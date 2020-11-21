import { Box, Flex, Heading, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";

interface NavbarProps {}

export const NavBar: React.FC<NavbarProps> = () => {
  let body = null;
  return (
    <Flex zIndex={1} position="sticky" top={0} bg="teal" p={4}>
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <NextLink href="/">
          <Link>
            <Heading>Audionekt</Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
