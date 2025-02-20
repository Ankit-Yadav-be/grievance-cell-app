import React, { useState } from 'react';
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
  Text,
  useColorModeValue,
  useToast,
  Icon,
  Divider,
  Link,
  Grid,
  GridItem,
  Select,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FaUser, FaIdBadge, FaBuilding } from 'react-icons/fa';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';



const TeacherSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
   const navigate = useNavigate();
  const bg = useColorModeValue('gray.50', 'gray.800');
  const boxBg = useColorModeValue('white', 'gray.700');
  const color = useColorModeValue('gray.800', 'white');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/teacher/register', {
        name,
        teacherid: teacherId,
        department,
        password,
      });
     
      toast({
        title: 'Registration Successful',
        description: 'You have been registered successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate("/teacherlogin");
      
      setName('');
      setTeacherId('');
      setDepartment('');
      setPassword('');
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: error.response.data.message || 'Something went wrong',
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
        maxW="xl"
        w="full"
        py={12}
        px={6}
        position="relative"
        top={{ base: '-30px', md: '-55px' }}
      >
        <Stack align="center">
          <Heading fontSize="4xl" textAlign="center" color={color}>
            Teacher Sign Up
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Create your account
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
            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
              <GridItem>
                <FormControl id="name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <InputGroup>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      borderColor="teal.300"
                    />
                    <InputRightElement pointerEvents="none">
                      <Icon as={FaUser} color="teal.400" />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl id="teacherId" isRequired>
                  <FormLabel>Teacher ID</FormLabel>
                  <InputGroup>
                    <Input
                      type="text"
                      value={teacherId}
                      onChange={(e) => setTeacherId(e.target.value)}
                      placeholder="T12345"
                      borderColor="teal.300"
                    />
                    <InputRightElement pointerEvents="none">
                      <Icon as={FaIdBadge} color="teal.400" />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </GridItem>
            </Grid>

            <Grid templateColumns={{ base: '1fr', md: '1fr' }} gap={6}>
              <GridItem>
                <FormControl id="department" isRequired>
                  <FormLabel>Department</FormLabel>
                  <InputGroup>
                    <Select
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="Department"
                      borderColor="teal.300"
                    >
                          <option value="hostel">hostel</option>
                            <option value="academics">academics</option>
                            <option value="fees">fees</option>
                            <option value="library">library</option>
                            <option value="other">others</option>
                        </Select>
                    <InputRightElement pointerEvents="none">
                      <Icon as={FaBuilding} color="teal.400" />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </GridItem>
            </Grid>

            <Grid templateColumns={{ base: '1fr', md: '1fr' }} gap={6}>
              <GridItem>
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
              </GridItem>
            </Grid>

            <Divider borderColor="teal.300" my={4} />

            <Button
              size="lg"
              bg="teal.400"
              color="white"
              _hover={{ bg: 'teal.500' }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>

            <Stack pt={6}>
              <Text align="center">
                Already have an account?{' '}
                <Link color="teal.400" as={RouterLink} to="/login">
                  Log In
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default TeacherSignUp;
