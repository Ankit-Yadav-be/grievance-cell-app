import React from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  SimpleGrid,
  Icon,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  useToast,
  Image,
} from '@chakra-ui/react';
import { FaCogs, FaChartLine, FaRegCreditCard } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const ServiceModal = ({ isOpen, onClose, service }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{service.title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>{service.description}</Text>
      </ModalBody>
    </ModalContent>
  </Modal>
);

const ServicesPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedService, setSelectedService] = React.useState(null);

  const services = [
    {
      title: 'Custom Software Development',
      description:
        'We create tailored software solutions that meet your unique business needs, from concept to deployment.',
      icon: FaCogs,
    },
    {
      title: 'Data Analytics',
      description:
        'Transform your data into actionable insights with our comprehensive data analysis and visualization services.',
      icon: FaChartLine,
    },
    {
      title: 'Payment Solutions',
      description:
        'Streamline your transactions with our secure and efficient payment processing solutions.',
      icon: FaRegCreditCard,
    },
  ];

  const handleServiceClick = (service) => {
    setSelectedService(service);
    onOpen();
  };

  return (
    <Box
      bgGradient="linear(to-b, teal.100)"
     
      p={8}
      minH="100vh"
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
        bgImage="url('https://i1.wp.com/www.himalayanbuzz.com/wp-content/uploads/2016/11/IIT_Roorkee.jpg?fit=1902%2C1141')"
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
            Our Services
          </Heading>
          <Text fontSize="lg" mb={8} maxW="900px" mx="auto" color="white">
            Discover the range of services we offer to help your business thrive. From custom software solutions to advanced data analytics, we provide the expertise and tools you need to succeed.
          </Text>
        </Box>
      </Flex>

      {/* Services Section */}
      <Heading mb={8} fontSize="4xl" textAlign="center" color="teal.600">
        What We Offer
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {services.map((service, index) => (
          <MotionBox
            key={index}
            borderRadius="md"
            bg="white"
            boxShadow="xl"
            p={6}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}
            transition="all 0.3s ease"
          >
            <Flex align="center" justify="center" mb={4}>
              <Icon as={service.icon} boxSize="50px" color="teal.500" />
            </Flex>
            <Heading fontSize="xl" mb={2}>
              {service.title}
            </Heading>
            <Text mb={4} color="gray.600">
              {service.description}
            </Text>
            <MotionButton
              colorScheme="teal"
              size="md"
              onClick={() => handleServiceClick(service)}
              whileHover={{ scale: 1.1 }}
              transition="all 0.3s ease"
            >
              Learn More
            </MotionButton>
          </MotionBox>
        ))}
      </SimpleGrid>

      {/* Service Modals */}
      {services.map((service, index) => (
        <ServiceModal
          key={index}
          isOpen={selectedService === service && isOpen}
          onClose={() => {
            setSelectedService(null);
            onClose();
          }}
          service={service}
        />
      ))}
    </Box>
  );
};

export default ServicesPage;
