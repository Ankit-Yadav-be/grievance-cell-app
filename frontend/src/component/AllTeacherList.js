import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  List,
  ListItem,
  Avatar,
  Text,
  Container,
  IconButton,
  HStack,
  Badge,
  useToast,
  useBreakpointValue,
  Tooltip,
  VStack,
  Divider,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateTeacherForm from "./UpdateTeacherForm";

const AllTeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [teacheridforupdate, setTeacheridforupdate] = useState("");
  const toast = useToast();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/teacher/allteacher");
        setTeachers(response.data);
      } catch (error) {
        console.error("Failed to fetch teachers", error);
      }
    };

    fetchTeachers();
  }, []);

  const handleUpdate = (teacherId) => {
    setTeacheridforupdate(teacherId);
  };

  const handleRemove = async (teacherid) => {
    try {
      await axios.delete(`http://localhost:8000/api/teacher/delete/${teacherid}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast({
        title: "Teacher removed.",
        description: "Teacher removed successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error removing teacher", error);
      toast({
        title: "Removal failed.",
        description: "An error occurred while removing the teacher.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const headingSize = useBreakpointValue({ base: "xl", md: "2xl" });
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const cardBgColor = useColorModeValue("gray.40", "gray.500");
  const cardHoverColor = useColorModeValue("teal.50", "teal.700");
  const borderColor = useColorModeValue("teal.100", "teal.600");

  return teacheridforupdate ? (
    <UpdateTeacherForm teacherId={teacheridforupdate} />
  ) : (
    <Container maxW="container.xl" p={6} bg={bgColor}>
      <Box
        p={6}
        shadow="xl"
        borderWidth="1px"
        borderRadius="md"
        bg={cardBgColor}
        transition="all 0.3s ease-in-out"
        _hover={{ shadow: "2xl", transform: "scale(1.02)", borderColor }}
      >
        <Heading
          fontSize={headingSize}
          mb={6}
          textAlign="center"
          fontFamily="Poppins, sans-serif"
          color="teal.800"
        >
          Teacher List
        </Heading>
        <VStack spacing={4} align="stretch">
          {teachers.map((teacher) => (
            <Box
              key={teacher._id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              bg={cardBgColor}
              shadow="md"
              transition="all 0.3s ease-in-out"
              _hover={{ bg: cardHoverColor, shadow: "lg", transform: "translateY(-2px)" }}
              border={`1px solid ${borderColor}`}
            >
              <Flex align="center" justify="space-between" wrap="wrap">
                <HStack spacing={4} alignItems="center">
                  <Avatar size="md" name={teacher.name} src={teacher.avatar || ""} />
                  <Box>
                    <Text
                      fontWeight="semibold"
                      fontSize="lg"
                      fontFamily="Poppins, sans-serif"
                      color="teal.900"
                    >
                      {teacher.name}
                      <Badge ml={2} colorScheme={teacher.admin ? "red" : "green"}>
                        {teacher.admin ? "Admin" : "Teacher"}
                      </Badge>
                    </Text>
                    <Text fontSize="md" color="gray.500">
                      {teacher.department}
                    </Text>
                  </Box>
                </HStack>
                <HStack spacing={3}>
                  <Tooltip label="Update Teacher" aria-label="Update Teacher Tooltip">
                    <IconButton
                      icon={<FaEdit />}
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Update Teacher"
                      _hover={{ bg: "teal.100", transform: "scale(1.1)" }}
                      transition="all 0.3s ease-in-out"
                      onClick={() => handleUpdate(teacher._id)}
                    />
                  </Tooltip>
                  <Tooltip label="Remove Teacher" aria-label="Remove Teacher Tooltip">
                    <IconButton
                      icon={<FaTrash />}
                      variant="outline"
                      colorScheme="red"
                      aria-label="Remove Teacher"
                      _hover={{ bg: "red.100", transform: "scale(1.1)" }}
                      transition="all 0.3s ease-in-out"
                      onClick={() => handleRemove(teacher._id)}
                    />
                  </Tooltip>
                </HStack>
              </Flex>
              <Divider my={2} />
              <Text fontSize="xs" color="gray.400" textAlign="right">
                ID: {teacher.teacherid}
              </Text>
            </Box>
          ))}
        </VStack>
      </Box>
    </Container>
  );
};

export default AllTeacherList;
