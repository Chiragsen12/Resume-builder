// import { TabList, Tabs, Tab, TabPanels, TabPanel, Box, Text } from '@chakra-ui/react';
// import { useLocation } from 'react-router-dom';
// import About from './About.js';
// import Education from './BuildSteps/Education';
// import Projects from './BuildSteps/Projects';
// import Skills from './BuildSteps/Skills';
// import Work from './BuildSteps/Work';
// import Certificate from './BuildSteps/Certificates';
// import LayoutThree from './NewLayouts/LayoutThree';
// import ResumePreview from './NewLayouts/ResumePreview'; // Layout 1


import { useLocation } from "react-router-dom";
import LayoutThree from './NewLayouts/LayoutThree';
import ResumePreview from './NewLayouts/ResumePreview'; 
import Layoutfive from './NewLayouts/Layoutfive';
import Layoutfour from './NewLayouts/Layoutfour';
import { Box, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import About from './About.js'
import Education from './BuildSteps/Education';
import Skills from './BuildSteps/Skills';
import Work from './BuildSteps/Work';
import Projects from './BuildSteps/Projects';
import Certificate from './BuildSteps/Certificates';

const Builder = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const layout = query.get("layout");

  return (
    <>
      <Box
        bg={'white'}
        w={'full'}
        maxW={'xl'}
        minH={'50vh'}
        rounded={'md'}
        shadow={'md'}
        overflow={'hidden'}
      >
        <Tabs variant="enclosed">
          <TabList>
            <Tab>About</Tab>
            <Tab>Education</Tab>
            <Tab>Skills</Tab>
            <Tab>Work</Tab>
            <Tab>Projects</Tab>
            <Tab>Certificates</Tab>
          </TabList>
          <TabPanels>
            <TabPanel><About /></TabPanel>
            <TabPanel><Education /></TabPanel>
            <TabPanel><Skills /></TabPanel>
            <TabPanel><Work /></TabPanel>
            <TabPanel><Projects /></TabPanel>
            <TabPanel><Certificate /></TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Box width={{ base: "100%", md: "50%" }} p={4}>
        {layout === "1" && <ResumePreview />}
        {layout === "2" && <LayoutThree />}
        {layout === "3" && <Layoutfour />}
        {layout === "4" && <Layoutfive />}
      </Box>
    </>
  );
};

export default Builder;
