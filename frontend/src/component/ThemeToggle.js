// ThemeToggle.js
import React from 'react';
import { useColorMode, IconButton } from '@chakra-ui/react';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
      isRound
      size="md"
      onClick={toggleColorMode}
      aria-label="Toggle Theme"
      colorScheme="teal"
      mr={4}
    />
  );
};

export default ThemeToggle;
