import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Link as RouterLink } from "react-router-dom"; // RouterLink for the Login link
import { Link as ChakraLink } from "@chakra-ui/react"; // Chakra UI's Link component

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // To handle loading state for the button
  const toast = useToast();
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
      // Check if the user is already logged in
      const token = localStorage.getItem("resume-token");
      if (token) {
        // If token exists, redirect to Header page
        navigate("/Header");
      }
    }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true); // Set loading state to true when submitting

    console.log('hi')
    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Registration Successful",
          description: "You can now login",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        // Navigate to the login page after successful registration
        navigate("/Loginpage");
      } else {
        toast({
          title: "Registration Failed",
          description: data.message || "Unable to register",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log(error);
    } finally {
      setLoading(false); // Set loading state back to false after the request is done
    }
  };

  return (
    <Flex h="100vh" align="center" justify="center" bg="gray.50" px={4}>
      <Box w="full" maxW="lg" bg="white" p={8} borderRadius="2xl" boxShadow="xl">
        <Heading mb={6} textAlign="center">
          Register
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4} isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              size="lg"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              size="lg"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              size="lg"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <FormControl mb={6} isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              size="lg"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>

          <Button
            colorScheme="blue"
            type="submit"
            width="full"
            isLoading={loading}
            mb={4}
          >
            Register
          </Button>

          <Text textAlign="center">
            Already have an account?{" "}
            <ChakraLink as={RouterLink} to="/Loginpage" color="blue.500">
              Login
            </ChakraLink>
          </Text>
        </form>
      </Box>
    </Flex>
  );
};

export default Register;
