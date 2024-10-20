import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import useFetchVenues from './Venues';

const Navbar = () => {
  const { venues } = useFetchVenues();
  const [venueId, setVenueId] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    if (venues && venues.venues && venues.venues.length > 0) {
      setVenueId(venues.venues[0]._id);
    }
  }, [venues]);

  const userDataString = localStorage.getItem('Reservify');
  const user = userDataString ? JSON.parse(userDataString) : null;
  const [loggedIn, setLoggedIn] = useState({
    id: localStorage.getItem('UserId'),
    name_first: localStorage.getItem('FirstName'),
    name_last: localStorage.getItem('LastName'),
    token: localStorage.getItem('Token'),
    balance: '(loading...)',
  });

  const handleLogout = () => {
    localStorage.removeItem('Reservify');
    localStorage.removeItem('UserId');
    localStorage.removeItem('FirstName');
    localStorage.removeItem('LastName');
    localStorage.removeItem('Token');
    // Reset loggedIn state
    setLoggedIn({
      id: null,
      name_first: null,
      name_last: null,
      token: null,
      balance: '(loading...)',
    });
    // window.location.reload();
    navigate('/login');
  };

  return (
    <Box bg="teal.500" p={4}>
      <Flex align="center" justify="space-between">
        <Text color="white" fontSize="xl" fontWeight="bold">
          Reservify
        </Text>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
          spacing={4}
        >
          <Link to="/">
            <Button variant="link" color="white">
              Home
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="link" color="white">
              About
            </Button>
          </Link>
          <Link to="/services">
            <Button variant="link" color="white">
              Services
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="link" color="white">
              Contact
            </Button>
          </Link>
        </Stack>

        <Menu>
          <MenuButton
            as={IconButton}
            icon={<HamburgerIcon />}
            variant="outline"
            color="white"
            onClick={isOpen ? onClose : onOpen}
            display={{ md: 'none' }}
          />
          <MenuList>
            <Link to="/home">
              <MenuItem onClick={onClose}>Home</MenuItem>
            </Link>
            <Link to="/about">
              <MenuItem onClick={onClose}>About</MenuItem>
            </Link>
            <Link to="/services">
              <MenuItem onClick={onClose}>Services</MenuItem>
            </Link>
            <Link to="/contact">
              <MenuItem onClick={onClose}>Contact</MenuItem>
            </Link>
          </MenuList>
        </Menu>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          align="center"
        >
          {/* Venue Dropdown */}
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              colorScheme="teal"
            >
              Manage Venues
            </MenuButton>
            <MenuList>
              <Link to={`/venue/${venueId}`}>
                <MenuItem isDisabled={!venueId}>View Venue</MenuItem>
              </Link>
              <Link to="/add-venue">
                <MenuItem>Add Venue</MenuItem>
              </Link>
            </MenuList>
          </Menu>

          {/* User Actions Dropdown */}
          {user ? (
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                colorScheme="teal"
              >
                {user.name_first}
              </MenuButton>
              <MenuList>
                <Link to="/bookings">
                <MenuItem>My Bookings</MenuItem>
                </Link>
                <Link to="/account">
                  <MenuItem>Manage Account</MenuItem>
                </Link>
                <Link to="/howto">
                  <MenuItem>How to Use?</MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button colorScheme="teal" variant="solid">
                Sign In
              </Button>
            </Link>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};

export default Navbar;
