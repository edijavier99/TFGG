import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  useToast,
} from '@chakra-ui/react';

const Home = () => {
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const toast = useToast();

  useEffect(() => {
    UserService.getPublicContent().then(
      response => {
        setContent(response.data);
      },
      error => {
        const content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(content);
      }
    );
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") setName(value);
    if (name === "email") setEmail(value);
    if (name === "date") setDate(value);
    if (name === "time") setTime(value);
    if (name === "guests") setGuests(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const reservationData = {
      name,
      email,
      date,
      time,
      guests
    };

    try {
      const response = await fetch("http://localhost:8080/api/test/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reservationData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();
      toast({
        title: "Reserva realizada con éxito",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setName("");
      setEmail("");
      setDate("");
      setTime("");
      setGuests("");
    } catch (error) {
      toast({
        title: "Hubo un error al realizar la reserva",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  return (
    <Box className="container" p={4} maxW="600px" mx="auto">
      <Heading as="h3" mb={4}>{content}</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="flex-start">
          <FormControl id="name" isRequired>
            <FormLabel>Nombre</FormLabel>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Correo</FormLabel>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="date" isRequired>
            <FormLabel>Fecha</FormLabel>
            <Input
              type="date"
              name="date"
              value={date}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="time" isRequired>
            <FormLabel>Hora</FormLabel>
            <Input
              type="time"
              name="time"
              value={time}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="guests" isRequired>
            <FormLabel>Comensales</FormLabel>
            <Input
              type="number"
              name="guests"
              value={guests}
              onChange={handleInputChange}
            />
          </FormControl>
          <Button type="submit" colorScheme="teal" size="md">Reservar</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Home;