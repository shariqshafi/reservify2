import React, { useState } from 'react';
import {
  Flex,
  Box,
  Stack,
  Button,
  Link,
  Heading,
  Text,
  Divider,
  VStack,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';

import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link as RouteLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {
  InfoOutlineIcon,
  CalendarIcon,
  EditIcon,
  LockIcon,
} from '@chakra-ui/icons';
import Slider from 'react-slick';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import BASE_URL from '../env';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from '../components/client-side/Navbar';

function Home(props) {
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  console.log(venues);
  const handleViewSubVenues = (venueName,venueId) => {
    // Navigate to the sub-venues page, you can use react-router or any routing library
    // For example, if using react-router:
    navigate(`/sub-venues/${venueName}/${venueId}`);
  };

  // Fetch venue data from the API
  const fetchVenues = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/venue/get-venues'
      ); // Adjust the endpoint as necessary
      setVenues(response.data);

    } catch (error) {
      console.error('Error fetching venues:', error);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedVenue, setSelectedVenue] = useState(null);

  const handleCardClick = venue => {
    setSelectedVenue(venue);
    onOpen();
  };

  const venuesCopy = [
    {
      name: 'Maths Department',
      description:
        'The Maths department is equipped with modern facilities for seminars and meetings.',
      imageUrl:
        'https://images.pexels.com/photos/1181394/pexels-photo-1181394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      detailedDescription:
        'The Maths Department Hall can comfortably accommodate up to 100 attendees. It is equipped with modern audio-visual systems, including a projector, microphones, and sound system. The hall also features a large whiteboard and conference tables arranged in a U-shape. Amenities include high-speed Wi-Fi, air conditioning, ergonomic seating, easy access to restrooms, and parking. Refreshments can be arranged upon request.',
    },
    {
      name: 'Law Department',
      description:
        'The Law department offers a spacious and well-equipped venue for legal discussions and conferences.',
      imageUrl:
        'https://images.pexels.com/photos/260689/pexels-photo-260689.jpeg?auto=compress&cs=tinysrgb&w=600',
      detailedDescription:
        'The Law Department Hall is suitable for gatherings of up to 120 people. It is equipped with a sophisticated audio-visual system, including a podium, microphone, projector, and large screen. The room layout is flexible to accommodate various meeting styles, from presentations to debates. Amenities include air conditioning, high-speed internet, ergonomic seating, in-house catering options, restrooms, and ample parking.',
    },
    {
      name: 'IT Department',
      description:
        'The IT department has state-of-the-art facilities for tech meetings and presentations.',
      imageUrl:
        'https://cdn.pixabay.com/photo/2018/05/09/07/11/architectural-3384683_640.jpg',
      detailedDescription:
        'The IT Department Hall is designed to host up to 150 participants and is equipped with state-of-the-art computer stations with high-speed internet access, a large display screen for presentations, and integrated video conferencing equipment. The venue also provides comfortable seating with adjustable desks, air conditioning, on-site technical support, a kitchenette for catering services, and ample parking.',
    },
    {
      name: 'Physics Department',
      description:
        'The Physics department provides a conducive environment for scientific discussions and events.',
      imageUrl:
        'https://images.pexels.com/photos/236730/pexels-photo-236730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      detailedDescription:
        'The Physics Department Hall can hold up to 80 people and features a comprehensive audio-visual setup, including a projector, large display screen, and surround sound system. The room includes a large central table and multiple smaller discussion tables. Amenities include high-speed Wi-Fi, climate control, comfortable seating, designated areas for breaks, and refreshments and catering services can be arranged.',
    },
  ];

  const cardSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <Navbar />
      <Flex direction="column" minH="100vh">
        {/* Top Bar */}

        {/* Main Content */}
        <Flex flex="1" bg="gray.50">
          {/* Hero Section with Carousel */}
          <Box flex="1">
            <Box
              width="99vw"
              height="550px"
              overflow="hidden"
              position="relative"
            >
              <Slider {...sliderSettings}>
                {venuesCopy.map((venue, index) => (
                  <Box key={index} position="relative">
                    <img
                      src={venue.imageUrl} // Assuming you have an imageUrl field in your venue model
                      alt={`Venue ${venue.name}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <Box
                      position="absolute"
                      top="30%"
                      left="10%"
                      bgGradient="linear(to-t, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))"
                      color="white"
                      p={6}
                    >
                      <Heading fontSize="2xl">{venue.name}</Heading>
                      <Text fontSize="lg">{venue.address}</Text>{' '}
                      {/* Adjust according to your venue model */}
                    </Box>
                  </Box>
                ))}
              </Slider>
            </Box>
          </Box>
        </Flex>

        {/* Venue Cards */}
        <Flex direction="column" minH="100vh" width="1330px">
          <Box mt={12} px={2}>
            <Heading fontSize="2xl" mb={4} ml={4}>
              University Venue Blogs
            </Heading>
            <Slider {...cardSettings}>
              {venues
                .filter(
                  venue =>
                    venue.venueType === 'COLLEGE' ||
                    venue.venueType === 'UNIVERSITY'
                ) // Fetch only specific venue types
                .map((venue, index) => (
                  <Box key={index} py={2} px={2}>
                    <Box
                      p={4}
                      boxShadow="md"
                      borderRadius="md"
                      bg="white"
                      cursor="pointer"
                    >
                      <img
                        src={
                          venue.imageUrl ||
                          'https://via.placeholder.com/400x250.png?text=Demo+Image'
                        } // Fallback to demo image
                        alt={venue.name}
                        style={{
                          width: '100%',
                          height: '250px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                        }}
                      />
                      <Heading fontSize="xl" mt={4} textTransform="uppercase">
                        {' '}
                        {/* Added text-transform */}
                        {venue.name}
                      </Heading>
                      <Flex alignItems="center" mt={2}>
                        <Icon as={FaMapMarkerAlt} color="red.500" mr={1} />
                        <Text textTransform="capitalize">
                          {' '}
                          {/* Added text-transform */}
                          {venue.address}
                        </Text>
                      </Flex>
                      <Text mt={2} overflow="hidden" textOverflow="ellipsis">
                        <strong>Venue Type:</strong>{' '}
                        {/* Made venue type more visible */}
                        {` ${venue.venueType}`}
                      </Text>
                      <Button
                        mt={4}
                        colorScheme="blue"
                        onClick={() => handleViewSubVenues(venue.name,venue._id)}
                      >
                        View Venue
                      </Button>
                    </Box>
                  </Box>
                ))}
            </Slider>
          </Box>
        </Flex>

        {/* Footer */}
        <Box as="footer" px={4} pt={6} pb={4} mt={-20} bg="gray.100">
          <VStack spacing={4}>
            <Text fontSize="lg" fontWeight="bold">
              RESERVIFY
            </Text>
            <Text fontSize="sm">
              Book your favorite venue for meetings, conferences, and events
              with ease.
            </Text>
            <Divider borderColor={useColorModeValue('gray.300', 'gray.700')} />
            <Flex justify="space-between" width="100%" maxW="6xl" mx="auto">
              <Box>
                <Heading fontSize="md">Quick Links</Heading>
                <Stack mt={4}>
                  <RouteLink to="/book">
                    <Link>New Booking</Link>
                  </RouteLink>
                  <RouteLink to="/bookings">
                    <Link>My Bookings</Link>
                  </RouteLink>
                  <RouteLink to="/account">
                    <Link>Manage Account</Link>
                  </RouteLink>
                  <RouteLink to="/howto">
                    <Link>How to Use?</Link>
                  </RouteLink>
                </Stack>
              </Box>
              <Box>
                <Heading fontSize="md">Contact Us</Heading>
                <Stack mt={4}>
                  <Link href="mailto:tawkeer00@gmail.com">
                    Tawkeer00@gmail.com
                  </Link>
                  <Link href="mailto:tawkeer00@gmail.com">
                    Kitabmomin25@gmail.com
                  </Link>
                  <Link href="tel:+96006579990">(+91) 6006579990</Link>
                </Stack>
              </Box>
              <Box>
                <Heading fontSize="md">Follow Us</Heading>
                <Stack direction="row" mt={4} spacing={4}>
                  <Link href="https://www.facebook.com" isExternal>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                      alt="Facebook"
                      width="24"
                      height="24"
                    />
                  </Link>
                  <Link href="https://www.twitter.com" isExternal>
                    <img
                      src="https://cdn-icons-png.freepik.com/256/5969/5969020.png?semt=ais_hybrid"
                      alt="Twitter"
                      width="24"
                      height="24"
                    />
                  </Link>
                  <Link href="https://www.linkedin.com" isExternal>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Linkedin_icon.svg"
                      alt="LinkedIn"
                      width="24"
                      height="24"
                    />
                  </Link>
                </Stack>
              </Box>
            </Flex>
            <Divider borderColor={useColorModeValue('gray.300', 'gray.700')} />
            <Text fontSize="sm" color="gray.600">
              &copy; {new Date().getFullYear()} Reservify. All rights reserved.
            </Text>
          </VStack>
        </Box>
      </Flex>
    </>
  );
}

export default Home;
