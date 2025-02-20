import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
  Stack,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import {
  MdSchool,
  MdSubject,
  MdCategory,
  MdClass,
  MdFilterList,
  MdDateRange,
} from "react-icons/md";
import axios from "axios";

const ComplaintForm = () => {
  const [studentid, setStudentid] = useState("");
  const [email, setEmail] = useState("");
  const [complaintdata, setComplaintdata] = useState("");
  const [complainttype, setComplainttype] = useState("");
  const [branch, setBranch] = useState("");
  const [section, setSection] = useState("");
  const [semester, setSemester] = useState("");

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/complaints/complaint",
        {
          studentid,
          email,
          complaintdata,
          complainttype,
          branch,
          section,
          semester,
          
        }
      );
      toast({
        title: "Complaint created successfully.",
        description: `Complaint ID: ${response.data.complaint._id}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setStudentid("");
      setEmail("");
      setComplaintdata("");
      setComplainttype("");
      setBranch("");
      setSection("");
      setSemester("");
    } catch (error) {
      toast({
        title: "Error creating complaint.",
        description: error.response
          ? error.response.data.message
          : error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      maxW="2xl" // Increase the width of the form
      mx="auto"
      mt={10}
      p={8}
      borderWidth={2}
      borderColor="gray.300"
      borderRadius="md"
      boxShadow="lg"
      bg="white"
      maxWidth="120vh"
      position="relative"
      top="-56px"
    >
      <Heading as="h1" size="xl" mb={6} textAlign="center" color="teal.500">
        <Icon as={MdSchool} boxSize={6} mr={2} />
        Submit Your Complaint
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="studentid" isRequired>
            <FormLabel>
              <Icon as={MdCategory} boxSize={5} mr={2} />
              Student ID
            </FormLabel>
            <Input
              type="text"
              value={studentid}
              onChange={(e) => setStudentid(e.target.value)}
              placeholder="Enter your Student ID"
              borderColor="teal.300"
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>
              <Icon as={MdCategory} boxSize={5} mr={2} />
              Email
            </FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email "
              borderColor="teal.300"
            />
          </FormControl>
          <FormControl id="complaintdata" isRequired>
            <FormLabel>
              <Icon as={MdSubject} boxSize={5} mr={2} />
              Complaint Data
            </FormLabel>
            <Textarea
              value={complaintdata}
              onChange={(e) => setComplaintdata(e.target.value)}
              placeholder="Describe your complaint"
              borderColor="teal.300"
            />
          </FormControl>
          <FormControl id="complainttype" isRequired>
            <FormLabel>
              <Icon as={MdCategory} boxSize={5} mr={2} />
              Complaint Type
            </FormLabel>
            <Select
              type="text"
              value={complainttype}
              onChange={(e) => setComplainttype(e.target.value)}
              placeholder="Type of complaint"
              borderColor="teal.300"
            >
              <option value="hostel">hostel</option>
              <option value="academics">academics</option>
              <option value="fees">fees</option>
              <option value="library">library</option>
              <option value="other">others</option>
            </Select>
          </FormControl>
          <FormControl id="branch" isRequired>
            <FormLabel>
              <Icon as={MdClass} boxSize={5} mr={2} />
              Branch
            </FormLabel>
            <Select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              placeholder="Select Branch"
              borderColor="teal.300"
            >
              <option value="CSE">Computer Science Engineering</option>
              <option value="ECE">
                Electronics and Communication Engineering
              </option>
              <option value="EEE">
                Electrical and Electronics Engineering
              </option>
              <option value="ME">Mechanical Engineering</option>
              <option value="CE">Civil Engineering</option>
            </Select>
          </FormControl>
          <FormControl id="section" isRequired>
            <FormLabel>
              <Icon as={MdFilterList} boxSize={5} mr={2} />
              Section
            </FormLabel>
            <Select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              placeholder="Select Section"
              borderColor="teal.300"
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </Select>
          </FormControl>
          <FormControl id="semester" isRequired>
            <FormLabel>
              <Icon as={MdDateRange} boxSize={5} mr={2} />
              Semester
            </FormLabel>
            <Select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              placeholder="Select Semester"
              borderColor="teal.300"
            >
              <option value="1">1st Semester</option>
              <option value="2">2nd Semester</option>
              <option value="3">3rd Semester</option>
              <option value="4">4th Semester</option>
              <option value="5">5th Semester</option>
              <option value="6">6th Semester</option>
              <option value="7">7th Semester</option>
              <option value="8">8th Semester</option>
            </Select>
          </FormControl>
          <Button colorScheme="teal" type="submit" width="full">
            Submit Complaint
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ComplaintForm;
