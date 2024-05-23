import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import { Box, Flex, Button, IconButton, Text, Link as ChakraLink } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <Box>
        <Flex as="nav" bg="blue.500" color="white" padding={4} align="center">
          <IconButton
            size="lg"
            variant="ghost"
            color="white"
            aria-label="Menu"
            icon={<HamburgerIcon />}
            mr={2}
          />
          <Text fontSize="xl" flex="1">
            <ChakraLink as={Link} to="/" color="white" _hover={{ textDecoration: 'none' }}>
              Principal
            </ChakraLink>
          </Text>
          <Button variant="ghost" color="white">
            <ChakraLink as={Link} to="/home" color="white" _hover={{ textDecoration: 'none' }}>
              Carta
            </ChakraLink>
          </Button>

          {showModeratorBoard && (
            <Button variant="ghost" color="white">
              <ChakraLink as={Link} to="/mod" color="white" _hover={{ textDecoration: 'none' }}>
                Empleados
              </ChakraLink>
            </Button>
          )}

          {showAdminBoard && (
            <Button variant="ghost" color="white">
              <ChakraLink as={Link} to="/admin" color="white" _hover={{ textDecoration: 'none' }}>
                Dueños
              </ChakraLink>
            </Button>
          )}

          {currentUser ? (
            <>
              <Button variant="ghost" color="white">
                <ChakraLink as={Link} to="/profile" color="white" _hover={{ textDecoration: 'none' }}>
                  {currentUser.username}
                </ChakraLink>
              </Button>
              <Button variant="ghost" color="white" onClick={this.logOut}>
                <ChakraLink as={Link} to="/login" color="white" _hover={{ textDecoration: 'none' }}>
                  Desconectar
                </ChakraLink>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" color="white">
                <ChakraLink as={Link} to="/login" color="white" _hover={{ textDecoration: 'none' }}>
                  Login
                </ChakraLink>
              </Button>
              <Button variant="ghost" color="white">
                <ChakraLink as={Link} to="/register" color="white" _hover={{ textDecoration: 'none' }}>
                  Sign Up
                </ChakraLink>
              </Button>
            </>
          )}
        </Flex>

        <Box padding={4}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </Box>
      </Box>
    );
  }
}

export default App;