import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';

import { 
  Box, 
  Heading, 
  Text, 
  Image, 
  Container, 
  VStack, 
  HStack, 
  Link, 
  useBreakpointValue,
  useColorModeValue,
  Icon,
  SimpleGrid,
  chakra,
  Button,
  Flex,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from '@chakra-ui/react';
import { 
  FaGraduationCap, 
  FaBook, 
  FaFootballBall, 
  FaQuoteLeft, 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaPhone,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaUserTie,
  FaNewspaper,
  FaQuestionCircle
} from 'react-icons/fa';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const slides = [
    {
      img: 'https://images.static-collegedunia.com/public/asset/img/og_images/13.jpg',
      label: 'College Event 1',
      desc: 'Description for College Event 1',
    },
    {
      img: 'http://digitallearning.eletsonline.com/wp-content/uploads/2017/02/24-Big-1.jpg',
      label: 'College Event 2',
      desc: 'Description for College Event 2',
    },
    {
      img: 'https://www.biggedu.com/images/uploads/2017/06/IIM-Ahmedabad.jpg',
      label: 'College Event 3',
      desc: 'Description for College Event 3',
    },
  ];

  const position = useBreakpointValue({ base: 'bottom', md: 'right' });
  const bg = useColorModeValue("white", "gray.800");
  const boxShadow = useColorModeValue("md", "dark-lg");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const testimonials = [
    {
      quote: "This college has provided me with incredible opportunities to grow and excel.",
      name: "John Doe",
      course: "Computer Science",
      img: "https://via.placeholder.com/100"
    },
    {
      quote: "The faculty and facilities here are top-notch.",
      name: "Jane Smith",
      course: "Business Administration",
      img: "https://via.placeholder.com/100"
    },
    {
      quote: "A great place to learn and make lifelong friends.",
      name: "Mike Johnson",
      course: "Mechanical Engineering",
      img: "https://via.placeholder.com/100"
    },
  ];

  const teamMembers = [
    {
      name: "Alice Brown",
      role: "Principal",
      img: "https://via.placeholder.com/100",
      desc: "Leading the institution with a vision for excellence."
    },
    {
      name: "Mark Wilson",
      role: "Vice Principal",
      img: "https://via.placeholder.com/100",
      desc: "Supporting the principal and overseeing student affairs."
    },
    {
      name: "Emma Green",
      role: "Head of Department",
      img: "https://via.placeholder.com/100",
      desc: "Managing the department with a focus on academic success."
    }
  ];

  const recentNews = [
    {
      title: "New Campus Facilities Unveiled",
      date: "August 1, 2024",
      content: "Our college has recently unveiled new state-of-the-art campus facilities to enhance student experience."
    },
    {
      title: "Research Grant Awarded",
      date: "July 25, 2024",
      content: "We are proud to announce that our college has been awarded a prestigious research grant."
    },
    {
      title: "Annual Sports Meet",
      date: "July 15, 2024",
      content: "Join us for the annual sports meet where students will compete in various sports activities."
    }
  ];

  const faqs = [
    {
      question: "How can I file a complaint?",
      answer: "You can file a complaint through our online complaint management system or by visiting the student affairs office."
    },
    {
      question: "What is the process for resolving complaints?",
      answer: "Our team reviews each complaint and follows a structured process to ensure fair and timely resolution."
    },
    {
      question: "Who can I contact for more information?",
      answer: "You can contact the student affairs office or send an email to info@college.edu for more information."
    }
  ];

  return (
    <Box bg="gray.50">
     

      {/* Hero Section */}
      <Box position="relative" width="full" overflow="hidden" maxH="600px" bg="gray.700">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <Box key={index} flex="none" boxSize="full" position="relative">
              <Image src={slide.img} boxSize="full" objectFit="cover" maxHeight="550px" filter="brightness(0.7)" />
              <Box 
                position="absolute" 
                bottom={position === 'bottom' ? '50%' : '10%'} 
                left="50%" 
                transform="translateX(-50%)" 
                bg="rgba(0, 0, 0, 0.6)" 
                color="white" 
                p={4} 
                textAlign="center" 
                borderRadius="md"
                width="80%"
              >
                <Heading fontSize="2xl">{slide.label}</Heading>
                <Text>{slide.desc}</Text>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* College Related Content */}
      <Container maxW="container.xl" py={10}>
        <VStack spacing={8} textAlign="center">
          <Heading as="h2" size="2xl">Welcome to Our College</Heading>
          <Text fontSize="lg" color="gray.600" maxW="3xl">
            Here you can find all the latest updates and events happening in our college. Stay tuned for more information.
          </Text>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            <Box 
              maxW="sm" 
              borderWidth="1px" 
              borderRadius="lg" 
              overflow="hidden" 
              bg={bg} 
              boxShadow={boxShadow} 
              p={6} 
              transition="transform 0.3s ease" 
              _hover={{ transform: 'scale(1.05)' }}
              textAlign="left"
            >
              <Image width="100%" height="200px" src="https://tse3.mm.bing.net/th?id=OIP.RWGwuU9H_Wn_e4hb7owOLAHaE-&pid=Api&P=0&h=180" />
              <Box mt={4}>
                <Heading size="md">Campus Life</Heading>
                <Text mt={2} color="gray.600">Experience the vibrant campus life with various activities and events.</Text>
                <Link href="#" color="teal.500" mt={3} display="block">Learn More</Link>
              </Box>
            </Box>

            <Box 
              maxW="sm" 
              borderWidth="1px" 
              borderRadius="lg" 
              overflow="hidden" 
              bg={bg} 
              boxShadow={boxShadow} 
              p={6} 
              transition="transform 0.3s ease" 
              _hover={{ transform: 'scale(1.05)' }}
              textAlign="left"
            >
              <Image width="100%" height="200px" src="https://tse2.mm.bing.net/th?id=OIP.XgdkDUsKWxkI6-OGkRtvmwHaEK&pid=Api&P=0&h=180" />
              <Box mt={4}>
                <Heading size="md">Library</Heading>
                <Text mt={2} color="gray.600">Discover a vast collection of resources and study materials in our library.</Text>
                <Link href="#" color="teal.500" mt={3} display="block">Explore</Link>
              </Box>
            </Box>

            <Box 
              maxW="sm" 
              borderWidth="1px" 
              borderRadius="lg" 
              overflow="hidden" 
              bg={bg} 
              boxShadow={boxShadow} 
              p={6} 
              transition="transform 0.3s ease" 
              _hover={{ transform: 'scale(1.05)' }}
              textAlign="left"
            >
              <Image width="100%" height="200px" src="https://www.unisportstore.com/images/NewsImages/magni%20artikler/Skrive%20en%20e-bog%20om%20de%20st%C3%B8rste%20fodboldspillere%20gennem%20tiderne/Skabelon/articlefull" />
              <Box mt={4}>
                <Heading size="md">Sports Complex</Heading>
                <Text mt={2} color="gray.600">Engage in a variety of sports and fitness activities in our sports complex.</Text>
                <Link href="#" color="teal.500" mt={3} display="block">Join Us</Link>
              </Box>
            </Box>

            <Box 
              maxW="sm" 
              borderWidth="1px" 
              borderRadius="lg" 
              overflow="hidden" 
              bg={bg} 
              boxShadow={boxShadow} 
              p={6} 
              transition="transform 0.3s ease" 
              _hover={{ transform: 'scale(1.05)' }}
              textAlign="left"
            >
              <Image width="100%" height="200px" src="https://static.toiimg.com/photo/67778527.cms" />
              <Box mt={4}>
                <Heading size="md">Cafeteria</Heading>
                <Text mt={2} color="gray.600">Enjoy delicious and healthy meals in our modern cafeteria.</Text>
                <Link href="#" color="teal.500" mt={3} display="block">Check Menu</Link>
              </Box>
            </Box>

            <Box 
              maxW="sm" 
              borderWidth="1px" 
              borderRadius="lg" 
              overflow="hidden" 
              bg={bg} 
              boxShadow={boxShadow} 
              p={6} 
              transition="transform 0.3s ease" 
              _hover={{ transform: 'scale(1.05)' }}
              textAlign="left"
            >
              <Image width="100%" height="200px" src="https://cdnuploads.aa.com.tr/uploads/Contents/2019/03/22/thumbs_b_c_5e740f50a0efcf258b6b8e3d2e76fcfc.jpg?v=232915" />
              <Box mt={4}>
                <Heading size="md">Research Labs</Heading>
                <Text mt={2} color="gray.600">Conduct research and innovative projects in our well-equipped labs.</Text>
                <Link href="#" color="teal.500" mt={3} display="block">Discover</Link>
              </Box>
            </Box>

            <Box 
              maxW="sm" 
              borderWidth="1px" 
              borderRadius="lg" 
              overflow="hidden" 
              bg={bg} 
              boxShadow={boxShadow} 
              p={6} 
              transition="transform 0.3s ease" 
              _hover={{ transform: 'scale(1.05)' }}
              textAlign="left"
            >
              <Image width="100%" height="200px" src="https://img.collegedunia.com/public/asset/img/college/front_image/1438/Christ_University.jpg?tr=w-1500,h-1000,c-force" />
              <Box mt={4}>
                <Heading size="md">Student Services</Heading>
                <Text mt={2} color="gray.600">Access various student services to support your academic and personal growth.</Text>
                <Link href="#" color="teal.500" mt={3} display="block">Get Support</Link>
              </Box>
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Meet the Team Section */}
      <Container maxW="container.xl" py={10}>
        <VStack spacing={8} textAlign="center">
          <Heading as="h2" size="2xl">Meet the Team</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            {teamMembers.map((member, index) => (
              <Box 
                key={index} 
                maxW="sm" 
                borderWidth="1px" 
                borderRadius="lg" 
                overflow="hidden" 
                bg={bg} 
                boxShadow={boxShadow} 
                p={6} 
                textAlign="left"
              >
                <Image 
                  width="100%" 
                  height="200px" 
                  src={member.img} 
                  alt={`${member.name}`} 
                />
                <Box mt={4}>
                  <Heading size="md">{member.name}</Heading>
                  <Text fontWeight="bold" color="gray.600">{member.role}</Text>
                  <Text mt={2} color="gray.600">{member.desc}</Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Recent News Section */}
      <Container maxW="container.xl" py={10}>
        <VStack spacing={8} textAlign="center">
          <Heading as="h2" size="2xl">Recent News</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            {recentNews.map((news, index) => (
              <Box 
                key={index} 
                maxW="sm" 
                borderWidth="1px" 
                borderRadius="lg" 
                overflow="hidden" 
                bg={bg} 
                boxShadow={boxShadow} 
                p={6} 
                textAlign="left"
              >
                <Box mt={4}>
                  <Heading size="md">{news.title}</Heading>
                  <Text fontSize="sm" color="gray.600">{news.date}</Text>
                  <Text mt={2} color="gray.600">{news.content}</Text>
                  <Link href="#" color="teal.500" mt={3} display="block">Read More</Link>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* FAQ Section */}
      <Container maxW="container.xl" py={10}>
        <VStack spacing={8} textAlign="center">
          <Heading as="h2" size="2xl">Frequently Asked Questions</Heading>
          <Accordion allowToggle width="full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} borderWidth="1px" borderRadius="lg" bg={bg} boxShadow={boxShadow}>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal.500", color: "white" }}>
                    <Box flex="1" textAlign="left">
                      <Icon as={FaQuestionCircle} mr={2} />{faq.question}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {faq.answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </VStack>
      </Container>

      {/* Testimonials Section */}
      <Container maxW="container.xl" py={10}>
        <VStack spacing={8} textAlign="center">
          <Heading as="h2" size="2xl">Testimonials</Heading>
          <Box width="full" overflow="hidden">
            <Slider {...settings}>
              {testimonials.map((testimonial, index) => (
                <Box key={index} p={6} borderWidth="1px" borderRadius="lg" bg={bg} boxShadow={boxShadow} m={4}>
                  <VStack spacing={4} textAlign="center">
                    <Icon as={FaQuoteLeft} w={10} h={10} color="teal.500" />
                    <Text fontStyle="italic">"{testimonial.quote}"</Text>
                    <Text fontWeight="bold">{testimonial.name}</Text>
                    <Text color="gray.600">{testimonial.course}</Text>
                  </VStack>
                </Box>
              ))}
            </Slider>
          </Box>
        </VStack>
      </Container>

      {/* Contact Section */}
      <Box bg={useColorModeValue("gray.100", "gray.700")} py={10}>
        <Container maxW="container.xl">
          <VStack spacing={8}>
            <Heading as="h2" size="2xl" textAlign="center">Contact Us</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              <VStack textAlign="center">
                <Icon as={FaMapMarkerAlt} w={8} h={8} color="teal.500" />
                <Text fontWeight="bold">Our Address</Text>
                <Text color="gray.600">123 College Avenue, City, State, ZIP</Text>
              </VStack>
              <VStack textAlign="center">
                <Icon as={FaPhoneAlt} w={8} h={8} color="teal.500" />
                <Text fontWeight="bold">Call Us</Text>
                <Text color="gray.600">(123) 456-7890</Text>
              </VStack>
              <VStack textAlign="center">
                <Icon as={FaEnvelope} w={8} h={8} color="teal.500" />
                <Text fontWeight="bold">Email Us</Text>
                <Text color="gray.600">info@college.com</Text>
              </VStack>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
