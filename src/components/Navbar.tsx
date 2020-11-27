import { Box, Typography, Link } from "@material-ui/core"
import NextLink from "next/link";
import React from "react";

interface NavbarProps {}

export const NavBar: React.FC<NavbarProps> = () => {
  let body = null;
  return (
    <Box display="flex" zIndex={1} position="sticky" top={0} color="teal" p={4}>
      <Box display="flex" flex={1} m="auto" alignItems="center" maxWidth={800}>
        <NextLink href="/">
          <Link>
            <Typography variant="h4" component="h4">Audionekt</Typography>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Box>
    </Box>
  );
};
