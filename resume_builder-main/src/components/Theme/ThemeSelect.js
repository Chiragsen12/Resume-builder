import { HStack, useRadioGroup, Select, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useResume } from '../../Context';
import ThemeOption from './ThemeOption';

const ThemeSelect = () => {
  const options = ['purple.400', 'green.400', 'cyan.400', 'gray.400', 'red.400', 'orange.400', '#F15BA6'];
  const { theme, setTheme, setFont } = useResume();

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'color',
    value: theme,
    onChange: setTheme,
  });

  const group = getRootProps();

  const [font, setFontLocal] = useState(localStorage.getItem('selectedFont') || 'Arial');

  useEffect(() => {
    localStorage.setItem('selectedFont', font);
    setFont(font);
  }, [font, setFont]);

  return (
    <VStack align="start" spacing={4}>
      <HStack {...group}>
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return <ThemeOption key={value} {...radio}>{value}</ThemeOption>;
        })}
      </HStack>

      <Select
        value={font}
        onChange={(e) => setFontLocal(e.target.value)}
        width="200px"
        borderColor="gray.300"
        borderRadius="md"
        placeholder="Select font"
      >
        <option value="Arial">Arial</option>
        <option value="Georgia">Georgia</option>
        <option value="'Courier New'">Courier New</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Roboto">Roboto</option>
      </Select>
    </VStack>
  );
};

export default ThemeSelect;