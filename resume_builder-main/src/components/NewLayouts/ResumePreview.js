import {
  Box,
  Heading,
  HStack,
  Tag,
  TagLabel,
  Text,
  VStack,
  Wrap,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { useResume } from "../../Context";

import { MdMail, MdLocalPhone, MdLocationPin } from "react-icons/md";
import { RiLinkedinBoxFill } from "react-icons/ri";

const ResumePreview = () => {
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

  const imgStyle = {
    width: "50%",
    height: "115px",
    margin: "15px",
    borderRadius: "50%",
  };

  return (
    <Box
      fontFamily={font} // <- Apply font here
      bg="white"
      w="58rem"
      maxW="65%"
      rounded="md"
      shadow="md"
      overflow="hidden"
      minH="80vh"
      mx="0"
    >
      <div ref={printElem}>
        <HStack style={{ padding: "10px 15px" }}>
          {about.picture && (
            <img style={imgStyle} src={about.picture} alt="avatar" />
          )}

          <VStack m={4} alignItems={"flex-start"} spacing={0.5}>
            <Heading size="lg" fontSize="40px">
              {about.name || "John Doe"}
            </Heading>
            <Text color={"black.500"}>
              {about.role || "Full Stack Web Developer"}
            </Text>
          </VStack>
        </HStack>

        <HStack bg={theme} color={"white"} p={4} justifyContent={"space-between"}>
          <HStack spacing={1}>
            <MdMail />
            <a href={"mailto:" + about.email}>
              <Text>{about.email || "johndoe@gmail.com"}</Text>
            </a>
          </HStack>
          <HStack spacing={1}>
            <MdLocalPhone />
            <a href={"tel:" + about.phone}>
              <Text>{about.phone || "+919876543210"}</Text>
            </a>
          </HStack>
          <HStack spacing={1}>
            <MdLocationPin />
            <Text>{about.address || "Chandigarh, IN"}</Text>
          </HStack>
          <HStack spacing={1}>
            <RiLinkedinBoxFill />
            <Text as="a" href={"https://www.linkedin.com/in/" + about.linkedin}>
              {about.linkedin || "johndoe123"}
            </Text>
          </HStack>
        </HStack>

        <HStack
          w={"full"}
          h={"full"}
          my={2}
          mb={6}
          px={2}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          spacing={1}
        >
          <VStack mx={2} alignItems={"flex-start"} w={"full"} spacing={6}>
            {/* EDUCATION */}
            {educationList.length > 0 && (
              <VStack alignItems={"flex-start"}>
                <Heading as="h4" size="md" color={"gray.700"}>
                  EDUCATION
                </Heading>
                {educationList.map((edu, i) => {
                  const { courseName, institute, startYr, endYr, grade } = edu;
                  return (
                    <VStack spacing={0} alignItems={"flex-start"} w={"full"} pb={2} key={i}>
                      <Text fontWeight={"medium"}>{courseName || "B.Tech Computer Engineering"}</Text>
                      <Text fontSize={"sm"}>{institute || "College of Engineering Chandigarh"}</Text>
                      <HStack fontSize={"xs"} fontStyle={"italic"} justifyContent={"space-between"} w={"full"}>
                        <Text>{startYr || 2014} - {endYr || 2018}</Text>
                        <Text>{grade || "8.7 CGPA"}</Text>
                      </HStack>
                    </VStack>
                  );
                })}
              </VStack>
            )}

            {/* PROJECTS */}
            {projects.length > 0 && (
              <VStack alignItems={"flex-start"}>
                <Heading as="h4" size="md" color={"gray.700"}>
                  PROJECTS
                </Heading>
                {projects.map((project, i) => {
                  const { name, url, description, duration } = project;
                  return (
                    <VStack spacing={0.5} alignItems={"flex-start"} lineHeight={1.3} pb={2} key={i}>
                      <HStack as="a" href={url} target="_blank" spacing={0.5}>
                        <a href={url}><Text fontWeight={"medium"}>{name || "Project Name"}</Text></a>
                      </HStack>
                      <Text fontSize={"xs"} fontStyle={"italic"}>{duration || "3 weeks"}</Text>
                      <UnorderedList pl={5}>
                        {(description || "Lorem ipsum dolor sit amet.").split("\n").map((point, j) => (
                          point && (
                            <ListItem key={j}>
                              <Text fontSize={"sm"} as="p">{point}</Text>
                            </ListItem>
                          )
                        ))}
                      </UnorderedList>
                    </VStack>
                  );
                })}
              </VStack>
            )}

            {/* CERTIFICATES */}
            {certificates.length > 0 && (
              <VStack alignItems={"flex-start"}>
                <Heading as="h4" size="md" color={"gray.700"}>
                  CERTIFICATES
                </Heading>
                {certificates.map((certificate, i) => {
                  const { title, date, url, provider } = certificate;
                  return (
                    <VStack spacing={0.5} alignItems={"flex-start"} lineHeight={1.3} pb={2} key={i}>
                      <a href={url}><Text fontWeight={"medium"}>{title || "Certificate Title"}</Text></a>
                      <Text fontSize={"sm"}>{provider || "XYZ Services"}</Text>
                      <Text fontSize={"xs"} fontStyle={"italic"}>{date || "2023-06-13"}</Text>
                    </VStack>
                  );
                })}
              </VStack>
            )}
          </VStack>

          {/* RIGHT COLUMN */}
          <VStack mx={2} alignItems={"flex-start"} w={"full"} spacing={6}>
            {/* WORK EXPERIENCE */}
            {workList.length > 0 && (
              <VStack alignItems={"flex-start"}>
                <Heading as="h4" size="md" color={"gray.700"}>
                  WORK EXPERIENCE
                </Heading>
                {workList.map((work, i) => {
                  const { position, type, company, startDate, endDate, description } = work;
                  return (
                    <VStack spacing={0.5} alignItems={"flex-start"} lineHeight={1.3} pb={2} key={i}>
                      <Text fontWeight={"medium"}>{position || "Full Stack Developer"}</Text>
                      <Text fontSize={"sm"}>{company || "XYZ Infotech Services"} - {type || "Full-time"}</Text>
                      <Text fontSize={"xs"} fontStyle={"italic"}>{startDate || "2018-03"} - {endDate || "2021-12"}</Text>
                      <Text fontSize={"sm"} as="p">{description || "Fixed bugs and implemented enhancements."}</Text>
                    </VStack>
                  );
                })}
              </VStack>
            )}

            {/* SKILLS */}
            {skills.length > 0 && (
              <VStack alignItems={"flex-start"}>
                <Heading as="h4" size="md" color={"gray.700"}>
                  SKILLS
                </Heading>
                <Wrap>
                  {skills.map((skill, index) => (
                    <Tag
                      size={"md"}
                      borderRadius="md"
                      variant="solid"
                      bg={theme.replace("400", "500")}
                      key={index}
                    >
                      <TagLabel>{skill.name}</TagLabel>
                    </Tag>
                  ))}
                </Wrap>
              </VStack>
            )}
          </VStack>
        </HStack>
      </div>
    </Box>
  );
};

export default ResumePreview;
