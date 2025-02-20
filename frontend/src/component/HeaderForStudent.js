// Header.js
import React, { useEffect } from "react";
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
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiLogOut, FiMenu } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../contextapi/authContext";

const HeaderForStudent = () => {
  const bg = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("gray.800", "white");
  const hoverBg = useColorModeValue("gray.200", "gray.700");
  const mobileMenuBg = useColorModeValue("gray.100", "gray.900");
  const [auth, setAuth] = useAuth("");
  
  const navigate  = useNavigate();
  const toast = useToast();
  // useEffect(()=>{
  //   if(auth)
  //     console.log(auth);
  // })


  const handlelogoutteacher =()=>{
    setAuth(null);
    localStorage.removeItem("auth");
    navigate("/");
  }


  return (
    <Box bg={bg} px={4} boxShadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo and Title */}
        <Flex alignItems="center">
          <Text fontSize="2xl" fontWeight="bold" color={color}>
            <ChakraLink as={Link} to="/" _hover={{ textDecoration: "none" }}>
              College Complaint Management
            </ChakraLink>
          </Text>
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
            >
              Home
            </Button>
             
              <Button
                onClick={handlelogoutteacher}
                as={Link}
                variant="ghost"
                color={color}
                _hover={{ bg: hoverBg }}
              >
               Logout
              </Button>
             <Button
              as={Link}
              to="/complaint"
              variant="ghost"
              color={color}
              _hover={{ bg: hoverBg }}
             
            >
              complaints
            </Button>
           <Button
              as={Link}
              to="/complaint"
              variant="ghost"
              color={color}
              _hover={{ bg: hoverBg }}
            >
            
            </Button> 
              <Button
              as={Link}
              to="/about"
              variant="ghost"
              color={color}
              _hover={{ bg: hoverBg }}
            >
              About
            </Button>
            <Button
              as={Link}
              to="/services"
              variant="ghost"
              color={color}
              _hover={{ bg: hoverBg }}
            >
              Services
            </Button>
            <Button
              as={Link}
              to="/contact"
              variant="ghost"
              color={color}
              _hover={{ bg: hoverBg }}
            >
              Contact
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
              <MenuItem as={Link} to="/teachersignup">
                Contact
              </MenuItem>
              <MenuItem as={Link} to="/login">
                Sign In
              </MenuItem>
              <MenuItem as={Link} to="/signup">
                Sign Up
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default HeaderForStudent;
