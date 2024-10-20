import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Text,
  Spinner,
  SimpleGrid,
  GridItem,
  Button,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
  Switch,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  useToast,
  Flex, // Import Flex for layout
} from '@chakra-ui/react';
import useFetchVenues from '../components/client-side/Venues.js';
import Navbar from '../components/client-side/Navbar.js';

const VenueList = () => {
  const navigate = useNavigate();
  const { venues, loading, error } = useFetchVenues();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [subVenueName, setSubVenueName] = useState('');
  const [subVenueAddress, setSubVenueAddress] = useState('');
  const [subVenueCapacity, setSubVenueCapacity] = useState(0);
  const [subVenueType, setSubVenueType] = useState('');
  const [outsideEventsAllowed, setOutsideEventsAllowed] = useState(false);
  const [subVenues, setSubVenues] = useState([]); // State for sub-venues
  const { venueId } = useParams();
  const toast = useToast(); // Initialize Chakra UI toast

  useEffect(() => {
    // Fetch sub-venues for the selected venue when component mounts or venueId changes
    const fetchSubVenues = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/venue/get-subVenues/${venueId}`
        );
        setSubVenues(response.data.subVenues);
      } catch (error) {
        console.error('Error fetching sub-venues:', error);
      }
    };

    if (venueId) {
      fetchSubVenues();
    }
  }, [venueId]);

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return (
      <Text color="red.500" textAlign="center">
        Error fetching venues: {error.message}
      </Text>
    );
  }
  const handleDeleteSubVenue = async subVenueId => {
    try {
      await axios.delete(
        `http://localhost:8080/api/venue/delete-subVenue/${subVenueId}`
      );
      setSubVenues(subVenues.filter(subVenue => subVenue._id !== subVenueId)); // Update the state to remove the deleted sub-venue
      toast({
        title: 'Sub-Venue Deleted',
        description: 'Sub-venue deleted successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Failed to delete sub-venue:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete sub-venue.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleAddSubVenue = venueId => {
    setSelectedVenue(venueId);
    onOpen();
  };

  const handleSubmitSubVenue = async e => {
    e.preventDefault();
    const newSubVenue = {
      venueName: subVenueName,
      venueAddress: subVenueAddress,
      venueCapacity: subVenueCapacity,
      venueType: subVenueType,
      venueId,
      outsideEventsAllowed,
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/api/venue/add-subVenue/${venueId}`,
        newSubVenue
      );

      console.log(response.data); // Log the response to verify
      alert('success');
      navigate('/');

      // Add the new sub-venue to the list
      setSubVenues([...subVenues, response.data.newSubVenue]); // Ensure this exists in the response

      // Reset form state and close modal
      setSubVenueName('');
      setSubVenueAddress('');
      setSubVenueCapacity(0);
      setSubVenueType('');
      setOutsideEventsAllowed(false);
      onClose();
    } catch (error) {
      console.error('Failed to add sub-venue:', error);
      alert('failed to add sub Venue');
    }
  };

  return (
    <>
      <Navbar />
      <Box p={4}>
        {/* Change SimpleGrid to Flex for a wider layout */}
        <Flex wrap="wrap" spacing={4} justifyContent="center">
          {venues?.venues?.map(venue => (
            <Box
              key={venue._id}
              flexBasis={{ base: '100%', md: '45%', lg: '60%' }} // Adjust the width here
              mb={4}
            >
              <Box textAlign="center" mb={4}>
                <Box bg="teal.500" p={4} borderRadius="md">
                  <Text
                    fontSize="3xl"
                    fontWeight="bold"
                    color="white"
                    textTransform="uppercase"
                  >
                    Venue: {venue.name || 'N/A'}
                  </Text>
                </Box>
              </Box>
              <Box
                p={6}
                shadow="md"
                borderWidth="1px"
                borderRadius="lg"
                transition="transform 0.2s"
                _hover={{ transform: 'scale(1.05)', shadow: 'lg' }}
                bg="white"
                textAlign="left"
                display="flex" // Enable flexbox layout
                justifyContent={'space-between'}
                direction="row"
              >
                <Stack>
                  <Text fontWeight="bold" fontSize="20px">
                    Type: {venue.venueType || 'N/A'}
                  </Text>
                  <Text fontWeight="bold" fontSize="20px">
                    Address: {venue.address || 'N/A'}
                  </Text>
                </Stack>
                <Stack direction="column" spacing={4} mt={4}>
                  <Button
                    colorScheme="blue"
                    onClick={() =>
                      console.log(`Edit venue with ID: ${venue._id}`)
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme="teal"
                    onClick={() => handleAddSubVenue(venue._id)}
                  >
                    Add Sub-Venue
                  </Button>
                </Stack>

                {/* Display Sub-Venues for this Venue */}
              </Box>
              <Box mt={4}>
                <Text
                  fontWeight="bold"
                  fontSize="2xl"
                  color="gray.800"
                  mb={4}
                  textTransform="capitalize"
                >
                  Sub-Venues:
                </Text>
                {subVenues?.length > 0 ? (
                  <SimpleGrid
                    columns={{ base: 1, sm: 2, md: 3 }} // Adjust the number of columns based on screen size
                    spacing={4} // Space between grid items
                    mt={2}
                  >
                    {subVenues.map(subVenue => (
                      <Box
                        key={subVenue._id}
                        p={4}
                        bg="gray.100"
                        borderRadius="md"
                        shadow="md"
                        transition="transform 0.2s"
                        _hover={{ transform: 'scale(1.05)', shadow: 'lg' }} // Hover effect
                      >
                        <Text
                          fontWeight="bold"
                          fontSize="lg"
                          color="gray.700"
                          textTransform="capitalize"
                        >
                          Venue Name:{' '}
                          <Text as="span" fontWeight="normal">
                            {subVenue.name || 'N/A'}
                          </Text>
                        </Text>
                        <Text
                          fontSize="md"
                          color="gray.600"
                          textTransform="capitalize"
                        >
                          Type:{' '}
                          <Text as="span" fontWeight="normal">
                            {subVenue.type || 'N/A'}
                          </Text>
                        </Text>
                        <Text
                          fontSize="md"
                          color="gray.600"
                          textTransform="capitalize"
                        >
                          Capacity:{' '}
                          <Text as="span" fontWeight="normal">
                            {subVenue.capacity || 'N/A'}
                          </Text>
                        </Text>
                        <Text
                          fontSize="md"
                          color="gray.600"
                          textTransform="capitalize"
                        >
                          Address:{' '}
                          <Text as="span" fontWeight="normal">
                            {subVenue.address || 'N/A'}
                          </Text>
                        </Text>
                        <Text
                          fontSize="md"
                          color="gray.600"
                          textTransform="capitalize"
                        >
                          Public:{' '}
                          <Text as="span" fontWeight="normal">
                            {subVenue.outsideEventsAllowed ? 'Yes' : 'No'}
                          </Text>
                        </Text>

                        {/* Action Buttons */}
                        <Stack direction="row" spacing={4} mt={4}>
                          <Button
                            colorScheme="blue"
                            onClick={() =>
                              console.log(
                                `Edit sub-venue with ID: ${subVenue._id}`
                              )
                            }
                            size="sm"
                            variant="outline"
                          >
                            Edit
                          </Button>
                          <Button
                            colorScheme="red"
                            onClick={() => handleDeleteSubVenue(subVenue._id)} // Implement this function
                            size="sm"
                            variant="outline"
                          >
                            Delete
                          </Button>
                        </Stack>
                      </Box>
                    ))}
                  </SimpleGrid>
                ) : (
                  <Text color="gray.500" mt={2} textTransform="capitalize">
                    No sub-venues available.
                  </Text>
                )}
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Modal for Adding Sub-Venue */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Sub-Venue</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="subVenueName" mb={4}>
              <FormLabel>Sub-Venue Name</FormLabel>
              <Input
                placeholder="Sub-Venue Name Like Seminar-hall, OAT, Ground"
                value={subVenueName}
                onChange={e => setSubVenueName(e.target.value)}
              />
            </FormControl>

            <FormControl id="subVenueAddress" mb={4}>
              <FormLabel>Sub-Venue Address</FormLabel>
              <Input
                placeholder="Sub-Venue Address"
                value={subVenueAddress}
                onChange={e => setSubVenueAddress(e.target.value)}
              />
            </FormControl>

            <FormControl id="subVenueCapacity" mb={4}>
              <FormLabel>Sub-Venue Capacity</FormLabel>
              <NumberInput
                value={subVenueCapacity}
                onChange={value => setSubVenueCapacity(Number(value))}
                min={0}
              >
                <NumberInputField placeholder="Capacity" />
              </NumberInput>
            </FormControl>

            <FormControl id="subVenueType" mb={4}>
              <FormLabel>Sub-Venue Type</FormLabel>
              <Input
                placeholder="Sub-Venue Type"
                value={subVenueType}
                onChange={e => setSubVenueType(e.target.value)}
              />
            </FormControl>

            <FormControl display="flex" alignItems="center" mb={4}>
              <FormLabel htmlFor="outsideEventsAllowed" mb="0">
                Outside Events Allowed
              </FormLabel>
              <Switch
                id="outsideEventsAllowed"
                isChecked={outsideEventsAllowed}
                onChange={() => setOutsideEventsAllowed(!outsideEventsAllowed)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmitSubVenue}>
              Add
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VenueList;
