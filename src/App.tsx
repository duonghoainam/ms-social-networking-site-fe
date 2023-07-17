import React, { ReactElement, useEffect, useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import PrivateRoute from './components/ControlRoute/PrivateRoute';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import AuthRoute from './components/ControlRoute/AuthRoute';
import RegisterPage from './pages/Register/RegisterPage';
import IndexChat from './pages/Chat';
import NewPostPage from './pages/NewPost/NewPostPage';
import UserPage from './pages/User/UserPage';
import { socket } from './utils/api.util';
import { ToastContainer } from 'react-toastify';

function App (): ReactElement {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  // function success(position: { coords: { latitude: Number; longitude: Number; }; }) {
  //   const latitude = position.coords.latitude;
  //   const longitude = position.coords.longitude;
  //   // setLocation({ latitude, longitude });
  //   console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  //   // Make API call to OpenWeatherMap
  //3939e70924ddd1b2d6be0af2eadbe89c
  //   fetch(` https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=2362412ca7fdf9417036bad5e2b45dfe&units=metric`)
  //     .then(response => response.json())
  //     .then(data => {
  //       setWeather(data);
  //       console.log(data);
  //     })
  //     .catch(error => console.log(error));
  // }

  // function error() {
  //   console.log("Unable to retrieve your location");
  // } 
  useEffect(() => {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(success, error);
    // } else {
    //   console.log("Geolocation not supported");
    // }
    if (currentUser?.id !== undefined) {
      if (socket.connected) {
        socket.emit('call', 'rooms.join', { join: currentUser.id });
      } else {
        socket.on('connect', function () {
          socket.emit('call', 'rooms.join', { join: currentUser.id });
        });
        socket.connect();
      }
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        {/* Home */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Routes>
                <Route index element={<HomePage />}></Route>
              </Routes>
            </PrivateRoute>
          }></Route>

        <Route path="/user/:id" element={
          <PrivateRoute>
            <UserPage />
          </PrivateRoute>
        }></Route>

        <Route path="/user/:id/:_id" element={
          <PrivateRoute>
            <UserPage />
          </PrivateRoute>
        }></Route>

        {/* Chat */}
        <Route
          path="/messenger/*"
          element={
            <PrivateRoute>
              <IndexChat />
            </PrivateRoute>
          }></Route>

        {/* New post */}
        <Route path="/new/*" element={
          <PrivateRoute>
            <NewPostPage />
          </PrivateRoute>}>
        </Route>

        {/* Auth */}
        <Route
          path="/login/*"
          element={
            <AuthRoute>
              <Routes>
                <Route index element={<LoginPage />} />
              </Routes>
            </AuthRoute>
          }></Route>

        <Route
          path="/register/*"
          element={
            <AuthRoute>
              <Routes>
                <Route index element={<RegisterPage />} />
              </Routes>
            </AuthRoute>
          }></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
