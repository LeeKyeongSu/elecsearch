import { useState } from 'react';
import { Select } from '@chakra-ui/react';

const ConnectType = ({ placeholder }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Select
      value={selectedValue}
      onChange={handleChange}
      width='100%'
      size='md'
    >
      <option value='' disabled hidden>{placeholder}</option>
      <option value='DC차데모'>DC차데모</option>
      <option value='AC완속'>AC완속</option>
      <option value='DC차데모+AC3상'>DC차데모+AC3상</option>
      <option value='DC콤보'>DC콤보</option>
      <option value='DC차데모+DC콤보'>DC차데모+DC콤보</option>
      <option value='DC차데모+AC3상+DC콤보'>DC차데모+AC3상+DC콤보</option>
      <option value='AC3상'>AC3상</option>
      <option value='DC콤보(완속)'>DC콤보(완속)</option>
    </Select>
  );
};

export default ConnectType;

