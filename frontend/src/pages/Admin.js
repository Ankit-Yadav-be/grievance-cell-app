import React, { useEffect, useState } from "react";
import {
  ChakraProvider,
  Box,
  Flex,
  Text,
  Button,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { FaRegListAlt, FaEye } from "react-icons/fa";
import { extendTheme } from "@chakra-ui/react";

import { useTeacher } from "../contextapi/teacherContext";
import AllTeacherList from "../component/AllTeacherList";
import AllComplaintList from "../component/AllComplaintList";
import { useNavigate } from "react-router-dom";
import TeacherLogin from "./TeacherLogin";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#f0f4f8",
      200: "#e1e6ea",
      300: "#d0d7e0",
      400: "#b0bcd7",
      500: "#8a9ac0",
      600: "#6e80a5",
      700: "#4f5e82",
      800: "#3a485e",
      900: "#253340",
    },
  },
  styles: {
    global: {
      "html, body": {
        background: "brand.100",
        color: "brand.800",
      },
    },
  },
});

const Sidebar = ({ onSelect }) => {
  return (
    <VStack
      spacing={4}
      align="stretch"
      bg="brand.200"
      color="brand.800"
      height="93vh"
      padding="20px"
      width="250px"
      borderRight="1px"
      borderColor="brand.300"
      position="relative"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={4} color="brand.700">
        Menu
      </Text>
      <Button
        leftIcon={<FaRegListAlt />}
        aria-label="Complaints"
        onClick={() => onSelect("all-teacher")}
        bg="brand.300"
        color="brand.800"
        _hover={{ bg: "brand.400" }}
        width="100%"
        justifyContent="start"
        textAlign="left"
        px={4}
        py={2}
        borderRadius="md"
        display="flex"
        alignItems="center"
      >
        <Text ml={2} fontSize="lg" fontWeight="medium">
          All teachers
        </Text>
      </Button>
      <Button
        leftIcon={<FaRegListAlt />}
        aria-label="Complaints"
        onClick={() => onSelect("all-complaints")}
        bg="brand.300"
        color="brand.800"
        _hover={{ bg: "brand.400" }}
        width="100%"
        justifyContent="start"
        textAlign="left"
        px={4}
        py={2}
        borderRadius="md"
        display="flex"
        alignItems="center"
      >
        <Text ml={2} fontSize="lg" fontWeight="medium">
          All Complaints
        </Text>
      </Button>
      <Button
        leftIcon={<FaEye />}
        aria-label="See Complaints"
        onClick={() => onSelect("see-complaints")}
        bg="brand.300"
        color="brand.800"
        _hover={{ bg: "brand.400" }}
        width="100%"
        justifyContent="start"
        textAlign="left"
        px={4}
        py={2}
        borderRadius="md"
        display="flex"
        alignItems="center"
      >
        <Text ml={2} fontSize="lg" fontWeight="medium">
          Actions
        </Text>
      </Button>
    </VStack>
  );
};

// const ComplaintsComponent = () => {
//   return (
//     <Box p={4} bg="white" borderRadius="md" shadow="md">
//       <Text fontSize="xl" fontWeight="bold">Complaints Component</Text>
//       {/* Add your complaints details here */}
//     </Box>
//   );
// };

// const SeeComplaintsComponent = () => {
//   return (
//     <Box p={4} bg="white" borderRadius="md" shadow="md">
//       <Text fontSize="xl" fontWeight="bold">See Complaints Component</Text>
//       {/* Add your see complaints details here */}
//     </Box>
//   );
// };

const Admin = () => {
  const [selectedComponent, setSelectedComponent] = useState("all-complaints");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [teacher, setTeacher] = useTeacher({});
  const handlelogoutteacher = () => {
    setTeacher(null);
    localStorage.removeItem("teacher");

    navigate("/");
  };
  const navigate = useNavigate();
  // console.log(teacher);

  const renderComponent = () => {
    switch (selectedComponent) {
      case "all-teacher":
        return <AllTeacherList />;
      case "all-complaints":
        return <AllComplaintList />;
      case "logout":
        return (
          <Button
            onClick={handlelogoutteacher}
            //as={Link}
            // variant="ghost"
            // color={color}
            // _hover={{ bg: hoverBg }}
          >
            {/* {auth.student.name} */}Logout
          </Button>
        );
      default:
        return (
          <Box p={4}>
            <Text fontSize="xl">Select a menu item</Text>
          </Box>
        );
    }
  };

  return teacher.teacher.admin ? (
    <>
      <ChakraProvider theme={theme}>
        <Flex>
          <Sidebar onSelect={setSelectedComponent} />
          <Box flex="1" bg="brand.100" p={4}>
            {renderComponent()}
          </Box>
        </Flex>
      </ChakraProvider>
    </>
  ) : (
    <>
      <TeacherLogin />
    </>
  );
};

export default Admin;
