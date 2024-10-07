import { FormControl, Input, InputGroup, InputRightElement, Button, FormErrorMessage, FormHelperText } from '@chakra-ui/react';
import React from 'react';

const PasswordInput = ({ placeholder, name, value, onChange, isInvalid, errorMessage, successMessage }) => {
  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow(!show);

  return (
    <FormControl isInvalid={isInvalid}>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
      {isInvalid ? (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      ) : successMessage ? (
        <FormHelperText color="green.500">{successMessage}</FormHelperText>
      ) : null}
    </FormControl>
  );
};



//
// function PasswordInput() {
//   const [show, setShow] = React.useState(false);
//
//   const handleClick = () => setShow(!show);
//
//   return (
//     <InputGroup size="md">
//       <Input
//         pr="4.5rem"
//         type={show ? 'text' : 'password'}
//         placeholder="Enter password"
//       />
//       <InputRightElement width="4.5rem">
//         <Button h="1.75rem" size="sm" onClick={handleClick}>
//           {show ? 'Hide' : 'Show'}
//         </Button>
//       </InputRightElement>
//     </InputGroup>
//   );
// }
//




export default PasswordInput;
