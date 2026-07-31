import { useRef } from "react";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Heading,
  Avatar,
  Divider,
  Wrap,
  Tag,
  Icon,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useResume } from "../../Context";
import { MdMail, MdLocalPhone, MdLocationPin } from "react-icons/md";
import { RiLinkedinBoxFill } from "react-icons/ri";

const LayoutFour = () => {
  const {
    theme,
    font,
    about,
    educationList,
    workList,
    skills,
    projects,
    certificates,
    printElem,
  } = useResume();

  return (
    <Box ref={printElem} p={8} bg="white" color="gray.800" maxW="800px" mx="auto" boxShadow="lg" rounded="lg"
    fontFamily={font}>
      <Flex>
        {/* Sidebar */}
        <Box flexBasis="30%" bg={theme} color="white" p={6} roundedLeft="lg">
          <VStack spacing={4} align="center">
            {about.picture && (
              <Avatar size="xl" src={about.picture} name={about.name} />
            )}
            <Heading size="lg">{about.name || "Your Name"}</Heading>
            <Text fontSize="sm">{about.role || "Your Title"}</Text>

            <VStack spacing={2} align="start" w="full" mt={4}>
              {about.email && (
                <HStack>
                  <Icon as={MdMail} />
                  <Text fontSize="sm">{about.email}</Text>
                </HStack>
              )}
              {about.phone && (
                <HStack>
                  <Icon as={MdLocalPhone} />
                  <Text fontSize="sm">{about.phone}</Text>
                </HStack>
              )}
              {about.address && (
                <HStack>
                  <Icon as={MdLocationPin} />
                  <Text fontSize="sm">{about.address}</Text>
                </HStack>
              )}
              {about.linkedin && (
                <HStack>
                  <Icon as={RiLinkedinBoxFill} />
                  <Text fontSize="sm">{about.linkedin}</Text>
                </HStack>
              )}
            </VStack>

            {skills.length > 0 && (
              <Box w="full">
                <Heading size="sm" mb={2} textAlign="center">
                  Skills
                </Heading>
                <Wrap justify="center">
                  {skills.map((skill, idx) => (
                    <Tag
                      key={idx}
                      bg="white"
                      color={theme}
                      mb={2}
                      p={1}
                    >
                      {skill.name}
                    </Tag>
                  ))}
                </Wrap>
              </Box>
            )}
          </VStack>
        </Box>

        {/* Content */}
        <Box flexBasis="70%" p={6}>
          {/* Experience */}
          {workList.length > 0 && (
            <Box mb={6}>
              <Heading size="md" color={theme} mb={4}>
                Experience
              </Heading>
              <VStack align="stretch" spacing={4}>
                {workList.map((work, idx) => (
                  <Box key={idx}>
                    <HStack justify="space-between">
                      <Text fontWeight="bold">{work.position}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {work.startDate} - {work.endDate}
                      </Text>
                    </HStack>
                    <Text fontSize="sm" color="gray.600">
                      {work.company}
                    </Text>
                    <Text mt={2} fontSize="sm">
                      {work.description}
                    </Text>
                    {idx < workList.length - 1 && <Divider mt={4} />}
                  </Box>
                ))}
              </VStack>
            </Box>
          )}

          {/* Education */}
          {educationList.length > 0 && (
            <Box mb={6}>
              <Heading size="md" color={theme} mb={4}>
                Education
              </Heading>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                {educationList.map((edu, idx) => (
                  <GridItem key={idx}>
                    <Text fontWeight="bold">{edu.courseName}</Text>
                    <Text fontSize="sm" color="gray.600">
                      {edu.institute}
                    </Text>
                    <HStack justify="space-between" fontSize="xs" color="gray.500">
                      <Text>{edu.startYr} - {edu.endYr}</Text>
                      {edu.grade && <Text>{edu.grade}</Text>}
                    </HStack>
                  </GridItem>
                ))}
              </Grid>
            </Box>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <Box mb={6}>
              <Heading size="md" color={theme} mb={4}>
                Projects
              </Heading>
              <VStack align="stretch" spacing={4}>
                {projects.map((proj, idx) => (
                  <Box key={idx}>
                    <Text as="a" href={proj.url} fontWeight="bold" color={theme} isExternal>
                      {proj.name} <Icon as={() => <span>↗</span>} />
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {proj.duration}
                    </Text>
                    <Text mt={1} fontSize="sm">
                      {proj.description}
                    </Text>
                    {idx < projects.length - 1 && <Divider mt={4} />}
                  </Box>
                ))}
              </VStack>
            </Box>
          )}

          {/* Certificates */}
          {certificates.length > 0 && (
            <Box>
              <Heading size="md" color={theme} mb={4}>
                Certificates
              </Heading>
              <VStack align="stretch" spacing={4}>
                {certificates.map((cert, idx) => (
                  <Box key={idx}>
                    <Text fontWeight="bold">{cert.title}</Text>
                    <Text fontSize="xs" color="gray.500">
                      {cert.provider} • {cert.date}
                    </Text>
                    {idx < certificates.length - 1 && <Divider mt={2} />}
                  </Box>
                ))}
              </VStack>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default LayoutFour;
