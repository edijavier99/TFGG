import React, { Component } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Spinner,
  Alert,
  AlertIcon,
  Avatar,
  VStack
} from "@chakra-ui/react";
import AuthService from "../services/auth.service";
import { withRouter } from '../common/with-router';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    if (this.state.username && this.state.password) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.router.navigate("/profile");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false,
        message: "Todos los campos son obligatorios"
      });
    }
  }

  render() {
    return (
      <Flex justify="center" align="center" minHeight="100vh" bg="gray.50">
        <Box
          p={8}
          maxWidth="400px"
          borderWidth={1}
          borderRadius="lg"
          boxShadow="lg"
          bg="white"
        >
          <VStack spacing={4} align="center">
            <Avatar size="xl" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
            <Heading as="h3" size="lg">Iniciar Sesión</Heading>
            <form onSubmit={this.handleLogin} style={{ width: "100%" }}>
              <FormControl id="username" mb={4}>
                <FormLabel>Usuario</FormLabel>
                <Input
                  type="text"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  required
                />
              </FormControl>
              <FormControl id="password" mb={4}>
                <FormLabel>Contraseña</FormLabel>
                <Input
                  type="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  required
                />
              </FormControl>
              <Button
                colorScheme="blue"
                type="submit"
                width="full"
                isLoading={this.state.loading}
              >
                {this.state.loading ? <Spinner size="sm" /> : "Login"}
              </Button>
            </form>
            {this.state.message && (
              <Alert status="error" mt={4} width="full">
                <AlertIcon />
                {this.state.message}
              </Alert>
            )}
          </VStack>
        </Box>
      </Flex>
    );
  }
}

export default withRouter(Login);