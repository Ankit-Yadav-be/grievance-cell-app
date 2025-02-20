import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Heading,
  Text,
  Flex,
  useToast,
  Icon,
} from "@chakra-ui/react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import FeedbackForm from "./FeedbackForm"; // Import the FeedbackForm component
import axios from "axios";

const FeedbackPrompt = ({ complaint }) => {
  const [wantsToGiveFeedback, setWantsToGiveFeedback] = useState(null);
  const toast = useToast();

  const handleYesClick = async () => {
    setWantsToGiveFeedback(true);
    if (wantsToGiveFeedback) {
      try {
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
        if (res) {
          toast({
            title: "Your complaint is resolved successfully.",
            description: "Resolved",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleNoClick = async () => {
    setWantsToGiveFeedback(false);
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="99vh"
      bgGradient="linear(to-r, teal.500, green.100)"
      color="gray.800"
      mt="-14px"
    >
      <Heading mb={8} fontSize="4xl" textAlign="center">
        Do you want to give feedback?
      </Heading>
      {wantsToGiveFeedback === null ? (
        <Flex
          direction={{ base: "column", md: "row" }}
          spacing={8}
          align="center"
        >
          <Button
            colorScheme="teal"
            size="lg"
            leftIcon={<Icon as={FaThumbsUp} />}
            onClick={handleYesClick}
            m={4}
            _hover={{ bg: "teal.300" }}
            bg="teal.400"
          >
            Yes
          </Button>
          <Button
            colorScheme="red"
            size="lg"
            leftIcon={<Icon as={FaThumbsDown} />}
            onClick={handleNoClick}
            m={4}
            _hover={{ bg: "red.300" }}
            bg="red.400"
          >
            No
          </Button>
        </Flex>
      ) : wantsToGiveFeedback ? (
        <FeedbackForm complaint={complaint} />
      ) : (
        <>
          <Text>THANKS FOR YOUR CONTRIBUTION </Text>
        </>
      )}
    </Flex>
  );
};

export default FeedbackPrompt;
