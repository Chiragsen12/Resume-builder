import {
  Box,
  Heading,
  VStack,
  Text,
  HStack,
  Icon,
  Divider,
  Wrap,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { useResume } from "../../Context";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaLinkedin, FaExternalLinkAlt } from "react-icons/fa";
import { useEffect } from "react";

const LayoutFive = () => {
  const {
    theme,
    font,
    about,
    educationList,
    skills,
    workList,
    projects,
    certificates,
    printElem,
  } = useResume();

  useEffect(() => {
    console.log(printElem);
  }, [theme, font, about, educationList, skills, workList, projects, certificates]);

  return (
    <Box
    fontFamily={font} 
      w="60rem"
      maxW="65%"
      mx="auto"
      p={8}
      bg="white"
      color="gray.700"
      borderRadius="md"
      shadow="xl"
      //fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    >
      <div ref={printElem}>
        {/* Header */}
        <VStack spacing={2} mb={6} textAlign="center">
          <Heading color={theme}>{about.name || "John Doe"}</Heading>
          <Text fontSize="lg" color="gray.500">
            {about.role || "Frontend Developer"}
          </Text>
        </VStack>

        {/* Contact */}
        <HStack
          spacing={6}
          justify="center"
          mb={6}
          color="gray.600"
          fontSize="sm"
          wrap="wrap"
        >
          <HStack><Icon as={MdEmail} /><Text>{about.email || "example@mail.com"}</Text></HStack>
          <HStack><Icon as={MdPhone} /><Text>{about.phone || "+1234567890"}</Text></HStack>
          <HStack><Icon as={MdLocationOn} /><Text>{about.address || "City, Country"}</Text></HStack>
          <HStack><Icon as={FaLinkedin} /><Text>{about.linkedin || "linkedin.com/in/username"}</Text></HStack>
        </HStack>

        {/* Education */}
        {educationList.length > 0 && (
          <VStack align="start" spacing={4} mb={6}>
            <Heading size="md" color={theme}>Education</Heading>
            {educationList.map((edu, i) => (
              <Box key={i} p={4} bg="gray.50" rounded="md" w="full">
                <Text fontWeight="bold">{edu.courseName}</Text>
                <Text fontSize="sm" color="gray.600">{edu.institute}</Text>
                <Text fontSize="xs" color="gray.500">{edu.startYr} - {edu.endYr} | Grade: {edu.grade}</Text>
              </Box>
            ))}
          </VStack>
        )}

        {/* Work Experience */}
        {workList.length > 0 && (
          <VStack align="start" spacing={4} mb={6}>
            <Heading size="md" color={theme}>Work Experience</Heading>
            {workList.map((work, i) => (
              <Box key={i} p={4} bg="gray.50" rounded="md" w="full">
                <Text fontWeight="bold">{work.position} at {work.company}</Text>
                <Text fontSize="xs" color="gray.500">{work.startDate} - {work.endDate}</Text>
                <Text fontSize="sm">{work.description}</Text>
              </Box>
            ))}
          </VStack>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <VStack align="start" spacing={4} mb={6}>
            <Heading size="md" color={theme}>Projects</Heading>
            {projects.map((proj, i) => (
              <Box key={i} p={4} bg="gray.50" rounded="md" w="full">
                <HStack justify="space-between">
                  <Text fontWeight="bold">{proj.name}</Text>
                  {proj.url && <a href={proj.url} target="_blank" rel="noreferrer"><Icon as={FaExternalLinkAlt} /></a>}
                </HStack>
                <Text fontSize="xs" color="gray.500">{proj.duration}</Text>
                <Text fontSize="sm">{proj.description}</Text>
              </Box>
            ))}
          </VStack>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <VStack align="start" spacing={4} mb={6}>
            <Heading size="md" color={theme}>Skills</Heading>
            <Wrap>
              {skills.map((skill, i) => (
                <Tag key={i} bg={theme} color="white" px={3} py={1} borderRadius="full">
                  <TagLabel>{skill.name}</TagLabel>
                </Tag>
              ))}
            </Wrap>
          </VStack>
        )}

        {/* Certificates */}
        {certificates.length > 0 && (
          <VStack align="start" spacing={4}>
            <Heading size="md" color={theme}>Certificates</Heading>
            {certificates.map((cert, i) => (
              <Box key={i} p={4} bg="gray.50" rounded="md" w="full">
                <Text fontWeight="bold">{cert.title}</Text>
                <Text fontSize="sm" color="gray.600">{cert.provider}</Text>
                <Text fontSize="xs" color="gray.500">{cert.date}</Text>
              </Box>
            ))}
          </VStack>
        )}
      </div>
    </Box>
  );
};

export default LayoutFive;
