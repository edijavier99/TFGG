import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../css/confirm-alert-custom.css';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure
} from '@chakra-ui/react';

const BoardModerator = () => {
  const [reservations, setReservations] = useState([]);
  const [currentReservation, setCurrentReservation] = useState({
    id: null,
    name: '',
    email: '',
    date: '',
    time: '',
    guests: ''
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    retrieveReservations();
  }, []);

  const retrieveReservations = () => {
    UserService.getReservations().then(
      response => {
        setReservations(Array.isArray(response.data) ? response.data : []);
      },
      error => {
        const errorMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        setReservations(errorMessage);
      }
    );
  };

  const deleteReservation = (id) => {
    confirmAlert({
      title: 'Confirmación',
      message: '¿Estás seguro de que quieres borrar la reserva?',
      buttons: [
        {
          label: 'Sí',
          onClick: () => {
            UserService.deleteReservation(id).then(
              response => {
                setReservations(prevReservations => prevReservations.filter(reservation => reservation.id !== id));
              },
              error => {
                console.error("Hubo un error al eliminar la reserva", error);
              }
            );
          }
        },
        {
          label: 'No',
          onClick: () => { /* No hacer nada si se cancela */ }
        }
      ]
    });
  };

  const editReservation = (reservation) => {
    setCurrentReservation({ ...reservation });
    onOpen();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentReservation(prevReservation => ({
      ...prevReservation,
      [name]: value
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    UserService.updateReservation(currentReservation.id, currentReservation).then(
      response => {
        setReservations(prevReservations => prevReservations.map(reservation =>
          reservation.id === currentReservation.id ? currentReservation : reservation
        ));
        onClose();
      },
      error => {
        console.error("Hubo un error al actualizar la reserva", error.response);
      }
    );
  };

  return (
    <Box className="container" p={4} maxW="1000px" mx="auto">
      <Box as="header" mb={4} p={4} bg="teal.500" color="white" borderRadius="md">
        <h3>Reservas</h3>
      </Box>
      <Box>
        {Array.isArray(reservations) && reservations.length > 0 ? (
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Nombre</Th>
                <Th>Correo</Th>
                <Th>Fecha</Th>
                <Th>Hora</Th>
                <Th>Personas</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {reservations.map(reservation => (
                <Tr key={reservation.id}>
                  <Td>{reservation.name}</Td>
                  <Td>{reservation.email}</Td>
                  <Td>{reservation.date}</Td>
                  <Td>{reservation.time}</Td>
                  <Td>{reservation.guests}</Td>
                  <Td>
                    <Button
                      onClick={() => editReservation(reservation)}
                      colorScheme="blue"
                      size="sm"
                      mr={2}
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => deleteReservation(reservation.id)}
                      colorScheme="red"
                      size="sm"
                    >
                      Eliminar
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Box>No se han encontrado reservas</Box>
        )}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Reserva</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleFormSubmit}>
            <ModalBody>
              <FormControl id="formName" mb={4}>
                <FormLabel>Nombre</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={currentReservation.name}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
              <FormControl id="formEmail" mb={4}>
                <FormLabel>Correo</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={currentReservation.email}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
              <FormControl id="formDate" mb={4}>
                <FormLabel>Fecha</FormLabel>
                <Input
                  type="date"
                  name="date"
                  value={currentReservation.date}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
              <FormControl id="formTime" mb={4}>
                <FormLabel>Hora</FormLabel>
                <Input
                  type="time"
                  name="time"
                  value={currentReservation.time}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
              <FormControl id="formGuests" mb={4}>
                <FormLabel>Personas</FormLabel>
                <Input
                  type="number"
                  name="guests"
                  value={currentReservation.guests}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="teal" type="submit">
                Guardar cambios
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BoardModerator;