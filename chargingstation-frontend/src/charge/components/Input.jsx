import { FormControl, Input, FormErrorMessage, FormHelperText } from '@chakra-ui/react';

const UserInput = ({ placeholder, name, value, onChange, isInvalid, errorMessage, successMessage }) => {
  return (
    <FormControl isInvalid={isInvalid}>

      <Input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {isInvalid ? (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      ) : successMessage ? (
        <FormHelperText color="green.500">{successMessage}</FormHelperText>
      ) : null}
    </FormControl>
  );
};


// function UserInput({ placeholder, isReadOnly }) {
//   const [inputValue, setInputValue] = useState('');
//
//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };
//
//   return (
//     <Input
//       placeholder={placeholder}
//       value={inputValue}
//       onChange={handleInputChange}
//       width="100%"
//       isReadOnly={isReadOnly}
//     />
//   );
// }

export default UserInput;