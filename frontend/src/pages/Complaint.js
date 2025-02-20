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
import ComplaintForm from "./ComplaintForm";
import { useAuth } from "../contextapi/authContext";
import Login from "./Login";
import SeeComplaints from "../component/SeeComplaints";

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
      height="90vh"
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
        onClick={() => onSelect("complaints")}
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
          Complaints
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
          See Complaints
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

const SidebarPage = () => {
  const [selectedComponent, setSelectedComponent] = useState("complaints");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [auth] = useAuth();

  const complaints = "complaint";

  const renderComponent = () => {
    switch (selectedComponent) {
      case "complaints":
        return <ComplaintForm />;
      case "see-complaints":
        return <SeeComplaints studentId={auth.student.studentid} />;
      default:
        return (
          <Box p={4}>
            <Text fontSize="xl">Select a menu item</Text>
          </Box>
        );
    }
  };

  return auth ? (
    <>
      {" "}
      <ChakraProvider theme={theme}>
        <Flex>
          <Sidebar onSelect={setSelectedComponent} />
          <Box flex="1" bg="brand.100" p={4} height="75vh">
            {renderComponent()}
          </Box>
        </Flex>
      </ChakraProvider>
    </>
  ) : (
    <>
      <Login params={complaints} />
    </>
  );
};

export default SidebarPage;
