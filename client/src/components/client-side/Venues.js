// src/hooks/useFetchVenues.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/venue'; // Adjust the base URL as needed

const useFetchVenues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userDataString = localStorage.getItem('Reservify');
  const user = userDataString ? JSON.parse(userDataString) : null;
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/fetch-venues/${user.id}`); // Update this endpoint to fetch venues
        setVenues(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  return { venues, loading, error };
};

export default useFetchVenues;
