import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  VStack,
  Heading,
  useToast,
  RadioGroup,
  Radio,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";

const FeedbackForm = ({ complaint }) => {
  const [studentId, setStudentId] = useState(complaint.studentid);
  const [feedbackData, setFeedbackData] = useState("");
  const [complaintType, setComplaintType] = useState("");
  const [satisfied, setSatisfied] = useState("false"); // Added state for satisfied
  const toast = useToast();

  useEffect(() => {
    if (complaint.complainttype) {
      setComplaintType(complaint.complainttype);
    }
  }, [complaint.complainttype]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentId || !feedbackData || !complaintType || !satisfied) {
      toast({
        title: "Error",
        description: "All fields are required.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/register89",
        {
          studentid: studentId,
          feedbackdata: feedbackData,
          complainttype: complaintType,
          satisfied: satisfied,
          complaint:complaint.complaintdata, // Include the satisfied field
        }
      );

      console.log(response.data);

      try {
        if (satisfied  == "true") {
          const res = await axios.put(
            "http://localhost:8000/api/complaints/updatestatus",
            {
              _id: complaint._id,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response) {
            if (res) {
              toast({
                title:
                  "Your complaint is resolved successfully, and feedback is also submitted.",
                description: "Resolved",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
            }
          }
        }
      } catch (error) {
        console.log(error);
      }

    
      setStudentId("");
      setFeedbackData("");
      setComplaintType("");
      setSatisfied("No");
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was an error submitting your feedback. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading mb={6} textAlign="center">
        Submit Feedback
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="studentid" isRequired>
            <FormLabel>Student ID</FormLabel>
            <Input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
          </FormControl>

          <FormControl id="feedbackdata" isRequired>
            <FormLabel>Feedback</FormLabel>
            <Textarea
              value={feedbackData}
              onChange={(e) => setFeedbackData(e.target.value)}
            />
          </FormControl>

          <FormControl id="complainttype" isRequired>
            <FormLabel>Complaint Type</FormLabel>
            <Select
              placeholder="Select complaint type"
              value={complaintType}
              onChange={(e) => setComplaintType(e.target.value)}
            >
              <option value="academic">Academic</option>
              <option value="hostel">Hostel</option>
              <option value="fees">Fees</option>
              <option value="other">Other</option>
            </Select>
          </FormControl>

          {/* New Satisfied Radio Group */}
          <FormControl id="satisfied" isRequired>
            <FormLabel>Satisfied</FormLabel>
            <RadioGroup
              value={satisfied}
              onChange={(value) => setSatisfied(value)}
            >
              <HStack spacing="24px">
                <Radio value="true">Yes</Radio>
                <Radio value="false">No</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <Button colorScheme="teal" type="submit" width="full">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default FeedbackForm;
