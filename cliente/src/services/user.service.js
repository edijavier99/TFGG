import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getReservations() {
    return axios.get(API_URL + 'reservations');
  }

  deleteReservation(id) {
    return axios.delete(API_URL + 'reservations/' + id, { headers: authHeader() });
  }

  updateReservation(id, data) {
    return axios.put(API_URL + 'reservations/' + id, data, { headers: authHeader() });
  }

  // Nuevo método para iniciar sesión de trabajo (Clock In)
  clockIn(userId) {
    return axios.post(API_URL + 'worksession/clock-in', { userId }, { headers: authHeader() });
  }

  // Nuevo método para terminar sesión de trabajo (Clock Out)
  clockOut(userId) {
    return axios.post(API_URL + 'worksession/clock-out', { userId }, { headers: authHeader() });
  }

  // Nuevo método para obtener todas las sesiones de trabajo de un usuario
  getWorkSessions(userId) {
    return axios.get(API_URL + `worksession/work-sessions/${userId}`, { headers: authHeader() });
  }
  updateProfile(id, image) {
    return axios.put(API_URL + 'update-profile', { id, image }, { headers: authHeader() });
  }
  getUserProfile(userId) {
    return axios.get(API_URL + userId, { headers: authHeader() });
  }
}

export default new UserService();