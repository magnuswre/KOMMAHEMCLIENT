import React, { useContext, useEffect } from 'react';
import ReactMapComponent from '../../components/ReactMapComponent/ReactMapComponent';
import DriverForm from '../../components/DriverForm/DriverForm';
import './Driver.css';
import { DriverContext } from '../../contexts/DriverContext';

const Driver = () => {
  const { user, IsLoggedInDriver, setIsLoggedInDriver, setUserDriver } = useContext(DriverContext);
  console.log(IsLoggedInDriver);

  useEffect(() => {
    const token = localStorage.getItem('user-driver');
    console.log(token)
    const parsedToken = JSON.parse(token);
    const { user } = parsedToken;
    console.log(user); 
    const userDriverId = user.id
    console.log(userDriverId)
    setUserDriver(userDriverId) 
  }, []);

  return (
    <div className='driver-page-container'>
      <ReactMapComponent />
      <DriverForm />
    </div>
  );
};

export default Driver;
