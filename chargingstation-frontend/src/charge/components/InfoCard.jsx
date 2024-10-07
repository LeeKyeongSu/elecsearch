import { useState, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Charge from './Charge';
import ChargeDetail from './ChargeDetail';

const InfoCard = ({ chargerData }) => {
  const location = useLocation();
  const isChargeView = location.pathname.startsWith('/') && !location.pathname.startsWith('/charge/place/');
  const isChargeDetailView = location.pathname.startsWith('/charge/place/');

  return (
    <Box
      p={4}
      bg="white"
      borderRadius="md"
      width="400px"
      position="absolute"
      top="100px"
      right="10px"
      zIndex={1}
      maxHeight="440px" 
      overflowY="auto" 
    >
      {isChargeView && <Charge chargerData={chargerData} />}
      {isChargeDetailView && <ChargeDetail statId={location.pathname.split('/').pop()} />}
    </Box>
  );
};

export default InfoCard;