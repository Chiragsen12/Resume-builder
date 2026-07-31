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
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

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
    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("resume-token", data.token);

        toast({
          title: "Login Successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/Header"); // Redirect to Header after login
      } else {
        toast({
          title: "Login Failed",
          description: data.message || "Invalid Credentials",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex h="100vh" align="center" justify="center" bg="gray.50" px={4}>
      <Box w="full" maxW="lg" bg="white" p={8} borderRadius="2xl" boxShadow="xl">
        <Heading mb={6} textAlign="center">Login</Heading>
        <form onSubmit={handleSubmit}>
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

          <FormControl mb={6} isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              size="lg"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button size="lg" colorScheme="blue" type="submit" width="full" mb={4}>
            Login
          </Button>

          {/* <Text textAlign="center">
            Don't have an account?{" "}
            <Link to="/Register" style={{ color: "blue" }}>
              Register
            </Link>
          </Text> */}
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
