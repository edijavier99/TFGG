import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Input,
  Spinner,
  Flex,
  Avatar,
  VStack,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from "@chakra-ui/react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "", image: "" },
      isClockedIn: false,
      clockInTime: null,
      workSessions: [],
      totalAllTime: 0,
      editMode: false,
      newImageUrl: "" // Inicializar con una cadena vacía
    };
  }

  async componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) {
      this.setState({ redirect: "/home" });
    } else {
      this.setState({ currentUser: currentUser, userReady: true });
      this.fetchWorkSessions(currentUser.id);
      this.fetchUserProfile(currentUser.id);
    }
  }

  fetchWorkSessions = async (userId) => {
    try {
      const response = await UserService.getWorkSessions(userId);
      const workSessions = response.data;
      
      const totalAllTime = workSessions.reduce((total, session) => {
        return total + (session.totalTime || 0);
      }, 0);

      this.setState({ workSessions, totalAllTime });
    } catch (error) {
      console.error("Error al recibir las sesiones", error);
    }
  };

  fetchUserProfile = async (userId) => {
    try {
      const response = await UserService.getUserProfile(userId);
      this.setState({ currentUser: response.data });
    } catch (error) {
      console.error("Error al recibir el perfil del usuario", error);
    }
  };

  handleClockInOut = async () => {
    const { isClockedIn, currentUser } = this.state;
    const userId = currentUser.id;

    if (!isClockedIn) {
      try {
        const response = await UserService.clockIn(userId);
        this.setState({ isClockedIn: true, clockInTime: response.data.clockInTime });
      } catch (error) {
        console.error("Error al fichar.", error);
      }
    } else {
      try {
        const response = await UserService.clockOut(userId);
        this.setState(prevState => {
          const newWorkSessions = [...prevState.workSessions, response.data];
          const totalAllTime = newWorkSessions.reduce((total, session) => {
            return total + (session.totalTime || 0);
          }, 0);
          return {
            isClockedIn: false,
            clockInTime: null,
            workSessions: newWorkSessions,
            totalAllTime
          };
        });
      } catch (error) {
        console.error("Error al salirse de servicio.", error);
      }
    }
  };

  toggleEditMode = () => {
    this.setState(prevState => ({
      editMode: !prevState.editMode,
      newImageUrl: prevState.currentUser.image || "" // Asegurar que siempre sea una cadena
    }));
  };

  handleImageChange = (e) => {
    this.setState({ newImageUrl: e.target.value });
  };

  handleSaveProfile = async () => {
    const { currentUser, newImageUrl } = this.state;

    try {
      await UserService.updateProfile(currentUser.id, newImageUrl);
      this.setState(prevState => ({
        currentUser: {
          ...prevState.currentUser,
          image: newImageUrl
        },
        editMode: false
      }));
      // Actualizar el usuario en localStorage
      const updatedUser = {
        ...currentUser,
        image: newImageUrl
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error al actualizar el perfil.", error);
    }
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    const { currentUser, userReady, isClockedIn, workSessions, totalAllTime, editMode, newImageUrl } = this.state;

    return (
      <Flex justify="center" align="center" minHeight="100vh" bg="gray.50">
        <Box
          p={8}
          maxWidth="600px"
          borderWidth={1}
          borderRadius="lg"
          boxShadow="lg"
          bg="white"
        >
          {userReady ? (
            <VStack spacing={4} align="start" w="100%">
              <Flex justify="center" width="100%">
                <Avatar size="xl" name={currentUser.username} src={currentUser.image || "//ssl.gstatic.com/accounts/ui/avatar_2x.png"} />
              </Flex>
              <Box textAlign="center" w="100%">
                <Heading as="h3" size="lg">
                  <strong>{currentUser.username}</strong>
                </Heading>
                <Button mt={2} onClick={this.toggleEditMode}>Editar Perfil</Button>
              </Box>
              <Box w="100%">
                <Text><strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ... {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}</Text>
                <Text mt={2}><strong>ID:</strong> {currentUser.id}</Text>
                <Text mt={2}><strong>Correo Electrónico:</strong> {currentUser.email}</Text>
                <Text mt={2}><strong>Autoridades:</strong> {currentUser.roles && currentUser.roles.join(", ")}</Text>
                <Text mt={2}><strong>Horas Totales:</strong> <Text as="span" fontSize="lg" fontWeight="bold" color="blue.500">{totalAllTime.toFixed(2)} hrs</Text></Text>
              </Box>
              {editMode ? (
                <Box w="100%" mt={4}>
                  <Text mt={2}><strong>Editar Imagen:</strong></Text>
                  <Input
                    value={newImageUrl}
                    onChange={this.handleImageChange}
                    placeholder="Ingrese la URL de la nueva imagen"
                  />
                  <Button colorScheme="blue" mt={4} onClick={this.handleSaveProfile}>Guardar</Button>
                  <Button mt={4} onClick={this.toggleEditMode}>Cancelar</Button>
                </Box>
              ) : null}
              <Flex justify="center" width="100%">
                <Button colorScheme={isClockedIn ? "red" : "green"} onClick={this.handleClockInOut} mt={4}>
                  {isClockedIn ? "Terminar Fichaje" : "Iniciar Fichaje"}
                </Button>
              </Flex>
              <Box w="100%" mt={4}>
                <Heading as="h4" size="md" mb={4}>Horas fichadas en el último mes</Heading>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Fecha Inicio</Th>
                      <Th>Fecha Fin</Th>
                      <Th>Horas Totales</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {workSessions.map((session, index) => (
                      <Tr key={index}>
                        <Td>{new Date(session.clockInTime).toLocaleString()}</Td>
                        <Td>{session.clockOutTime ? new Date(session.clockOutTime).toLocaleString() : "En curso"}</Td>
                        <Td>{session.totalTime ? session.totalTime.toFixed(2) : "N/A"} hrs</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </VStack>
          ) : (
            <Spinner size="xl" />
          )}
        </Box>
      </Flex>
    );
  }
}