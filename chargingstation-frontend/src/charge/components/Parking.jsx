import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { useState } from 'react';

function Parking() {
  const [value, setValue] = useState('option1');

  return (
    <RadioGroup onChange={setValue} value={value}>
      <Stack direction="row">
        <Radio value="option1">무료 주차</Radio>
        <Radio value="option2">유료 주차</Radio>
      </Stack>
    </RadioGroup>
  );
}

export default Parking;