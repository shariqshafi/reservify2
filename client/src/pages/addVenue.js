import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Stack,
  FormErrorMessage,
  useToast,
  Heading,
} from '@chakra-ui/react';
import Navbar from '../components/client-side/Navbar';
import axios from 'axios';

const AddVenue = () => {
  const [name, setName] = useState('');
  const [option, setOption] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState(false);
  const toast = useToast();
  const userDataString = localStorage.getItem('Reservify');
  const user = userDataString ? JSON.parse(userDataString) : null;
  const handleSubmit = async e => {
    e.preventDefault();
    if (!name || !option || !address) {
      setError(true);
      return;
    }
    setError(false);

    // Prepare the data to be sent
    const venueData = {
      venueName: name,
      venueAddress: address,
      venueType: option,
      userId: user.id,
    };

    try {
      // Send a POST request to the server
      const response = await axios.post(
        'http://localhost:8080/api/venue/add-venue',
        venueData
      );
      toast({
        title: 'Success',
        description: response.data.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Reset the form
      setName('');
      setOption('');
      setAddress('');
    } catch (error) {
      console.error('Error submitting the form:', error);
      toast({
        title: 'Error',
        description: 'Failed to add venue.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Navbar />
      <Heading fontSize={'2xl'} textAlign="center">
        Add Your Venue
      </Heading>
      <Box
        p={4}
        maxWidth="400px"
        mx="auto"
        mt={8}
        borderWidth={1}
        borderRadius="lg"
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl isInvalid={error && !name}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter venue name"
              />
              <FormErrorMessage>Name is required.</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={error && !option}>
              <FormLabel htmlFor="option">Select Option</FormLabel>
              <Select
                id="option"
                value={option}
                onChange={e => setOption(e.target.value)}
                placeholder="Select an option"
              >
                <option value="COLLEGE">College</option>
                <option value="UNIVERSITY">University</option>
                <option value="MARRIAGE-HALL">Marriage Hall</option>
              </Select>
              <FormErrorMessage>Option is required.</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={error && !address}>
              <FormLabel htmlFor="address">Address</FormLabel>
              <Textarea
                id="address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Enter your address"
              />
              <FormErrorMessage>Address is required.</FormErrorMessage>
            </FormControl>

            <Button type="submit" colorScheme="teal">
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default AddVenue;
