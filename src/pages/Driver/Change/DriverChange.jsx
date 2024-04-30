import React, { useContext } from 'react'
import './DriverChange.css'
import { DriverContext } from '../../../contexts/DriverContext';
import ReactMapComponent from '../../../components/ReactMapComponent/ReactMapComponent';
import DriverForm from '../../../components/DriverForm/DriverForm';
import { useParams } from 'react-router-dom';

const DriverChange = () => {
  const { IsLoggedInDriver, setIsLoggedInDriver } = useContext(DriverContext);
  const { userId } = useParams();
  // console.log(userId);
  // console.log(IsLoggedInDriver);
  return (
    <div className='driver-change-page-container'>
      <ReactMapComponent />
      <DriverForm />
    </div>
  )
}

export default DriverChange