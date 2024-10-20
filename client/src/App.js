import React, { useEffect, useState } from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import Book from './pages/Book';
import Bookings from './pages/Bookings';
import Account from './pages/Account';
import Menu from './pages/Menu';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';
import 'react-toastify/dist/ReactToastify.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Howto from './pages/Howto';
import axios from 'axios';
import AdminMenu from './admin-pages/AdminMenu';
import InviteCode from './admin-pages/InviteCode';
import TopUp from './admin-pages/TopUp';
import PastBookings from './admin-pages/PastBookings';
import FutureBookings from './admin-pages/FutureBookings';
import ManageUsers from './admin-pages/ManageUsers';
import AddUser from './admin-pages/AddUser';
import ViewLogs from './admin-pages/ViewLogs';
import GuardPage from './pages/GuardPage';
import BASE_URL from './env';
import Home from './pages/Home';
import AddVenue from './pages/addVenue';
import Venue from './pages/Venue';
import SubVenues from './pages/sub-venues';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const balanceURL = `${BASE_URL}/users/balance`;

  // Initialize loggedIn state from localStorage
  const [loggedIn, setLoggedIn] = useState({
    id: localStorage.getItem('UserId'),
    name_first: localStorage.getItem('FirstName'),
    name_last: localStorage.getItem('LastName'),
    token: localStorage.getItem('Token'),
    balance: '(loading...)',
  });

  // Update balance once the component mounts or when token changes
  useEffect(() => {
    if (loggedIn.token) {
      updateBalance();
    }
  }, [loggedIn.token]);

  const setLogin = credentials => {
    setLoggedIn(credentials);

    // Store user data in localStorage
    localStorage.setItem('UserId', credentials.id);
    localStorage.setItem('FirstName', credentials.name_first);
    localStorage.setItem('LastName', credentials.name_last);
    localStorage.setItem('Token', credentials.token);
  };
console.log(loggedIn.token);

  const updateBalance = () => {
    axios
      .get(balanceURL, {
        headers: { Authorization: `Bearer ${loggedIn.token}` },
      })
      .then(response => {
        setLoggedIn(prevState => ({
          ...prevState,
          balance: response.data.balance.balance,
        }));
      });
  };

  const logout = () => {
    // Clear localStorage on logout
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
  };

  return (
    <>
      <ChakraProvider theme={theme}>
        <Box>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    loggedIn={loggedIn}
                    setLogin={setLogin}
                    logout={logout}
                  />
                }
              />
              <Route path="/register" element={<Register />} />
              <Route
                path="/login"
                element={
                  <PublicRoute loggedIn={loggedIn}>
                    <Login setLogin={setLogin} />
                  </PublicRoute>
                }
              />
              <Route
                path="/add-venue"
                element={
                  <AddVenue
                    loggedIn={loggedIn}
                    setLogin={setLogin}
                    logout={logout}
                  />
                }
              />
              <Route
                path="/venue/:venueId"
                element={
                  <Venue
                    loggedIn={loggedIn}
                    setLogin={setLogin}
                    logout={logout}
                  />
                }
              />
              <Route
                path="/sub-venues/:venueName/:venueId"
                element={
                  <SubVenues
                    loggedIn={loggedIn}
                    setLogin={setLogin}
                    logout={logout}
                  />
                }
              />
              <Route
                path="/college"
                element={
                  <Menu
                    loggedIn={loggedIn}
                    setLogin={setLogin}
                    logout={logout}
                  />
                }
              />
              <Route
                path="/college/login"
                element={<Login loggedIn={loggedIn} setLogin={setLogin} />}
              />
              <Route path="/howto" element={<Howto />} />
              <Route
                path="/register"
                element={<Register loggedIn={loggedIn} />}
              />
              {/* <Route path='/' element={<Board />} /> */}
              <Route
                path="/account"
                element={
                  <Account
                    loggedIn={loggedIn}
                    setLogin={setLogin}
                    logout={logout}
                  />
                }
              />
              <Route
                path="/book/:venueName/:subVenueName"
                element={
                  <PrivateRoute loggedIn={loggedIn}>
                    <Book
                      loggedIn={loggedIn}
                      setLogin={setLogin}
                      logout={logout}
                      updateBalance={updateBalance}
                    />
                  </PrivateRoute>
                }
              />

              <Route
                path="/bookings"
                element={
                  <Bookings loggedIn={loggedIn} updateBalance={updateBalance} />
                }
              />
              <Route
                path="/admin"
                element={
                  <AdminMenu
                    loggedIn={loggedIn}
                    setLogin={setLogin}
                    logout={logout}
                  />
                }
              />
              <Route
                path="/admin/invite"
                element={<InviteCode loggedIn={loggedIn} setLogin={setLogin} />}
              />
              <Route
                path="/admin/topup"
                element={<TopUp loggedIn={loggedIn} setLogin={setLogin} />}
              />
              <Route
                path="/admin/past-bookings"
                element={
                  <PastBookings loggedIn={loggedIn} setLogin={setLogin} />
                }
              />
              <Route
                path="/admin/future-bookings"
                element={
                  <FutureBookings loggedIn={loggedIn} setLogin={setLogin} />
                }
              />
              <Route
                path="/admin/add-user"
                element={<AddUser loggedIn={loggedIn} setLogin={setLogin} />}
              />
              <Route
                path="/admin/manage-users"
                element={
                  <ManageUsers loggedIn={loggedIn} setLogin={setLogin} />
                }
              />
              <Route
                path="/admin/logs"
                element={<ViewLogs loggedIn={loggedIn} setLogin={setLogin} />}
              />
              <Route
                path="/guard"
                element={
                  <GuardPage
                    loggedIn={loggedIn}
                    setLogin={setLogin}
                    logout={logout}
                  />
                }
              />
            </Routes>
          </Router>
        </Box>
      </ChakraProvider>
    </>
  );
}

export default App;
