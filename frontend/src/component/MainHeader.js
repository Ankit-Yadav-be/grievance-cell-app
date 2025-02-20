import React from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Link as ChakraLink,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
  useToast,
  Image,
  Tooltip,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiLogOut, FiMenu } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

const MainHeader = () => {
  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("gray.800", "white");
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const mobileMenuBg = useColorModeValue("white", "gray.800");
  const logoSrc = "https://vectorified.com/images/complaint-icon-9.png"; // Replace with your logo URL

  const navigate = useNavigate();
  const toast = useToast();

  return (
    <Box bg={bg} px={4} py={2} boxShadow="lg" borderBottom="1px" borderColor={useColorModeValue("gray.200", "gray.600")}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo and Title */}
        <Flex alignItems="center">
          <Image src={logoSrc} alt="Logo" boxSize="50px" mr={4} ml={3} borderRadius="full" border="2px" borderColor="teal.500" />
          <Flex direction="column">
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color={color}
              bgGradient="linear(to-r, teal.300, green.400)"
              bgClip="text"
              fontFamily="heading"
              letterSpacing="wider"
              transition="all 0.3s ease"
              _hover={{ bgGradient: "linear(to-r, teal.400, green.500)" }}
            >
              <ChakraLink as={Link} to="/" _hover={{ textDecoration: "none" }}>
                College Complaint Portal
              </ChakraLink>
            </Text>
            <Text
              fontSize="md"
              color={color}
              fontFamily="body"
              fontWeight="medium"
              mt={1}
            >
              Your go-to place for managing complaints efficiently
            </Text>
          </Flex>
        </Flex>

        {/* Desktop Menu */}
        <Flex alignItems="center" display={{ base: "none", md: "flex" }}>
          <Stack direction="row" spacing={4}>
            <Button
              as={Link}
              to="/"
              variant="ghost"
              color={color}
              _hover={{ bg: hoverBg }}
              _active={{ bg: hoverBg }}
              transition="all 0.3s"
            >
              Home
            </Button>
            <Button
              as={Link}
              to="/about"
              variant="ghost"
              color={color}
              _hover={{ bg: hoverBg }}
              _active={{ bg: hoverBg }}
              transition="all 0.3s"
            >
              About
            </Button>
            <Button
              as={Link}
              to="/services"
              variant="ghost"
              color={color}
              _hover={{ bg: hoverBg }}
              _active={{ bg: hoverBg }}
              transition="all 0.3s"
            >
              Services
            </Button>
            <Button
              as={Link}
              to="/contact"
              variant="ghost"
              color={color}
              _hover={{ bg: hoverBg }}
              _active={{ bg: hoverBg }}
              transition="all 0.3s"
            >
              Contact
            </Button>
            <Button
              as={Link}
              to="/fslogin"
              variant="solid"
              colorScheme="teal"
            >
              Sign In
            </Button>
            <Button as={Link} to="/fs" variant="outline" colorScheme="teal">
              Sign Up
            </Button>
            <ThemeToggle />
          </Stack>

          <Menu>
            <MenuButton
              as={Button}
              rounded="full"
              variant="link"
              cursor="pointer"
              ml={4}
            >
              <Avatar size="sm" src="https://bit.ly/broken-link" />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link to="/profile">Profile</Link>
              </MenuItem>
              <MenuItem>
                <Button onClick={() => toast({ title: "Logged out.", status: "info", duration: 3000 })}>
                  <FiLogOut />
                  <Text ml={2}>Logout</Text>
                </Button>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        {/* Mobile Menu */}
        <Flex alignItems="center" display={{ base: "flex", md: "none" }}>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FiMenu />}
              variant="outline"
              aria-label="Menu"
              color={color}
              _hover={{ bg: hoverBg }}
            />
            <MenuList bg={mobileMenuBg}>
              <MenuItem as={Link} to="/">
                Home
              </MenuItem>
              <MenuItem as={Link} to="/about">
                About
              </MenuItem>
              <MenuItem as={Link} to="/services">
                Services
              </MenuItem>
              <MenuItem as={Link} to="/contact">
                Contact
              </MenuItem>
              <MenuItem as={Link} to="/fslogin">
                Sign In
              </MenuItem>
              <MenuItem as={Link} to="/fs">
                Sign Up
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default MainHeader;
