import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  Flex,
  Icon,
  useBreakpointValue,
  Divider,
  Spinner,
} from '@chakra-ui/react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';

// Contact Page Component
const ContactPage = () => {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
     const res =  await axios.post('http://localhost:8000/api/contact/register', { name, studentId, message },{
        headers:{
            "Content-Type" : "application/json"
        }
      });
     if(res)
     {
        toast({
            title: 'Message Sent',
            description: 'We have received your message and will get back to you soon.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          setName('');
          setStudentId('');
          setMessage('');
     }
    } catch (error) {
        console.log(error);
      toast({
        title: 'Error',
        description: 'There was an issue sending your message. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      bgGradient="linear(to-b, teal.100)"
      color="gray.800"
      p={8}
      minH="100vh"
      position="relative"
      overflow="hidden"
    >
      {/* Hero Section */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        textAlign="center"
        mb={12}
        pt={{ base: 10, md: 20 }}
        pb={{ base: 10, md: 20 }}
        bgImage="url('https://d20x1nptavktw0.cloudfront.net/wordpress_media/2022/06/College.jpg')"
        bgSize="cover"
        bgPosition="center"
        borderRadius="md"
        boxShadow="xl"
        position="relative"
        overflow="hidden"
      >
        <Box
          bg="rgba(0, 0, 0, 0.6)"
          p={8}
          borderRadius="md"
          boxShadow="lg"
          position="relative"
          zIndex="1"
        >
          <Heading mb={4} fontSize="5xl" color="white" fontWeight="bold">
            Get in Touch
          </Heading>
          <Text fontSize="lg" mb={8} maxW="600px" mx="auto" color="white">
            We would love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out to us.
          </Text>
        </Box>
      </Flex>

      {/* Contact Form */}
      <Box
        bg="white"
        p={8}
        borderRadius="md"
        boxShadow="xl"
        mx="auto"
        maxW="600px"
        mb={12}
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl id="name" isRequired>
              <FormLabel fontSize="lg" fontWeight="bold">Your Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                borderColor="teal.400"
              />
            </FormControl>
            <FormControl id="studentid" isRequired>
              <FormLabel fontSize="lg" fontWeight="bold">Student ID</FormLabel>
              <Input
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="123456"
                borderColor="teal.400"
              />
            </FormControl>
            <FormControl id="message" isRequired>
              <FormLabel fontSize="lg" fontWeight="bold">Your Message</FormLabel>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                borderColor="teal.400"
              />
            </FormControl>
            <Button
              colorScheme="teal"
              type="submit"
              isLoading={loading}
              loadingText="Sending"
            >
              Send Message
            </Button>
          </VStack>
        </form>
      </Box>

      {/* Contact Information */}
      <Box textAlign="center" mt={12}>
        <Heading mb={4} fontSize="3xl" color="teal.600">
          Our Contact Information
        </Heading>
        <Flex direction="column" align="center" spacing={4}>
          <Flex align="center" mb={4}>
            <Icon as={FaPhone} boxSize="30px" color="teal.500" mr={3} />
            <Text fontSize="lg">+1 234 567 890</Text>
          </Flex>
          <Flex align="center" mb={4}>
            <Icon as={FaEnvelope} boxSize="30px" color="teal.500" mr={3} />
            <Text fontSize="lg">info@example.com</Text>
          </Flex>
          <Flex align="center">
            <Icon as={FaMapMarkerAlt} boxSize="30px" color="teal.500" mr={3} />
            <Text fontSize="lg">1234 College Ave, City, Country</Text>
          </Flex>
        </Flex>
      </Box>

      {/* Divider */}
      <Divider mt={12} mb={8} borderColor="teal.400" />

      {/* Footer */}
      <Box textAlign="center" mt={12}>
        <Text fontSize="sm" color="gray.600">
          &copy; {new Date().getFullYear()} Your Website Name. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default ContactPage;
