import { Radio, RadioGroup, Stack } from '@chakra-ui/react';

function ChooseOne({ value, onChange }) {
  return (
      <RadioGroup onChange={onChange} value={value}>
        <Stack direction="row">
          <Radio value="user">일반 이용자</Radio>
          <Radio value="business">사업자</Radio>
        </Stack>
      </RadioGroup>
  );
}

export default ChooseOne;
