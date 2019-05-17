import { axios } from 'vendor';
import { routes } from 'shared';

class ApiService {
  getTeams() {
    return axios({
      method: 'GET',
      url: routes.TEAMS
    });
  }
}

const apiService = new ApiService();

export { apiService };
