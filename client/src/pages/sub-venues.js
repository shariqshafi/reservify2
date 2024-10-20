import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Text, Heading, Spinner, Alert, AlertIcon, SimpleGrid, Flex, Button } from '@chakra-ui/react';
import Navbar from '../components/client-side/Navbar';

export default function SubVenues() {
  const navigate = useNavigate()
  const [subVenues, setSubVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { venueName, venueId } = useParams();
  
  useEffect(() => {
    const fetchSubVenues = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/venue/get-subVenues/${venueId}`);
        const data = await response.json();
        
        if (response.ok) {
          const venues = data.subVenues || data;
          setSubVenues(venues);
        } else {
          throw new Error(data.message || 'Failed to fetch sub-venues');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubVenues();
  }, [venueId]);

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="lg" color="blue.500" />
        <Text mt={4} color="gray.500">Loading sub-venues...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error" variant="left-accent" my={4}>
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  if (subVenues.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text fontSize="lg" color="gray.600">No sub-venues found for this venue.</Text>
      </Box>
    );
  }

  const handleBooking = (subVenueName) => {
   navigate(`/book/${venueName}/${subVenueName}`)
  };

  return (
    <>
      <Navbar />
      <Box p={4}>
      <Heading fontSize="3xl" textAlign="center" color="teal.600" mb={8}>
        Venues of {venueName}
      </Heading>
      
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={8}>
        {subVenues.map((subVenue) => (
          <Box
            key={subVenue._id}
            p={6}
            borderWidth={1}
            borderRadius="md"
            boxShadow="lg"
            bg="white"
            _hover={{ bg: "gray.50", transform: 'scale(1.05)' }}
            transition="all 0.3s ease"
          >
            <Heading fontSize="xl" color="teal.700" mb={4}>
              {subVenue.name}
            </Heading>
            <Flex direction="column" gap={2} mb={4}>
              <Text fontWeight="bold" color="gray.700">
                Address:
                <Text as="span" fontWeight="normal" color="gray.600"> {subVenue.address}</Text>
              </Text>
              <Text fontWeight="bold" color="gray.700">
                Capacity:
                <Text as="span" fontWeight="normal" color="gray.600"> {subVenue.capacity}</Text>
              </Text>
              <Text fontWeight="bold" color="gray.700">
                Type:
                <Text as="span" fontWeight="normal" color="gray.600"> {subVenue.type}</Text>
              </Text>
              <Text fontWeight="bold" color="gray.700">
                Outside Events Allowed:
                <Text as="span" fontWeight="normal" color="gray.600">
                  {subVenue.outsideEventsAllowed ? 'Yes' : 'No'}
                </Text>
              </Text>
            </Flex>
            
            <Button 
              colorScheme="teal" 
              onClick={() => handleBooking(subVenue.name)}
              width="full"
            >
              Book Now
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
    </>
  );
}
