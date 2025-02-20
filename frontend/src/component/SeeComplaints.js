import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Spinner,
  useBreakpointValue,
  Badge,
  Flex,
  IconButton,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { MdError, MdCheckCircle, MdSchool, MdDateRange } from "react-icons/md";
import { FaRegClipboard } from "react-icons/fa";
import { IoMdListBox, IoMdTime } from "react-icons/io";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import FeedbackForm from "./FeedbackForm";
import { useFeed } from "../contextapi/feedContext";

const SeeComplaints = ({ studentId }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [forfeedback, setForfeedback] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [studentid, setStudentid] = useFeed();
  const [feedback, setFeedback] = useState("");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Set complaint for feedback form
  const handleresolve = async (complaint) => {
    setForfeedback(complaint);
    setStudentid(complaint.studentid); // Set the student ID when resolving
  };

  // Fetch feedback when studentid is available
  // useEffect(() => {
  //   if (studentid) {
  //     const fetchFeedback = async (selectedComplaint, studentid) => {
  //       try {console.log("Hello")
  //         const response = await axios.post(
  //           `http://localhost:8000/api/feedback/getfeedback`,
  //           {
  //             selectedComplaint,  // Send the complaint in the request body
  //             studentid,  // Send the studentid in the request body
  //           },
  //           {
  //             headers: {
  //               "Content-Type": "application/json",  // Specify the content type
  //             },
  //           }
  //         );
          
  //         console.log("Feedback fetched:", response.data);
  //       } catch (error) {
  //         setError(error);
  //         console.error("Error fetching feedback:", error);
  //       }
  //     };
      

  //     fetchFeedback();
  //   }
  // }, [studentid]);

  // console.log("Selected id:", studentid);

  // Handle showing full complaint data and student ID in modal
  const handleShowFullData = (complaint) => {
    setSelectedComplaint(complaint); // Set selected complaint
    // Set student ID based on the clicked row
   setStudentid(complaint._id)
    onOpen();
  };

  // Fetch complaints by student ID
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8000/api/complaints/getcomplaint`,
          { studentid: studentId },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setComplaints(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [studentId]);

  const headingSize = useBreakpointValue({ base: "lg", md: "xl" });

  if (loading) return <Spinner size="lg" color="teal.500" />;
  if (error)
    return (
      <Text color="red.500" fontSize="lg" textAlign="center">
        Error: {error}
      </Text>
    );

    return (
      <>
        {forfeedback ? (
          <FeedbackForm complaint={forfeedback} />
        ) : (
          <Container maxW="container.xl" py={6}>
            <Heading mb={6} textAlign="center" fontSize={headingSize} color="teal.600">
              Student Complaints
            </Heading>
            {complaints.length === 0 ? (
              <Text fontSize="lg" textAlign="center" color="gray.600">
                No complaints found for this student ID.
              </Text>
            ) : (
              <Box overflowX="auto" overflowY="scroll" height="79vh" width="170vh">
                <Table variant="simple" colorScheme="teal">
                  <TableCaption>List of Complaints</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Complaint Type</Th>
                      <Th>Complaint Data</Th>
                      <Th>Branch</Th>
                      <Th>Section</Th>
                      <Th>Semester</Th>
                      <Th>Student ID</Th>
                      <Th>Status</Th>
                      <Th>Action</Th>
                      <Th>Feedback</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {complaints.map((complaint) => (
                      <Tr key={complaint._id} onClick={() => handleShowFullData(complaint)}>
                        <Td>
                          <Flex align="center">
                            <IconButton
                              aria-label="Complaint type"
                              icon={
                                complaint.complainttype === "Issue" ? (
                                  <MdError />
                                ) : (
                                  <MdCheckCircle />
                                )
                              }
                              variant="outline"
                              colorScheme={
                                complaint.complainttype === "Issue" ? "red" : "green"
                              }
                              size="sm"
                              mr={3}
                            />
                            {complaint.complainttype}
                          </Flex>
                        </Td>
                        <Td>
                          {complaint.complaintdata.length > 7
                            ? `${complaint.complaintdata.substring(0, 7)}...`
                            : complaint.complaintdata}
                        </Td>
                        <Td>{complaint.branch}</Td>
                        <Td>{complaint.section}</Td>
                        <Td>{complaint.semester}</Td>
                        <Td>
                          <Badge colorScheme="teal" variant="solid">
                            {complaint.studentid}
                          </Badge>
                        </Td>
                        <Td>
                          {complaint.complaintstatus ? (
                            <Badge colorScheme="teal" variant="solid">
                              Resolved
                            </Badge>
                          ) : (
                            <Button colorScheme="red" variant="solid" onClick={() => handleresolve(complaint)}>
                              {complaint.actiontaken ? (
                                <>Click for Resolve</>
                              ) : (
                                <Badge colorScheme="red" variant="solid">
                                  Unresolved
                                </Badge>
                              )}
                            </Button>
                          )}
                        </Td>
                        <Td>
                          {complaint.actiontaken ? (
                            <Badge colorScheme="teal" variant="solid">
                              Action has been taken from college...
                            </Badge>
                          ) : (
                            <Badge colorScheme="red" variant="solid">
                              No action taken..
                            </Badge>
                          )}
                        </Td>
                        <Td>
                          {/* Ensure feedback is rendered properly */}
                          {complaint.feedback ? (
                            <Text>{complaint.feedback}</Text>
                          ) : (
                            <Text>No feedback available</Text>
                          )}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            )}
          </Container>
        )}
    
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay />
          <ModalContent bg="gray.50">
            <ModalHeader>
              <Flex align="center">
                <MdError />
                <Text ml={2}>Complaint Details</Text>
              </Flex>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody maxH="72vh">
              {selectedComplaint && (
                <VStack align="start" spacing={4} p={4} borderRadius="md" bg="white" boxShadow="lg">
                  <HStack>
                    <MdError />
                    <Text fontWeight="bold">Complaint Type:</Text>
                    <Text>{selectedComplaint.complainttype}</Text>
                  </HStack>
                  <Divider />
                  <HStack overflowX="scroll" width="419px" align="start">
                    <FaRegClipboard />
                    <Text fontWeight="bold">Complaint Data:</Text>
                    <Text whiteSpace="pre-wrap">
                      {selectedComplaint.complaintdata}
                    </Text>
                  </HStack>
                  <Divider />
                  <HStack>
                    <MdSchool />
                    <Text fontWeight="bold">Branch:</Text>
                    <Text>{selectedComplaint.branch}</Text>
                  </HStack>
                  <Divider />
                  <HStack>
                    <IoMdListBox />
                    <Text fontWeight="bold">Section:</Text>
                    <Text>{selectedComplaint.section}</Text>
                  </HStack>
                  <Divider />
                  <HStack>
                    <MdDateRange />
                    <Text fontWeight="bold">Semester:</Text>
                    <Text>{selectedComplaint.semester}</Text>
                  </HStack>
                  <Divider />
                  <HStack>
                    <MdSchool />
                    <Text fontWeight="bold">Student ID:</Text>
                    <Text>{selectedComplaint.studentid}</Text>
                  </HStack>
                  <Divider />
                  <HStack>
                    <IoMdTime />
                    <Text fontWeight="bold">Created At:</Text>
                    <Text>
                      {new Date(selectedComplaint.createdAt).toLocaleString()}
                    </Text>
                  </HStack>
                  <Divider />
                </VStack>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
    
};

export default SeeComplaints;
