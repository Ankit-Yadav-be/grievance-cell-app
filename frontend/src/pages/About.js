import React from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  VStack,
  Icon,
  Image,
  SimpleGrid,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import { FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const AboutPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleContactSubmit = (e) => {
    e.preventDefault();
    toast({
      title: 'Message Sent',
      description: 'We have received your message and will get back to you soon.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
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
        bgImage="url('http://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9')"
        bgSize="cover"
        bgPosition="center"
        borderRadius="md"
        boxShadow="xl"
        position="relative"
        overflow="hidden"
       
      >
        <Box
          bg="rgba(0, 0, 0, 0.5)"
          p={8}
          borderRadius="md"
          boxShadow="lg"
          position="relative"
          zIndex="1"
        >
          <Heading mb={4} fontSize="5xl" color="white" fontWeight="bold">
            About Us
          </Heading>
          <Text fontSize="lg" mb={8} maxW="900px" mx="auto" color="white">
            Discover who we are and what drives us to provide the best complaint management platform. Our team is committed to excellence and innovation. We value transparency, efficiency, and user satisfaction.
          </Text>
          <MotionButton
            colorScheme="teal"
            size="lg"
            onClick={onOpen}
            whileHover={{ scale: 1.1 }}
            transition="all 0.3s ease"
          >
            Learn More
          </MotionButton>
        </Box>
      </Flex>

      {/* Team Section */}
      <Heading mb={8} fontSize="4xl" textAlign="center" color="teal.600">
        Meet Our Team
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {/* Team Member */}
        <MotionBox
          borderRadius="md"
          bg="white"
          boxShadow="xl"
          p={6}
          whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}
          transition="all 0.3s ease"
        >
          <Image
            borderRadius="full"
            boxSize="250px"
            src="./ankit.jpg"
            alt="Ankit yadav"
            mb={4}
            mx="auto"
            border="4px solid teal"
          />
          <Text fontWeight="bold" fontSize="lg">Ankit Yadav</Text>
          <Text color="gray.600">Founder & CEO</Text>
          <Button mt={4} colorScheme="teal" variant="outline" onClick={onOpen}>
            More About Ankit
          </Button>
        </MotionBox>
        <MotionBox
          borderRadius="md"
          bg="white"
          boxShadow="xl"
          p={6}
          whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}
          transition="all 0.3s ease"
        >
          <Image
            borderRadius="full"
            boxSize="250px"
            src="./a.jpg"
            alt="Ankit yadav"
            mb={4}
            mx="auto"
            border="4px solid teal"
          />
          <Text fontWeight="bold" fontSize="lg">Ankit Yadav</Text>
          <Text color="gray.600">Co-Founder & CTO</Text>
          <Button mt={4} colorScheme="teal" variant="outline" onClick={onOpen}>
            More About Ankit
          </Button>
        </MotionBox>
        <MotionBox
          borderRadius="md"
          bg="white"
          boxShadow="xl"
          p={6}
          whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}
          transition="all 0.3s ease"
        >
          <Image
            borderRadius="full"
            boxSize="250px"
            src="./b.jpg"
            alt="Ankit yadav"
            mb={4}
            mx="auto"
            border="4px solid teal"
          />
          <Text fontWeight="bold" fontSize="lg">Ankit Yadav</Text>
          <Text color="gray.600">Head of Marketing</Text>
          <Button mt={4} colorScheme="teal" variant="outline" onClick={onOpen}>
            More About Ankit
          </Button>
        </MotionBox>

        {/* Modal for Team Member Details */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Ankit Yadav</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                Ankit Yadav is the founder and CEO of Collage Complaint Management. With over 15 years of experience in the industry, Ankit is committed to improving customer satisfaction and streamlining complaint resolution processes.
              </Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      </SimpleGrid>

      {/* Contact Form Section */}
      <Box
        bg="white"
        p={8}
        borderRadius="md"
        boxShadow="xl"
        mt={12}
        textAlign="center"
        mx="auto"
        maxW="800px"
      >
        <Heading mb={4} fontSize="3xl" color="teal.600">
          Get in Touch
        </Heading>
        <form onSubmit={handleContactSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl id="name" isRequired>
              <FormLabel>Your Name</FormLabel>
              <Input placeholder="John Doe" />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Your Email</FormLabel>
              <Input type="email" placeholder="john.doe@example.com" />
            </FormControl>
            <FormControl id="message" isRequired>
              <FormLabel>Your Message</FormLabel>
              <Textarea placeholder="Write your message here..." />
            </FormControl>
            <Button colorScheme="teal" type="submit">
              Send Message
            </Button>
          </VStack>
        </form>
      </Box>

      {/* Social Media Links */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        mt={12}
        textAlign="center"
      >
        <Heading mb={4} fontSize="3xl" color="teal.600">
          Follow Us
        </Heading>
        <Flex spacing={4}>
          <Icon as={FaFacebook} mx={2} color="teal.500" boxSize="35px" />
          <Icon as={FaTwitter} mx={2} color="teal.500" boxSize="35px" />
          <Icon as={FaLinkedin} mx={2} color="teal.500" boxSize="35px" />
        </Flex>
      </Flex>
    </Box>
  );
};

export default AboutPage;
