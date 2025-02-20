import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Heading,
  Text,
  IconButton,
  useToast,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FaUser, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTeacher } from '../contextapi/teacherContext';

const TeacherLogin = () => {
  const [teacherid, setTeacherid] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const bg = useColorModeValue('gray.50', 'gray.800');
  const boxBg = useColorModeValue('white', 'gray.700');
  const color = useColorModeValue('gray.800', 'white');
  const [teacher,setTeacher] = useTeacher({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/teacher/login', {
        teacherid,
        password,
      });
      toast({
        title: 'Login Successful',
        description: 'You have been logged in successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      console.log(res.data);
        await localStorage.setItem('teacher', JSON.stringify(res.data));
        setTeacher(res.data);
      if(res.data.teacher.admin === true)
        { navigate("/admin")}  
      if(res.data.teacher.admin === false)
      {
      navigate('/teacher');
      } // Redirect to a dashboard or appropriate page
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: error.response.data.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={bg}
      p={6}
    >
      <Box
        maxW="lg"
        w="full"
        bg={boxBg}
        boxShadow="lg"
        rounded="lg"
        p={8}
      >
        <Stack spacing={4} mb={8}>
          <Heading fontSize="4xl" textAlign="center" color={color}>
           Faculty login
          </Heading>
          <Text fontSize="lg" color="gray.600" textAlign="center">
            Access your account
          </Text>
        </Stack>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="teacherid" isRequired>
              <FormLabel>Teacher ID</FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  value={teacherid}
                  onChange={(e) => setTeacherid(e.target.value)}
                  placeholder="Teacher ID"
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
                  <IconButton
                    variant="link"
                    onClick={() => setShowPassword(!showPassword)}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    aria-label="Toggle Password Visibility"
                    color="teal.400"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                size="lg"
                bg="teal.400"
                color="white"
                _hover={{ bg: 'teal.500' }}
                type="submit"
              >
                Log In
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default TeacherLogin;
