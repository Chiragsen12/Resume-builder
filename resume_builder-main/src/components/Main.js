import { Global } from '@emotion/react';
import {
  Box,
  Container,
  Stack,
  Text,
  HStack,
  Heading,
  Button,
  useToast,
} from '@chakra-ui/react';
import Builder from './Builder';
import ThemeSelect from './Theme/ThemeSelect';
import { useReactToPrint } from 'react-to-print';
import { useResume } from '../Context';
import { MdOutlineFileDownload, MdOutlineFileUpload } from 'react-icons/md';
import { useEffect } from 'react';

// Global Style for Printing
const PrintStyles = ({ font }) => (
  <Global
    styles={{
      '@media print': {
        body: {
          fontFamily: font || 'Arial, sans-serif', // Dynamically use the selected font
          margin: 0,
          padding: 0,
        },
      },
    }}
  />
);

const Main = () => {
  const { printElem, font } = useResume(); // Get the selected font from context
  const toast = useToast();

  const handlePrint = useReactToPrint({
    content: () => {
      console.log(printElem)
      if (!printElem || !printElem.current) {
        console.error('Print element is not defined');
        toast({
          title: 'Error',
          description: 'Unable to download resume. Please select a layout and try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return null;
      }
      return printElem.current;
    },
    documentTitle: 'Resume',
    removeAfterPrint: true,
    onPrintError: (errorLocation, error) => {
      console.error('Print error:', errorLocation, error);
      toast({
        title: 'Print Error',
        description: 'Failed to download the resume. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const resumeData = useResume();

  useEffect(() => {
    console.log('Resume Data:', resumeData);
    console.log('Print Element:', printElem?.current);
  }, [resumeData, printElem]);

  async function handleSaveClick() {
    const query = new URLSearchParams(window.location.search);
    const layout = query.get("layout");
    const data = {
      resumeData: {
        about: resumeData.about,
        educationList: resumeData.educationList,
        skills: resumeData.skills,
        workList: resumeData.workList,
        projects: resumeData.projects,
        certificates: resumeData.certificates,
        theme: resumeData.theme,
      },
      layout: layout,
    };
    const response = await fetch('http://localhost:5001/api/resume/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('resume-token')}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (response.ok) {
      console.log('Resume saved successfully:', result);
      toast({
        title: 'Resume saved successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      console.error('Error saving resume:', result);
    }
  }

  return (
    <>
      <PrintStyles font={font} />
      <Container bg={'gray.50'} minW={'full'} py={10} id='builder'>
        <Heading as='h4' size='lg' textAlign={'center'} color={'gray.700'} style={{ fontFamily: 'Poppins' }} fontWeight={'medium'}>
          Resume Builder
        </Heading>

        <Container maxW={'7xl'} px={8} my={3}>
          <Stack justifyContent={'space-between'} pt={4} direction={{ base: 'column', sm: 'row' }}>
            <ThemeSelect />
            <Stack direction={{ base: 'column', sm: 'row' }} gap={4}>
              <Button rightIcon={<MdOutlineFileDownload />} onClick={handlePrint} colorScheme={'purple'}>Download</Button>
              <Button rightIcon={<MdOutlineFileUpload />} onClick={handleSaveClick} colorScheme={'blue'}>Save</Button>
            </Stack>
          </Stack>
        </Container>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          gap={4}
          mx={{ base: 2, md: 12 }}
          my={8}
          alignItems={'flex-start'}
          justifyContent={'space-between'}
        >
          <Builder />
        </Stack>
      </Container>
    </>
  );
};

export default Main;