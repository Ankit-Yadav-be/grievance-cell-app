import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useToast,
  InputGroup,
  InputLeftElement,
  Icon,
  Select,
} from "@chakra-ui/react";
import { FaIdBadge, FaUser, FaBuilding, FaLock } from "react-icons/fa";

const UpdateTeacherForm = () => {
  const [teacherid, setTeacherid] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState(""); // State for password
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "http://localhost:8000/api/teacher/update",
        {
          teacherid,
          name,
          department,
          password, // Include password in the request
        }
      );

      toast({
        title: "Teacher updated.",
        description: `Teacher ${response.data.teacher.name} updated successfully.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Clear the form
      setTeacherid("");
      setName("");
      setDepartment("");
      setPassword(""); // Clear the password field
    } catch (error) {
      console.error("Error updating teacher", error);
      toast({
        title: "Update failed.",
        description: "An error occurred while updating the teacher.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      p={8}
      maxW="md"
      mx="auto"
      borderWidth="1px"
      borderRadius="md"
      shadow="md"
      height="auto"
    >
      <Heading mb={6} fontSize="2xl" textAlign="center" color="teal.600">
        Update Teacher
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={5}>
          <FormControl isRequired>
            <FormLabel htmlFor="teacherid">Teacher ID</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaIdBadge} color="gray.400" />
              </InputLeftElement>
              <Input
                id="teacherid"
                value={teacherid}
                onChange={(e) => setTeacherid(e.target.value)}
                placeholder="Enter Teacher ID"
                borderColor="gray.300"
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaUser} color="gray.400" />
              </InputLeftElement>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
                borderColor="gray.300"
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="department">Department</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaBuilding} color="gray.400"  />
              </InputLeftElement>
              <Select
                
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder=" Department"
                borderColor="gray.300"
              >
                <option value="hostel">hostel</option>
                <option value="academics">academics</option>
                <option value="fees">fees</option>
                <option value="library">library</option>
                <option value="other">others</option>
              </Select>
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaLock} color="gray.400" />
              </InputLeftElement>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter New Password (Leave blank to keep current)"
                borderColor="gray.300"
              />
            </InputGroup>
          </FormControl>
          <Button
            colorScheme="teal"
            type="submit"
            mt={6}
            size="lg"
            variant="solid"
          >
            Update Teacher
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default UpdateTeacherForm;
