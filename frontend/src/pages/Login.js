import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Stack,
  Link as ChakraLink,
  Text,
  useColorModeValue,
  useToast,
  Icon,
  Slide,
  useDisclosure,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../contextapi/authContext';

const Login = ({ params }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const [auth, setAuth] = useAuth({});
  const navigate = useNavigate();
  const bg = useColorModeValue('gray.50', 'gray.800');
  const boxBg = useColorModeValue('white', 'gray.700');
  const color = useColorModeValue('gray.800', 'white');

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onOpen, onClose]);

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8000/api/student/login', {
        studentid: studentId,
        password,
      });

      if (res) {
        toast({
          title: 'Login successful.',
          description: 'You have successfully logged in',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        console.log(res.data);
        await localStorage.setItem('auth', JSON.stringify(res.data));
        setAuth(res.data);
        
       params ? navigate(params ? `/${params}` : '/') : navigate("/complaint")
      }
    } catch (error) {
      toast({
        title: 'Login failed.',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg={bg} p={6}>
      <Stack
        spacing={8}
        mx="auto"
        maxW={{ base: 'sm', md: 'md', lg: 'lg' }}
        w="full"
        py={12}
        px={6}
        position="relative"
        top={{ base: '-30px', md: '-55px' }}
      >
        <Slide direction="top" in={isOpen} style={{ zIndex: 10 }}>
          <Box
            p={4}
            bg="teal.500"
            color="white"
            rounded="md"
            shadow="md"
            textAlign="center"
          >
            Please log in to make complaints.
          </Box>
        </Slide>

        <Stack align="center">
          <Heading fontSize="4xl" textAlign="center" color={color}>
            Login
          </Heading>
          <Text fontSize="lg" color="gray.600">
            to access your account
          </Text>
        </Stack>
        <Box
          rounded="lg"
          bg={boxBg}
          boxShadow="lg"
          p={{ base: 6, md: 8 }}
          borderWidth={{ base: '1px', md: '2px' }}
          borderColor="teal.300"
        >
          <Stack spacing={6}>
            <FormControl id="studentId" isRequired>
              <FormLabel>Student ID</FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="123456"
                  borderColor="teal.300"
                />
                <InputRightElement pointerEvents="none">
                  <Icon as={FaUser} color="teal.400" />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  borderColor="teal.300"
                />
                <InputRightElement h="full">
                  <Button
                    variant="link"
                    onClick={() => setShowPassword(!showPassword)}
                    color="teal.400"
                  >
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={6} pt={2}>
              <Button
                size="lg"
                bg="teal.400"
                color="white"
                _hover={{ bg: 'teal.500' }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align="center">
                Don't have an account?{' '}
                <ChakraLink color="teal.400" as={Link} to="/signup">
                  Sign Up
                </ChakraLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
