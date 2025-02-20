import React, { useEffect, useState } from 'react';
import { ChakraProvider, Box, Flex, Text, Button, VStack, useDisclosure } from '@chakra-ui/react';
import { FaRegListAlt, FaEye } from 'react-icons/fa';
import { extendTheme } from '@chakra-ui/react';

import { useTeacher } from '../contextapi/teacherContext';
import ComplaintForTeacher from '../component/ComplaintForTeacher';
import AllComplaintsList from '../component/AllComplaintList';
import { useNavigate } from 'react-router-dom';



const theme = extendTheme({
  colors: {
    brand: {
      100: '#f0f4f8',
      200: '#e1e6ea',
      300: '#d0d7e0',
      400: '#b0bcd7',
      500: '#8a9ac0',
      600: '#6e80a5',
      700: '#4f5e82',
      800: '#3a485e',
      900: '#253340',
    },
  },
  styles: {
    global: {
      'html, body': {
        background: 'brand.100',
        color: 'brand.800',
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
      <Text fontSize="2xl" fontWeight="bold" mb={4} color="brand.700">Menu</Text>
      <Button
        leftIcon={<FaRegListAlt />}
        aria-label="Complaints"
        onClick={() => onSelect('complaints')}
        bg="brand.300"
        color="brand.800"
        _hover={{ bg: 'brand.400' }}
        width="100%"
        justifyContent="start"
        textAlign="left"
        px={4}
        py={2}
        borderRadius="md"
        display="flex"
        alignItems="center"
      >
        <Text ml={2} fontSize="lg" fontWeight="medium">Complaints</Text>
      </Button>
      <Button
        leftIcon={<FaEye />}
        aria-label="See Complaints"
        onClick={() => onSelect('see-complaints')}
        bg="brand.300"
        color="brand.800"
        _hover={{ bg: 'brand.400' }}
        width="100%"
        justifyContent="start"
        textAlign="left"
        px={4}
        py={2}
        borderRadius="md"
        display="flex"
        alignItems="center"
      >
        <Text ml={2} fontSize="lg" fontWeight="medium">Actions</Text>
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

const SidebarPageForTeacher = () => {
 
  const [selectedComponent, setSelectedComponent] = useState('complaints');
  const { isOpen, onOpen, onClose } = useDisclosure();
   const [teacher,setTeacher]  = useTeacher({});
   const navigate = useNavigate();
  // console.log(teacher);

  // useEffect(()=>{
  //   window.location.reload();
  //  },[])
  const renderComponent = () => {

    switch (selectedComponent) {
      case 'complaints':
        return teacher.teacher.admin ?<><AllComplaintsList/></> : <ComplaintForTeacher complaintType={teacher.teacher.department}/>  ;
      case 'see-complaints':
        return null;
      default:
        return <Box p={4}><Text fontSize="xl">Select a menu item</Text></Box>;
    }
  };

  return (
   teacher ?  <> <ChakraProvider theme={theme}>
   <Flex>
     <Sidebar  onSelect={setSelectedComponent} />
     <Box flex="1" bg="brand.100" p={4}>
       {renderComponent()}
     </Box>
   </Flex>
 </ChakraProvider></> :<>
   {navigate("/")}
 </>
  );
};

export default SidebarPageForTeacher;
