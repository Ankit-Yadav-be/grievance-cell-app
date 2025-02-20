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
import { MdError, MdCheckCircle } from "react-icons/md";
import { FaRegClipboard } from "react-icons/fa";
import { MdSchool, MdDateRange } from "react-icons/md";
import { IoMdListBox, IoMdTime } from "react-icons/io";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const ComplaintForTeacher = ({ complaintType }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAction = async (id) => {
    try {
      const res = await axios.put(
        "http://localhost:8000/api/complaints/updateaction",
        { _id: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res) {
        toast({
          title: "Action taken successfully.",
          description: "Action taken is successful.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        fetchComplaints();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowFullData = (complaint) => {
    setSelectedComplaint(complaint);
    onOpen();
  };

  const fetchComplaints = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/complaints/getallcomplaint`,
        { complainttype: complaintType },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setComplaints(response.data.data); // Adjust based on API response structure
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [complaintType]);

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
      <Container maxW="container.xl" py={6}>
        <Heading
          mb={6}
          textAlign="center"
          fontSize={headingSize}
          color="teal.600"
        >
          Complaints of Type: {complaintType}
        </Heading>
        {complaints.length === 0 ? (
          <Text fontSize="lg" textAlign="center" color="gray.600">
            No complaints found for this type.
          </Text>
        ) : (
          <Box overflowX="auto" overflowY="scroll"  height="79vh" width="190vh" >
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
                  <Th>Created At</Th>
                
                </Tr>
              </Thead>
              <Tbody>
                {complaints.map((complaint) => (
                  <Tr key={complaint._id}>
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
                    <Td
                      cursor="pointer"
                      onClick={() => handleShowFullData(complaint)}
                    >
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
                        <Badge colorScheme="red" variant="solid">
                          Unresolved
                        </Badge>
                      )}
                    </Td>
                    <Td>
                      {complaint.actiontaken ? (
                        <Badge colorScheme="teal" variant="solid">
                          Taken
                        </Badge>
                      ) : (
                        <Button
                          onClick={() => handleAction(complaint._id)}
                          variant="solid"
                          colorScheme="red"
                        >
                          Take
                        </Button>
                      )}
                    </Td>
                    <Td>{new Date(complaint.createdAt).toLocaleString()}</Td>
                    
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
      </Container>

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
          <ModalBody>
            {selectedComplaint && (
              <VStack
                align="start"
                spacing={4}
                p={4}
                borderRadius="md"
                bg="white"
                boxShadow="lg"
              >
                <HStack>
                  <MdError />
                  <Text fontWeight="bold">Complaint Type:</Text>
                  <Text>{selectedComplaint.complainttype}</Text>
                </HStack>
                <Divider />
                <HStack   overflowX="scroll" width="419px"  >
                  <FaRegClipboard />
                  <Text fontWeight="bold">Complaint Data:</Text>
                  <Text>{selectedComplaint.complaintdata}</Text>
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
                  <MdCheckCircle />
                  <Text fontWeight="bold">Status:</Text>
                  <Text>
                    {selectedComplaint.complaintstatus ? (
                      <Badge colorScheme="teal" variant="solid">
                        Resolved
                      </Badge>
                    ) : (
                      <Badge colorScheme="red" variant="solid">
                        Unresolved
                      </Badge>
                    )}
                  </Text>
                </HStack>
                <Divider />
                <HStack>
                  <IoMdTime />
                  <Text fontWeight="bold">Created At:</Text>
                  <Text>
                    {new Date(selectedComplaint.createdAt).toString()}
                  </Text>
                </HStack>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ComplaintForTeacher;
