import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { useResume } from "../Context";
import ImageUpload from "./ImageUploadButton/ImageUpload.component";


const About = () => {
  const { about, setAbout } = useResume();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAbout({ ...about, [name]: value });
  };

  return (
    <>
      <Stack spacing={4} mb={2}>
        {about.picture ? (
          <Button
            onClick={() => {
              setAbout({ ...about, picture: "" });
            }}
            colorScheme="red"
            variant="outline"
          >
            Remove Image
          </Button>
        ) : (
          <ImageUpload />
        )}

        <HStack spacing={6}>
          <FormControl>
            <FormLabel htmlFor="name">Full Name</FormLabel>
            <Input
              onChange={(e) => handleChange(e)}
              name="name"
              id="name"
              type="text"
              variant="filled"
              placeholder="John Doe"
              defaultValue={about.name || ""}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="role">Role</FormLabel>
            <Input
              onChange={(e) => handleChange(e)}
              name="role"
              id="role"
              type="text"
              variant="filled"
              placeholder="Frontend Developer"
              defaultValue={about.role || ""}
            />
          </FormControl>
        </HStack>

        <HStack spacing={6}>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              onChange={(e) => handleChange(e)}
              name="email"
              id="email"
              type="email"
              variant="filled"
              placeholder="johndoe@gmail.com"
              defaultValue={about.email || ""}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="phone">Phone</FormLabel>
            <Input
              onChange={(e) => handleChange(e)}
              name="phone"
              id="phone"
              type="tel"
              variant="filled"
              placeholder="9876543210"
              defaultValue={about.phone || ""}
            />
          </FormControl>
        </HStack>

        <HStack spacing={6}>
          <FormControl>
            <FormLabel htmlFor="address">Address</FormLabel>
            <Input
              onChange={(e) => handleChange(e)}
              name="address"
              id="address"
              type="text"
              variant="filled"
              placeholder="Chandigarh, IN"
              defaultValue={about.address || ""}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="linkedin">LinkedIn</FormLabel>
            <Input
              onChange={(e) => handleChange(e)}
              name="linkedin"
              id="linkedin"
              type="text"
              variant="filled"
              placeholder="linkedin username"
              defaultValue={about.linkedin || ""}
            />
          </FormControl>
        </HStack>
      </Stack>
    </>
  );
};

export default About;
