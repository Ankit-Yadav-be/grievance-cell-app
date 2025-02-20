import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  Icon,
  SimpleGrid,
  Flex,
  Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';

const Fs = () => {
  const [loading, setLoading] = useState(null); // null means no button is loading
  const navigate = useNavigate();

  const buttonHoverBg = useColorModeValue('teal.700', 'teal.600');
  const buttonHoverBgStudent = useColorModeValue('blue.700', 'blue.600');
  const leftBg = useColorModeValue('teal.50', 'teal.1000');
  const containerBg = useColorModeValue('white', 'gray.900');
  const containerShadow = useColorModeValue('xl', 'dark-lg');
  const imageUrl = 'https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg?w=740&t=st=1722795149~exp=1722795749~hmac=aac167ddd629f963123a9e76252f8f802af053f93ebe76bfe43816326063a790';

  const handleButtonClick = (path) => {
    setLoading(path); // Set loading state to the path of the button clicked
    setTimeout(() => {
      navigate(path);
      setLoading(null); // Reset loading state after navigation
    }, 1000); // Show spinner for 1 second
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-r, teal.400, blue.500)"
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={0} width="full" minH="100vh">
        {/* Left Section with Image */}
        <Flex
          bg={leftBg}
          align="center"
          justify="center"
          p={12}
          borderRightWidth={{ base: 0, md: '1px' }}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          display={{ base: 'none', md: 'flex' }}
        >
          <Box
            width="full"
            height="full"
            position="relative"
            overflow="hidden"
            borderRadius="lg"
          >
            <Image
              src={imageUrl}
              alt="Login Illustration"
              objectFit="cover"
              width="100%"
              height="100%"
              borderRadius="lg"
              boxShadow="lg"
              transition="transform 0.5s ease"
              _hover={{ transform: 'scale(1.05)' }}
            />
          </Box>
        </Flex>

        {/* Right Section with Buttons */}
        <Flex
          align="center"
          justify="center"
          bg={containerBg}
          p={12}
          boxShadow={containerShadow}
          direction="column"
          textAlign="center"
        >
          <Container maxW="md">
            <Heading mb={6} color="teal.600" fontSize={{ base: '3xl', md: '4xl' }}>
              Welcome for Sign Up
            </Heading>
            <Text mb={8} color="gray.600" fontSize={{ base: 'md', md: 'lg' }}>
              Please choose your role to proceed...
            </Text>
            <Stack spacing={4} direction="column" align="center">
              <Button
                onClick={() => handleButtonClick('/teachersignup')}
                variant="solid"
                colorScheme="teal"
                size="lg"
                width="full"
                _hover={{
                  bg: buttonHoverBg,
                  transform: 'scale(1.05)',
                  transition: 'all 0.3s ease-in-out',
                }}
                leftIcon={<Icon as={FaChalkboardTeacher} />}
                isLoading={loading === '/teachersignup'}
                loadingText="Redirecting..."
              >
                As a Faculty
              </Button>
              <Button
                onClick={() => handleButtonClick('/signup')}
                variant="solid"
                colorScheme="blue"
                size="lg"
                width="full"
                _hover={{
                  bg: buttonHoverBgStudent,
                  transform: 'scale(1.05)',
                  transition: 'all 0.3s ease-in-out',
                }}
                leftIcon={<Icon as={FaUserGraduate} />}
                isLoading={loading === '/signup'}
                loadingText="Redirecting..."
              >
                As a Student
              </Button>
            </Stack>
          </Container>
        </Flex>
      </SimpleGrid>
    </Box>
  );
};

export default Fs;
