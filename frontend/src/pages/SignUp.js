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
  Select,
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
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FaUser, FaEnvelope } from 'react-icons/fa';
import { MdSchool, MdClass, MdDateRange } from 'react-icons/md';
import axios from 'axios';

const branches = ['Computer Science', 'Electronics', 'Mechanical','civil'];
const sections = ['A', 'B', 'C'];
const semesters = ['Semester 1', 'Semester 2', 'Semester 3','Semester 4','Semester 5','Semester 5','Semester 6','Semester 7','Semester 8'];

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [branch, setBranch] = useState('');
  const [section, setSection] = useState('');
  const [semester, setSemester] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const bg = useColorModeValue('gray.50', 'gray.800');
  const boxBg = useColorModeValue('white', 'gray.700');
  const color = useColorModeValue('gray.800', 'white');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/student/register', {
        name,
        studentid: studentId,
        password,
        email,
        branch,
        section,
        semester,
      });
      toast({
        title: 'Registration Successful',
        description: 'You have been registered successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/login');
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
        maxW="xl" // Increased max width for the form container
        w="full"
        py={12}
        px={6}
        position="relative"
        top={{ base: '-30px', md: '-55px' }} // Adjust vertical position
      >
        <Stack align="center">
          <Heading fontSize="4xl" textAlign="center" color={color}>
            Sign Up
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
          borderWidth={{ base: '1px', md: '2px' }} // Add border for a clean look
          borderColor="teal.300" // Add border color
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
                      borderColor="teal.300" // Custom border color
                    />
                    <InputRightElement pointerEvents="none">
                      <Icon as={FaUser} color="teal.400" />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </GridItem>

              <GridItem>
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
              </GridItem>
            </Grid>

            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
              <GridItem>
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <InputGroup>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      borderColor="teal.300"
                    />
                    <InputRightElement pointerEvents="none">
                      <Icon as={FaEnvelope} color="teal.400" />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </GridItem>

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

            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
              <GridItem>
                <FormControl id="branch" isRequired>
                  <FormLabel>Branch</FormLabel>
                  <Select
                    placeholder="Select branch"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    bg="white"
                    borderColor="teal.300"
                    icon={<Icon as={MdSchool} color="teal.400" />}
                  >
                    {branches.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl id="section" isRequired>
                  <FormLabel>Section</FormLabel>
                  <Select
                    placeholder="Select section"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    bg="white"
                    borderColor="teal.300"
                    icon={<Icon as={MdClass} color="teal.400" />}
                  >
                    {sections.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </GridItem>
            </Grid>

            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
              <GridItem>
                <FormControl id="semester" isRequired>
                  <FormLabel>Semester</FormLabel>
                  <Select
                    placeholder="Select semester"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    bg="white"
                    borderColor="teal.300"
                    icon={<Icon as={MdDateRange} color="teal.400" />}
                  >
                    {semesters.map((sem) => (
                      <option key={sem} value={sem}>
                        {sem}
                      </option>
                    ))}
                  </Select>
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

export default SignUp;
