import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const EditComplaintModal = ({ isOpen, onClose, complaint }) => {
  const [formData, setFormData] = useState({
    studentid: complaint.studentid,
    complaintdata: complaint.complaintdata,
    complainttype: complaint.complainttype,
    branch: complaint.branch,
    section: complaint.section,
    semester: complaint.semester,
    complaintstatus: complaint.complaintstatus,
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/complaints/update/${complaint._id}`, formData);
      toast({
        title: "Complaint updated.",
        description: "Complaint updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error("Error updating complaint", error);
      toast({
        title: "Update failed.",
        description: "An error occurred while updating the complaint.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Complaint</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Complaint Data</FormLabel>
            <Textarea
              name="complaintdata"
              value={formData.complaintdata}
              onChange={handleChange}
              placeholder="Enter complaint data"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Complaint Type</FormLabel>
            <Input
              name="complainttype"
              value={formData.complainttype}
              onChange={handleChange}
              placeholder="Enter complaint type"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Branch</FormLabel>
            <Input
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              placeholder="Enter branch"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Section</FormLabel>
            <Input
              name="section"
              value={formData.section}
              onChange={handleChange}
              placeholder="Enter section"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Semester</FormLabel>
            <Input
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              placeholder="Enter semester"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Status</FormLabel>
            <Input
              name="complaintstatus"
              type="checkbox"
              checked={formData.complaintstatus}
              onChange={() => setFormData((prev) => ({ ...prev, complaintstatus: !prev.complaintstatus }))}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditComplaintModal;
