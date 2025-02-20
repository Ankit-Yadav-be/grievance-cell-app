import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Spinner,
  Text,
  Badge,
  Flex,
  IconButton,
  useBreakpointValue,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  Divider,
  HStack,
  Select,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import {
  MdError,
  MdCheckCircle,
  MdSchool,
  MdDateRange,
  MdAssignment,
  MdFilterList,
} from "react-icons/md";
import { FaRegClipboard } from "react-icons/fa";
import { IoMdListBox } from "react-icons/io";

const AllComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const [complaintType, setComplaintType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [resolved, setResolved] = useState(false);
  const [unresolved, setUnresolved] = useState(false);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchComplaints = async (type, resolved, unresolved) => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if (resolved) {
        response = await axios.get("http://localhost:8000/api/complaints/resolved");
      } else if (unresolved) {
        response = await axios.get("http://localhost:8000/api/complaints/unresolved");
      } else if (type) {
        response = await axios.post(
          `http://localhost:8000/api/complaints/getallcomplaint`,
          { complainttype: type },
          { headers: { "Content-Type": "application/json" } }
        );
      } else {
        response = await axios.get(`http://localhost:8000/api/complaints/allcomplaintadmin`);
      }
      setComplaints(response.data.data || response.data); // Adjust based on API response structure
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints(null, resolved, unresolved); // Fetch all complaints initially
  }, [resolved, unresolved]);

  useEffect(() => {
    if (complaintType !== null) {
      fetchComplaints(complaintType, resolved, unresolved); // Fetch complaints of selected type
    }
  }, [complaintType]);

  const headingSize = useBreakpointValue({ base: "lg", md: "xl" });

  const handleShowFullData = (complaint) => {
    setSelectedComplaint(complaint);
    onOpen();
  };

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
          All Complaints
        </Heading>
        <Flex justify="center" mb={6} pl={3} wrap="wrap" gap={3}>
          <Button
            onClick={() => {
              setResolved(!resolved);
              setUnresolved(false);
            }}
            colorScheme={resolved ? "green" : "teal"}
            variant={resolved ? "solid" : "outline"}
          >
            {resolved ? "Show All" : "Show Resolved"}
          </Button>
          <Button
            onClick={() => {
              setUnresolved(!unresolved);
              setResolved(false);
            }}
            colorScheme={unresolved ? "red" : "teal"}
            variant={unresolved ? "solid" : "outline"}
          >
            {unresolved ? "Show All" : "Show Unresolved"}
          </Button>
          <Select
            placeholder="Select complaint type"
            value={complaintType}
            onChange={(e) => setComplaintType(e.target.value)}
            variant="filled"
            icon={<MdFilterList />}
            maxW="209px"
          >
            <option value="academics">Academic</option>
            <option value="hostel">Hostel</option>
            <option value="fees">Fees</option>
            <option value="other">Other</option>
          </Select>
        </Flex>
        {complaints.length === 0 ? (
          <Text fontSize="lg" textAlign="center" color="gray.600">
            No complaints found.
          </Text>
        ) : (
          <Box overflowX="auto" overflowY="scroll" height="70vh">
            <Table variant="striped">
              <TableCaption>List of All Complaints</TableCaption>
              <Thead>
                <Tr>
                  <Th>Student ID</Th>
                  <Th>Complaint Data</Th>
                  <Th>Type</Th>
                  <Th>Branch</Th>
                  <Th>Section</Th>
                  <Th>Semester</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {complaints.map((complaint) => (
                  <Tr
                    key={complaint._id}
                    onClick={() => handleShowFullData(complaint)}
                    cursor="pointer"
                  >
                    <Td>{complaint.studentid}</Td>
                    <Td>
                      <Text noOfLines={1}>
                        {complaint.complaintdata.length > 20
                          ? `${complaint.complaintdata.substring(0, 20)}...`
                          : complaint.complaintdata}
                      </Text>
                    </Td>
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
                            complaint.complainttype === "Issue"
                              ? "red"
                              : "green"
                          }
                          size="sm"
                          mr={3}
                        />
                        {complaint.complainttype}
                      </Flex>
                    </Td>
                    <Td>{complaint.branch}</Td>
                    <Td>{complaint.section}</Td>
                    <Td>{complaint.semester}</Td>
                    <Td>
                      <Badge
                        colorScheme={
                          complaint.complaintstatus ? "green" : "red"
                        }
                      >
                        {complaint.complaintstatus ? "Resolved" : "Pending"}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge
                        colorScheme={complaint.actiontaken ? "teal" : "red"}
                      >
                        {complaint.actiontaken ? "Action Taken" : "No Action"}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex align="center">
              <MdAssignment />
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
                  <MdSchool />
                  <Text fontWeight="bold">Student ID:</Text>
                  <Text>{selectedComplaint.studentid}</Text>
                </HStack>
                <Divider />
                <HStack>
                  <FaRegClipboard />
                  <Text fontWeight="bold">Complaint Data:</Text>
                  <Text whiteSpace="pre-wrap">
                    {selectedComplaint.complaintdata}
                  </Text>
                </HStack>
                <Divider />
                <HStack>
                  <MdError />
                  <Text fontWeight="bold">Complaint Type:</Text>
                  <Text>{selectedComplaint.complainttype}</Text>
                </HStack>
                <Divider />
                <HStack>
                  <IoMdListBox />
                  <Text fontWeight="bold">Branch:</Text>
                  <Text>{selectedComplaint.branch}</Text>
                </HStack>
                <Divider />
                <HStack>
                  <MdDateRange />
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
                  <MdCheckCircle />
                  <Text fontWeight="bold">Complaint Status:</Text>
                  <Badge
                    colorScheme={
                      selectedComplaint.complaintstatus ? "green" : "red"
                    }
                  >
                    {selectedComplaint.complaintstatus
                      ? "Resolved"
                      : "Pending"}
                  </Badge>
                </HStack>
                <Divider />
                <HStack>
                  <MdCheckCircle />
                  <Text fontWeight="bold">Action Taken:</Text>
                  <Badge
                    colorScheme={
                      selectedComplaint.actiontaken ? "teal" : "red"
                    }
                  >
                    {selectedComplaint.actiontaken ? "Action Taken" : "No Action"}
                  </Badge>
                </HStack>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AllComplaintsList;
